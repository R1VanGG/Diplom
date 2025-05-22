import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  ChevronDown, 
  ChevronUp, 
  User,
  Clock,
  CheckCircle,
  Menu,
  X,
  PlusCircle,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRequests } from '../contexts/RequestsContext';
import CategoryList from '../components/CategoryList';
import ChatWindow from '../components/ChatWindow';
import NewRequestModal from '../components/NewRequestModal';
import Logo from '../components/Logo';

interface UserInterfaceProps {
  role: 'employee' | 'resident';
}

const UserInterface: React.FC<UserInterfaceProps> = ({ role }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { userRequests, categories, activeRequest, setActiveRequest } = useRequests();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);

  // Group requests by category for employees
  const requestsByCategory = categories.reduce((acc, category) => {
    const categoryRequests = userRequests.filter(
      req => req.categoryId === category.id
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    if (categoryRequests.length > 0) {
      acc[category.id] = {
        name: category.name,
        color: category.color,
        requests: categoryRequests
      };
    }
    
    return acc;
  }, {} as Record<string, { name: string; color: string; requests: typeof userRequests }>);

  // Sort requests by date (newest first) for residents
  const sortedRequests = [...userRequests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Stats
  const totalRequests = userRequests.length;
  const openRequests = userRequests.filter(req => req.status === 'open').length;
  const closedRequests = userRequests.filter(req => req.status === 'closed').length;
  const urgentRequests = userRequests.filter(req => {
    const deadline = new Date(req.deadline);
    const today = new Date();
    return (
      req.status === 'open' && 
      deadline.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000
    );
  }).length;

  // Handle request click
  const handleRequestClick = (request: React.SetStateAction<import("../types").Request | null>) => {
    setActiveRequest(request);
    setIsMobileMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Effect to check if we have an active request
  useEffect(() => {
    if (userRequests.length > 0 && !activeRequest) {
      setActiveRequest(userRequests[0]);
    }
  }, [userRequests, activeRequest, setActiveRequest]);

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Mobile menu button */}
      <button
        className="fixed top-4 left-4 p-2 rounded-md bg-white shadow-md lg:hidden z-10"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 flex flex-col w-full max-w-xs bg-white border-r border-neutral-200 transition-transform duration-300 ease-in-out lg:transition-none z-20`}
      >
        <div className="p-4 border-b border-neutral-200">
          <div className="flex justify-between items-center">
            <Logo size="small" />
            <button
              className="btn btn-outline text-xs py-1"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-1" />
              Logout
            </button>
          </div>
        </div>
        
        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-primary-100 text-primary-700">
              <User size={20} />
            </div>
            <div className="ml-2 flex-1">
              <p className="font-medium">{user?.fullName}</p>
              <p className="text-xs text-neutral-500">{user?.district}</p>
            </div>
            {role === 'resident' && (
              <button
                className="btn btn-primary py-1 px-2 text-xs flex items-center"
                onClick={() => setIsNewRequestModalOpen(true)}
              >
                <PlusCircle size={16} className="mr-1" />
                New Request
              </button>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 p-4">
          <div className="card p-2 text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar size={16} className="text-primary-600" />
              <p className="text-xs text-neutral-500 ml-1">Total</p>
            </div>
            <p className="text-xl font-semibold text-primary-700">{totalRequests}</p>
          </div>
          <div className="card p-2 text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock size={16} className="text-warning-600" />
              <p className="text-xs text-neutral-500 ml-1">Open</p>
            </div>
            <p className="text-xl font-semibold text-warning-600">{openRequests}</p>
          </div>
          <div className="card p-2 text-center">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle size={16} className="text-success-600" />
              <p className="text-xs text-neutral-500 ml-1">Closed</p>
            </div>
            <p className="text-xl font-semibold text-success-600">{closedRequests}</p>
          </div>
          {role === 'employee' && (
            <div className="card p-2 text-center col-span-3">
              <div className="flex items-center justify-center mb-1">
                <Clock size={16} className="text-error-600" />
                <p className="text-xs text-neutral-500 ml-1">Urgent</p>
              </div>
              <p className="text-xl font-semibold text-error-600">{urgentRequests}</p>
            </div>
          )}
        </div>
        
        {/* Requests list */}
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="font-medium mb-2">
            {role === 'employee' ? 'Requests by Category' : 'Your Requests'}
          </h2>
          
          {role === 'employee' ? (
            // Employee view - grouped by category
            Object.entries(requestsByCategory).map(([categoryId, category]) => (
              <CategoryList
                key={categoryId}
                title={category.name}
                requests={category.requests}
                onRequestClick={handleRequestClick}
                activeRequestId={activeRequest?.id}
                color={category.color}
              />
            ))
          ) : (
            // Resident view - chronological list
            sortedRequests.length > 0 ? (
              <div className="space-y-2">
                {sortedRequests.map(request => (
                  <div key={request.id} onClick={() => handleRequestClick(request)}>
                    <CategoryList
                      title={request.categoryName}
                      requests={[request]}
                      onRequestClick={handleRequestClick}
                      activeRequestId={activeRequest?.id}
                      color={categories.find(c => c.id === request.categoryId)?.color}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <X size={48} className="mx-auto text-neutral-300 mb-2" />
                <p className="text-neutral-500">You haven't submitted any requests yet.</p>
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => setIsNewRequestModalOpen(true)}
                >
                  <PlusCircle size={18} className="mr-1" />
                  New Request
                </button>
              </div>
            )
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-4 flex flex-col h-full lg:h-screen">
        <Routes>
          <Route path="/" element={
            <ChatWindow request={activeRequest} />
          } />
        </Routes>
      </div>
      
      {/* New Request Modal */}
      {role === 'resident' && (
        <NewRequestModal
          isOpen={isNewRequestModalOpen}
          onClose={() => setIsNewRequestModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserInterface;