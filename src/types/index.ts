// User Types
export interface User {
  id: string;
  username: string;
  password?: string; // Only included in mock data
  fullName: string;
  district: string;
  email: string;
  phone: string;
  role: 'admin' | 'employee' | 'resident';
  assignedCategories?: string[]; // For employees
}

export interface LoginCredentials {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface RegisterData {
  username: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  district: string;
  email?: string;
  phone: string;
}

// Request Types
export interface Request {
  id: string;
  residentId: string;
  residentName: string;
  categoryId: string;
  categoryName: string;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  createdAt: string;
  updatedAt: string;
  deadline: string;
  messages: Message[];
}

export interface Message {
  id: string;
  requestId: string;
  senderId: string;
  senderName: string;
  senderRole: 'admin' | 'employee' | 'resident';
  content: string;
  timestamp: string;
  isRead: boolean;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

// Admin Types
export interface EmployeeAccount {
  id: string;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  active: boolean;
  assignedCategories: string[];
}