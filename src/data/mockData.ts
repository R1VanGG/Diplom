import { User, Request, Category } from '../types';

export const mockUsers: User[] = [
  {
    id: 'admin-1',
    username: 'admin',
    password: 'password', // In a real app, passwords would be hashed
    fullName: 'System Administrator',
    district: 'Central Office',
    email: 'admin@gov-service.com',
    phone: '123-456-7890',
    role: 'admin'
  },
  {
    id: 'emp-1',
    username: 'john.employee',
    password: 'password',
    fullName: 'John Employee',
    district: 'North District',
    email: 'john@gov-service.com',
    phone: '123-456-7891',
    role: 'employee',
    assignedCategories: ['cat-1', 'cat-2']
  },
  {
    id: 'emp-2',
    username: 'sarah.employee',
    password: 'password',
    fullName: 'Sarah Employee',
    district: 'South District',
    email: 'sarah@gov-service.com',
    phone: '123-456-7892',
    role: 'employee',
    assignedCategories: ['cat-3', 'cat-4']
  },
  {
    id: 'res-1',
    username: 'james.resident',
    password: 'password',
    fullName: 'James Resident',
    district: 'East District',
    email: 'james@example.com',
    phone: '123-456-7893',
    role: 'resident'
  },
  {
    id: 'res-2',
    username: 'emily.resident',
    password: 'password',
    fullName: 'Emily Resident',
    district: 'West District',
    email: 'emily@example.com',
    phone: '123-456-7894',
    role: 'resident'
  }
];

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Road Maintenance',
    description: 'Issues related to road conditions, potholes, and street repairs',
    color: '#3B82F6' // blue-500
  },
  {
    id: 'cat-2',
    name: 'Waste Management',
    description: 'Issues related to waste collection, recycling, and public cleanliness',
    color: '#10B981' // emerald-500
  },
  {
    id: 'cat-3',
    name: 'Public Safety',
    description: 'Issues related to safety concerns, emergency services, and law enforcement',
    color: '#EF4444' // red-500
  },
  {
    id: 'cat-4',
    name: 'Public Utilities',
    description: 'Issues related to water, electricity, and other public utilities',
    color: '#F59E0B' // amber-500
  },
  {
    id: 'cat-5',
    name: 'Administrative',
    description: 'General administrative inquiries, document requests, and information',
    color: '#8B5CF6' // purple-500
  }
];

