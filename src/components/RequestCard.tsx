import React from 'react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Request } from '../types';
import CategoryBadge from './CategoryBadge';

interface RequestCardProps {
  request: Request;
  onClick: () => void;
  isActive?: boolean;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onClick, isActive = false }) => {
  const isExpired = new Date(request.deadline) < new Date();
  const isCloseToDeadline = !isExpired && 
    new Date(request.deadline).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days

  const deadlineDistance = formatDistanceToNow(parseISO(request.deadline), { addSuffix: true });
  const statusClass = request.status === 'closed' 
    ? 'bg-neutral-100 border-neutral-200' 
    : isActive 
      ? 'bg-primary-50 border-primary-300' 
      : 'bg-white border-neutral-200 hover:bg-neutral-50';

  const unreadMessages = request.messages.filter(
    msg => !msg.isRead && msg.senderRole !== 'employee'
  ).length;

  return (
    <div
      className={`card cursor-pointer transition-all p-4 mb-2 ${statusClass}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <CategoryBadge name={request.categoryName} color={getColorForCategory(request.categoryName)} />
            {unreadMessages > 0 && (
              <span className="ml-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadMessages}
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium line-clamp-1">{request.subject}</h3>
          <p className="text-xs text-neutral-500 mt-1">
            From: {request.residentName}
          </p>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-xs text-neutral-500">
            {format(parseISO(request.createdAt), 'MMM d, yyyy')}
          </span>
          
          <div className="flex items-center mt-1">
            {request.status === 'closed' ? (
              <span className="flex items-center text-xs text-success-600">
                <CheckCircle size={12} className="mr-1" />
                Closed
              </span>
            ) : isExpired ? (
              <span className="flex items-center text-xs text-error-600">
                <AlertTriangle size={12} className="mr-1" />
                Expired {deadlineDistance}
              </span>
            ) : isCloseToDeadline ? (
              <span className="flex items-center text-xs text-warning-600">
                <Clock size={12} className="mr-1" />
                Due {deadlineDistance}
              </span>
            ) : (
              <span className="flex items-center text-xs text-neutral-500">
                <Clock size={12} className="mr-1" />
                Due {deadlineDistance}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Latest message preview */}
      {request.messages.length > 0 && (
        <p className="text-xs text-neutral-600 mt-2 line-clamp-1">
          {request.messages[request.messages.length - 1].content}
        </p>
      )}
    </div>
  );
};

// Helper function to get color for category (fallback colors if category not found)
function getColorForCategory(categoryName: string): string {
  const colorMap: Record<string, string> = {
    'Road Maintenance': '#3B82F6',
    'Waste Management': '#10B981',
    'Public Safety': '#EF4444',
    'Public Utilities': '#F59E0B',
    'Administrative': '#8B5CF6'
  };

  return colorMap[categoryName] || '#4B5563'; // Default color if not found
}

export default RequestCard;