import React from 'react';
import { format, parseISO } from 'date-fns';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser }) => {
  const messageTime = format(parseISO(message.timestamp), 'MMM d, h:mm a');
  const senderRoleColor = message.senderRole === 'admin' 
    ? 'text-purple-700' 
    : message.senderRole === 'employee' 
      ? 'text-primary-700' 
      : 'text-neutral-700';
  
  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isCurrentUser 
            ? 'bg-primary-100 text-primary-900' 
            : 'bg-neutral-100 text-neutral-900'
        }`}
      >
        {!isCurrentUser && (
          <div className="flex items-baseline mb-1">
            <span className="text-sm font-medium">{message.senderName}</span>
            <span className={`ml-2 text-xs font-medium ${senderRoleColor}`}>
              {message.senderRole}
            </span>
          </div>
        )}
        
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        
        <div className="flex justify-end mt-1">
          <span className="text-xs text-neutral-500">{messageTime}</span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;