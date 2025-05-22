import React, { useState, useRef, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Hand, Send } from 'lucide-react';
import { Request } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useRequests } from '../contexts/RequestsContext';
import ChatMessage from './ChatMessage';
import CategoryBadge from './CategoryBadge';

interface ChatWindowProps {
  request: Request | null;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ request }) => {
  const { user } = useAuth();
  const { sendMessage, closeRequest } = useRequests();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [request?.messages]);

  if (!request || !user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-neutral-50 rounded-lg">
        <p className="text-neutral-500">Select a request to view the conversation</p>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && request.status !== 'closed') {
      sendMessage(request.id, message);
      setMessage('');
    }
  };

  const handleCloseRequest = () => {
    if (window.confirm('Are you sure you want to close this request?')) {
      closeRequest(request.id);
    }
  };

  // Helper function to get color for category
  const getColorForCategory = (categoryName: string): string => {
    const colorMap: Record<string, string> = {
      'Road Maintenance': '#3B82F6',
      'Waste Management': '#10B981',
      'Public Safety': '#EF4444',
      'Public Utilities': '#F59E0B',
      'Administrative': '#8B5CF6'
    };
    return colorMap[categoryName] || '#4B5563';
  };

  const renderDeadlineIndicator = () => {
    const deadline = parseISO(request.deadline);
    const now = new Date();
    const isExpired = deadline < now;
    const isCloseToDeadline = !isExpired && deadline.getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days
    
    let color = '';
    if (isExpired) color = 'text-error-600';
    else if (isCloseToDeadline) color = 'text-warning-600';
    else color = 'text-neutral-600';
    
    return (
      <div className={`text-xs ${color}`}>
        Deadline: {format(deadline, 'MMM d, yyyy')}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-neutral-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">{request.subject}</h2>
            <div className="flex items-center mt-1">
              <CategoryBadge 
                name={request.categoryName} 
                color={getColorForCategory(request.categoryName)} 
              />
              <span className="text-xs text-neutral-500 ml-2">
                {format(parseISO(request.createdAt), 'MMMM d, yyyy')}
              </span>
              <span className="mx-2 text-neutral-300">•</span>
              {renderDeadlineIndicator()}
              <span className="mx-2 text-neutral-300">•</span>
              <span className={`text-xs ${request.status === 'closed' ? 'text-success-600' : 'text-primary-600'}`}>
                {request.status === 'closed' ? 'Closed' : 'Open'}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              From: {request.residentName}
            </p>
          </div>
          
          {(user.role === 'admin' || user.role === 'employee') && request.status !== 'closed' && (
            <button
              className="btn btn-outline text-xs flex items-center"
              onClick={handleCloseRequest}
            >
              <Hand size={16} className="mr-1" />
              Close Dialog
            </button>
          )}
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {request.messages.map(msg => (
          <ChatMessage 
            key={msg.id} 
            message={msg} 
            isCurrentUser={msg.senderId === user.id} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      {request.status !== 'closed' ? (
        <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-200">
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="input flex-1 mr-2"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="btn btn-primary"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      ) : (
        <div className="p-4 bg-neutral-100 text-center text-neutral-600 border-t border-neutral-200">
          This request has been closed and no further messages can be sent.
        </div>
      )}
    </div>
  );
};

export default ChatWindow;