// Generate some mock requests
export const mockRequests: Request[] = [
  {
    id: 'req-1',
    residentId: 'res-1',
    residentName: 'James Resident',
    categoryId: 'cat-1',
    categoryName: 'Road Maintenance',
    subject: 'Pothole on Main Street',
    status: 'open',
    createdAt: '2025-05-01T10:30:00Z',
    updatedAt: '2025-05-15T14:45:00Z',
    deadline: '2025-05-31T10:30:00Z',
    messages: [
      {
        id: 'msg-1',
        requestId: 'req-1',
        senderId: 'res-1',
        senderName: 'James Resident',
        senderRole: 'resident',
        content: 'There is a large pothole on Main Street near the library that is causing traffic issues. Can someone please fix it?',
        timestamp: '2025-05-01T10:30:00Z',
        isRead: true
      },
      {
        id: 'msg-2',
        requestId: 'req-1',
        senderId: 'emp-1',
        senderName: 'John Employee',
        senderRole: 'employee',
        content: 'Thank you for reporting this issue. Our road maintenance team will inspect the area within the next 48 hours.',
        timestamp: '2025-05-02T09:15:00Z',
        isRead: true
      },
      {
        id: 'msg-3',
        requestId: 'req-1',
        senderId: 'emp-1',
        senderName: 'John Employee',
        senderRole: 'employee',
        content: 'Update: We have scheduled the repair for tomorrow morning. The work should be completed by noon.',
        timestamp: '2025-05-15T14:45:00Z',
        isRead: true
      }
    ]
  },
  {
    id: 'req-2',
    residentId: 'res-2',
    residentName: 'Emily Resident',
    categoryId: 'cat-3',
    categoryName: 'Public Safety',
    subject: 'Street Light Out',
    status: 'open',
    createdAt: '2025-05-10T16:20:00Z',
    updatedAt: '2025-05-10T16:20:00Z',
    deadline: '2025-06-09T16:20:00Z',
    messages: [
      {
        id: 'msg-4',
        requestId: 'req-2',
        senderId: 'res-2',
        senderName: 'Emily Resident',
        senderRole: 'resident',
        content: 'The street light at the corner of Oak and Pine has been out for several days, making the intersection unsafe at night.',
        timestamp: '2025-05-10T16:20:00Z',
        isRead: false
      }
    ]
  },
  {
    id: 'req-3',
    residentId: 'res-1',
    residentName: 'James Resident',
    categoryId: 'cat-2',
    categoryName: 'Waste Management',
    subject: 'Missed Trash Collection',
    status: 'closed',
    createdAt: '2025-04-15T08:45:00Z',
    updatedAt: '2025-04-18T11:30:00Z',
    deadline: '2025-05-15T08:45:00Z',
    messages: [
      {
        id: 'msg-5',
        requestId: 'req-3',
        senderId: 'res-1',
        senderName: 'James Resident',
        senderRole: 'resident',
        content: 'Our trash was not collected yesterday on the regular schedule. The bin is still full at 123 Elm Street.',
        timestamp: '2025-04-15T08:45:00Z',
        isRead: true
      },
      {
        id: 'msg-6',
        requestId: 'req-3',
        senderId: 'emp-1',
        senderName: 'John Employee',
        senderRole: 'employee',
        content: 'We apologize for the missed collection. I have notified the waste management team, and they will collect your trash today.',
        timestamp: '2025-04-15T10:20:00Z',
        isRead: true
      },
      {
        id: 'msg-7',
        requestId: 'req-3',
        senderId: 'res-1',
        senderName: 'James Resident',
        senderRole: 'resident',
        content: 'Thank you, the trash has been collected. I appreciate your quick response.',
        timestamp: '2025-04-18T11:30:00Z',
        isRead: true
      }
    ]
  },
  {
    id: 'req-4',
    residentId: 'res-2',
    residentName: 'Emily Resident',
    categoryId: 'cat-4',
    categoryName: 'Public Utilities',
    subject: 'Water Pressure Issue',
    status: 'open',
    createdAt: '2025-05-12T13:10:00Z',
    updatedAt: '2025-05-14T09:25:00Z',
    deadline: '2025-06-11T13:10:00Z',
    messages: [
      {
        id: 'msg-8',
        requestId: 'req-4',
        senderId: 'res-2',
        senderName: 'Emily Resident',
        senderRole: 'resident',
        content: 'We have been experiencing very low water pressure at 456 Oak Street for the past two days. Is there any maintenance work happening in our area?',
        timestamp: '2025-05-12T13:10:00Z',
        isRead: true
      },
      {
        id: 'msg-9',
        requestId: 'req-4',
        senderId: 'emp-2',
        senderName: 'Sarah Employee',
        senderRole: 'employee',
        content: 'Thank you for reporting this issue. We are checking if there are any ongoing maintenance projects in your area that could affect water pressure.',
        timestamp: '2025-05-14T09:25:00Z',
        isRead: true
      }
    ]
  },
  {
    id: 'req-5',
    residentId: 'res-1',
    residentName: 'James Resident',
    categoryId: 'cat-5',
    categoryName: 'Administrative',
    subject: 'Property Tax Question',
    status: 'open',
    createdAt: '2025-05-17T11:05:00Z',
    updatedAt: '2025-05-17T11:05:00Z',
    deadline: '2025-06-16T11:05:00Z',
    messages: [
      {
        id: 'msg-10',
        requestId: 'req-5',
        senderId: 'res-1',
        senderName: 'James Resident',
        senderRole: 'resident',
        content: 'I have a question about my property tax assessment. It seems higher than last year, and I would like to understand why.',
        timestamp: '2025-05-17T11:05:00Z',
        isRead: false
      }
    ]
  }
];