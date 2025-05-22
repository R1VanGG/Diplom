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
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRequests } from '../contexts/RequestsContext';
import CategoryList from '../components/CategoryList';
import ChatWindow from '../components/ChatWindow';
import Logo from '../components/Logo';

const EmployeeInterface: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { userRequests, categories, activeRequest, setActiveRequest } = useRequests();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Group requests by category
  const requestsByCategory = categories.reduce((acc, category) => {
    const categoryRequests = userRequests.filter(
      req => req.categoryId === category.id
    ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // Oldest first
    
    if (categoryRequests.length > 0) {
      acc[category.id] = {
        name: category.name,
        color: category.color,
        requests: categoryRequests
      };
    }
    
    return acc;
  }, {} as Record<string, { name: string; color: string; requests: typeof userRequests }>);

  // Stats
  const totalAssignedRequests = userRequests.length;
  const openRequests = userRequests.filter(req => req.status === 'open').length;
  const closedRequests = userRequests.filter(req => req.status === 'closed').length;
  const urgentRequests = userRequests.filter(req => {
    const deadline = new Date(req.deadline);
    const today = new Date();
    return (
      req.status === 'open' && 
      deadline.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000 // Less than 7 days
    );
  }).length;

  // Handle request click
  const handleRequestClick = (request: React.SetStateAction<import("../types").Request | null>) => {
    setActiveRequest(request);
    setIsMobileMenuOpen(false); // Close mobile menu when a request is selected
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
          <Logo size="small" />
        </div>
        
        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-primary-100 text-primary-700">
              <User size={20} />
            </div>
            <div className="ml-2">
              <p className="font-medium">{user?.fullName}</p>
              <p className="text-xs text-neutral-500">{user?.district}</p>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="card p-2 text-center">
            <p className="text-xs text-neutral-500">Assigned</p>
            <p className="text-xl font-semibold text-primary-700">{totalAssignedRequests}</p>
          </div>
          <div className="card p-2 text-center">
            <p className="text-xs text-neutral-500">Open</p>
            <p className="text-xl font-semibold text-primary-600">{openRequests}</p>
          </div>
          <div className="card p-2 text-center">
            <p className="text-xs text-neutral-500">Urgent</p>
            <p className="text-xl font-semibold text-warning-600">{urgentRequests}</p>
          </div>
          <div className="card p-2 text-center">
            <p className="text-xs text-neutral-500">Closed</p>
            <p className="text-xl font-semibold text-success-600">{closedRequests}</p>
          </div>
        </div>
        
        {/* Request categories */}
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="font-medium mb-2 flex items-center">
            <Clock size={18} className="mr-1 text-primary-600" />
            Requests by Category
          </h2>
          
          {Object.entries(requestsByCategory).map(([categoryId, category]) => (
            <CategoryList
              key={categoryId}
              title={category.name}
              requests={category.requests}
              onRequestClick={handleRequestClick}
              activeRequestId={activeRequest?.id}
              color={category.color}
            />
          ))}
          
          {Object.keys(requestsByCategory).length === 0 && (
            <p className="text-neutral-500 text-sm">No requests assigned to you.</p>
          )}
        </div>
        
        {/* Logout button */}
        <div className="p-4 border-t border-neutral-200">
          <button
            className="btn btn-outline w-full flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0 p-4 h-screen pt-16 lg:pt-4">
        <Routes>
          <Route path="/" element={
            <ChatWindow request={activeRequest} />
          } />
        </Routes>
      </div>
    </div>
  );
};

export default EmployeeInterface;