import React, { createContext, useContext, useState, useEffect } from 'react';
import { Request, Message, Category, User } from '../types';
import { mockRequests, mockCategories } from '../data/mockData';
import { useAuth } from './AuthContext';

interface RequestsContextType {
  requests: Request[];
  userRequests: Request[];
  categories: Category[];
  activeRequest: Request | null;
  setActiveRequest: (request: Request | null) => void;
  sendMessage: (requestId: string, content: string) => void;
  createRequest: (categoryId: string, subject: string, initialMessage: string) => Promise<void>;
  closeRequest: (requestId: string) => Promise<void>;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export function RequestsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeRequest, setActiveRequest] = useState<Request | null>(null);

  // Filter requests based on user role
  const userRequests = requests.filter(request => {
    if (!user) return false;
    if (user.role === 'resident') return request.residentId === user.id;
    if (user.role === 'employee') {
      // Only show requests from categories assigned to this employee
      const employeeCategories = user.assignedCategories || [];
      return employeeCategories.includes(request.categoryId);
    }
    if (user.role === 'admin') return true; // Admins see all requests
    return false;
  });

  useEffect(() => {
    // In a real application, fetch requests from API
    setRequests(mockRequests);
    setCategories(mockCategories);
  }, []);

  const sendMessage = (requestId: string, content: string) => {
    if (!user) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      requestId,
      senderId: user.id,
      senderName: user.fullName,
      senderRole: user.role,
      content,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setRequests(prevRequests => {
      return prevRequests.map(request => {
        if (request.id === requestId) {
          return {
            ...request,
            messages: [...request.messages, newMessage],
            updatedAt: new Date().toISOString()
          };
        }
        return request;
      });
    });
    
    // If this request is active, update it too
    if (activeRequest && activeRequest.id === requestId) {
      setActiveRequest({
        ...activeRequest,
        messages: [...activeRequest.messages, newMessage],
        updatedAt: new Date().toISOString()
      });
    }
  };

  const createRequest = async (categoryId: string, subject: string, initialMessage: string) => {
    if (!user) return;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const category = categories.find(c => c.id === categoryId);
    if (!category) throw new Error('Category not found');

    const newRequest: Request = {
      id: `req-${Date.now()}`,
      residentId: user.id,
      residentName: user.fullName,
      categoryId,
      categoryName: category.name,
      subject,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      messages: [
        {
          id: `msg-${Date.now()}`,
          requestId: `req-${Date.now()}`,
          senderId: user.id,
          senderName: user.fullName,
          senderRole: user.role,
          content: initialMessage,
          timestamp: new Date().toISOString(),
          isRead: false
        }
      ]
    };
    
    setRequests(prevRequests => [newRequest, ...prevRequests]);
  };

  const closeRequest = async (requestId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setRequests(prevRequests => {
      return prevRequests.map(request => {
        if (request.id === requestId) {
          return {
            ...request,
            status: 'closed',
            updatedAt: new Date().toISOString()
          };
        }
        return request;
      });
    });
    
    // If this request is active, update it too
    if (activeRequest && activeRequest.id === requestId) {
      setActiveRequest({
        ...activeRequest,
        status: 'closed',
        updatedAt: new Date().toISOString()
      });
    }
  };

  return (
    <RequestsContext.Provider 
      value={{ 
        requests,
        userRequests,
        categories,
        activeRequest,
        setActiveRequest,
        sendMessage,
        createRequest,
        closeRequest
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestsContext);
  if (context === undefined) {
    throw new Error('useRequests must be used within a RequestsProvider');
  }
  return context;
}