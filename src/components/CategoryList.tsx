import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Request } from '../types';
import RequestCard from './RequestCard';

interface CategoryListProps {
  title: string;
  requests: Request[];
  onRequestClick: (request: Request) => void;
  activeRequestId?: string;
  color?: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ 
  title, 
  requests, 
  onRequestClick, 
  activeRequestId,
  color = '#3B82F6'
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  if (requests.length === 0) return null;
  
  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full p-2 rounded text-left hover:bg-neutral-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ color }}
      >
        <div className="flex items-center">
          <span className="font-medium">{title}</span>
          <span className="ml-2 text-xs bg-neutral-200 text-neutral-800 rounded-full px-2">
            {requests.length}
          </span>
        </div>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      
      {isExpanded && (
        <div className="mt-2 space-y-2">
          {requests.map(request => (
            <RequestCard
              key={request.id}
              request={request}
              onClick={() => onRequestClick(request)}
              isActive={request.id === activeRequestId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;