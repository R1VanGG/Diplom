import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  PlusCircle,
  RefreshCw,
  Calendar,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRequests } from '../contexts/RequestsContext';
import RequestCard from '../components/RequestCard';
import ChatWindow from '../components/ChatWindow';
import NewRequestModal from '../components/NewRequestModal';
import Logo from '../components/Logo';

const ResidentInterface: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { userRequests, activeRequest, setActiveRequest } = useRequests();
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);

  // Sort requests by date (newest first)
  const sortedRequests = [...userRequests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Request stats
  const totalRequests = userRequests.length;
  const openRequests = userRequests.filter(req => req.status === 'open').length;
  const closedRequests = userRequests.filter(req => req.status === 'closed').length;

  // Handle request click
  const handleRequestClick = (request: React.SetStateAction<import("../types").Request | null>) => {
    setActiveRequest(request);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className="w-full lg:w-1/3 xl:w-1/4 bg-white border-r border-neutral-200 flex flex-col h-full">
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
            <button
              className="btn btn-primary py-1 px-2 text-xs flex items-center"
              onClick={() => setIsNewRequestModalOpen(true)}
            >
              <PlusCircle size={16} className="mr-1" />
              New Request
            </button>
          </div>
        </div>
        
        {/* Request stats */}
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
              <RefreshCw size={16} className="text-warning-600" />
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
        </div>
        
        {/* Requests list */}
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="font-medium mb-2">Your Requests</h2>
          
          {sortedRequests.length > 0 ? (
            <div className="space-y-2">
              {sortedRequests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onClick={() => handleRequestClick(request)}
                  isActive={request.id === activeRequest?.id}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <XCircle size={48} className="mx-auto text-neutral-300 mb-2" />
              <p className="text-neutral-500">You haven't submitted any requests yet.</p>
              <button
                className="btn btn-primary mt-4"
                onClick={() => setIsNewRequestModalOpen(true)}
              >
                <PlusCircle size={18} className="mr-1" />
                New Request
              </button>
            </div>
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
      <NewRequestModal
        isOpen={isNewRequestModalOpen}
        onClose={() => setIsNewRequestModalOpen(false)}
      />
    </div>
  );
};

export default ResidentInterface;