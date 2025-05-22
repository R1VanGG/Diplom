import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { LogOut, Users, Tag, Settings, Plus, UserPlus, Plus as TagPlus, Shield, LockIcon, Edit, Trash, CheckCircle, XCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers } from '../data/mockData';
import Logo from '../components/Logo';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('employees');
  
  // Filter employees from mock data
  const employees = mockUsers.filter(u => u.role === 'employee');
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="small" />
          
          <div className="flex items-center">
            <div className="mr-4 flex items-center">
              <div className="p-2 rounded-full bg-primary-100 text-primary-700">
                <Shield size={18} />
              </div>
              <div className="ml-2">
                <p className="font-medium text-sm">{user?.fullName}</p>
                <p className="text-xs text-neutral-500">Administrator</p>
              </div>
            </div>
            
            <button
              className="btn btn-outline py-1 text-sm"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-1" />
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Navigation tabs */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto">
          <nav className="flex">
            <button
              className={`px-4 py-3 text-sm font-medium flex items-center border-b-2 ${
                activeTab === 'employees'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
              onClick={() => setActiveTab('employees')}
            >
              <Users size={18} className="mr-1" />
              Employees
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium flex items-center border-b-2 ${
                activeTab === 'categories'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
              onClick={() => setActiveTab('categories')}
            >
              <Tag size={18} className="mr-1" />
              Categories
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium flex items-center border-b-2 ${
                activeTab === 'permissions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
              onClick={() => setActiveTab('permissions')}
            >
              <LockIcon size={18} className="mr-1" />
              Permissions
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-4">
          {activeTab === 'employees' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">Manage Employees</h1>
                <button className="btn btn-primary text-sm">
                  <UserPlus size={16} className="mr-1" />
                  Add Employee
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-neutral-50 text-left">
                      <th className="px-4 py-3 text-sm font-medium text-neutral-600">Name</th>
                      <th className="px-4 py-3 text-sm font-medium text-neutral-600">Username</th>
                      <th className="px-4 py-3 text-sm font-medium text-neutral-600">District</th>
                      <th className="px-4 py-3 text-sm font-medium text-neutral-600">Assigned Categories</th>
                      <th className="px-4 py-3 text-sm font-medium text-neutral-600">Status</th>
                      <th className="px-4 py-3 text-sm font-medium text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id} className="border-t border-neutral-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="p-1.5 rounded-full bg-primary-100 text-primary-700">
                              <User size={16} />
                            </div>
                            <span className="ml-2 text-sm font-medium">{employee.fullName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{employee.username}</td>
                        <td className="px-4 py-3 text-sm">{employee.district}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {employee.assignedCategories?.map((catId) => {
                              const category = {
                                'cat-1': { name: 'Road Maintenance', color: '#3B82F6' },
                                'cat-2': { name: 'Waste Management', color: '#10B981' },
                                'cat-3': { name: 'Public Safety', color: '#EF4444' },
                                'cat-4': { name: 'Public Utilities', color: '#F59E0B' },
                                'cat-5': { name: 'Administrative', color: '#8B5CF6' },
                              }[catId];
                              
                              return category ? (
                                <span
                                  key={catId}
                                  className="inline-flex items-center rounded-full px-2 py-0.5 text-xs"
                                  style={{
                                    backgroundColor: `${category.color}20`,
                                    color: category.color,
                                    border: `1px solid ${category.color}`
                                  }}
                                >
                                  {category.name}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-success-100 text-success-700">
                            <CheckCircle size={12} className="mr-1" />
                            Active
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button className="p-1 rounded text-neutral-500 hover:text-primary-600 hover:bg-primary-50">
                              <Edit size={16} />
                            </button>
                            <button className="p-1 rounded text-neutral-500 hover:text-error-600 hover:bg-error-50">
                              <Trash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">Manage Categories</h1>
                <button className="btn btn-primary text-sm">
                  <TagPlus size={16} className="mr-1" />
                  Add Category
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div 
                        className="w-8 h-8 rounded-full mb-2 flex items-center justify-center text-white"
                        style={{ backgroundColor: '#3B82F6' }}
                      >
                        <Tag size={16} />
                      </div>
                      <h3 className="font-medium">Road Maintenance</h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        Issues related to road conditions, potholes, and street repairs
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded text-neutral-500 hover:text-primary-600 hover:bg-primary-50">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 rounded text-neutral-500 hover:text-error-600 hover:bg-error-50">
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div 
                        className="w-8 h-8 rounded-full mb-2 flex items-center justify-center text-white"
                        style={{ backgroundColor: '#10B981' }}
                      >
                        <Tag size={16} />
                      </div>
                      <h3 className="font-medium">Waste Management</h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        Issues related to waste collection, recycling, and public cleanliness
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded text-neutral-500 hover:text-primary-600 hover:bg-primary-50">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 rounded text-neutral-500 hover:text-error-600 hover:bg-error-50">
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div 
                        className="w-8 h-8 rounded-full mb-2 flex items-center justify-center text-white"
                        style={{ backgroundColor: '#EF4444' }}
                      >
                        <Tag size={16} />
                      </div>
                      <h3 className="font-medium">Public Safety</h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        Issues related to safety concerns, emergency services, and law enforcement
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded text-neutral-500 hover:text-primary-600 hover:bg-primary-50">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 rounded text-neutral-500 hover:text-error-600 hover:bg-error-50">
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div 
                        className="w-8 h-8 rounded-full mb-2 flex items-center justify-center text-white"
                        style={{ backgroundColor: '#F59E0B' }}
                      >
                        <Tag size={16} />
                      </div>
                      <h3 className="font-medium">Public Utilities</h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        Issues related to water, electricity, and other public utilities
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded text-neutral-500 hover:text-primary-600 hover:bg-primary-50">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 rounded text-neutral-500 hover:text-error-600 hover:bg-error-50">
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div 
                        className="w-8 h-8 rounded-full mb-2 flex items-center justify-center text-white"
                        style={{ backgroundColor: '#8B5CF6' }}
                      >
                        <Tag size={16} />
                      </div>
                      <h3 className="font-medium">Administrative</h3>
                      <p className="text-sm text-neutral-500 mt-1">
                        General administrative inquiries, document requests, and information
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1 rounded text-neutral-500 hover:text-primary-600 hover:bg-primary-50">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 rounded text-neutral-500 hover:text-error-600 hover:bg-error-50">
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'permissions' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-lg font-semibold">User Permissions</h1>
                <button className="btn btn-primary text-sm">
                  <Plus size={16} className="mr-1" />
                  Add Permission
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 border border-neutral-200">
                <p className="text-neutral-500 mb-4">
                  Configure access permissions for different user roles in the system.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-50 text-left">
                        <th className="px-4 py-3 text-sm font-medium text-neutral-600">Permission</th>
                        <th className="px-4 py-3 text-sm font-medium text-neutral-600 text-center">Admin</th>
                        <th className="px-4 py-3 text-sm font-medium text-neutral-600 text-center">Employee</th>
                        <th className="px-4 py-3 text-sm font-medium text-neutral-600 text-center">Resident</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-neutral-200">
                        <td className="px-4 py-3 text-sm">View all requests</td>
                        <td className="px-4 py-3 text-center">
                          <CheckCircle size={18} className="text-success-500 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <XCircle size={18} className="text-neutral-300 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <XCircle size={18} className="text-neutral-300 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-t border-neutral-200">
                        <td className="px-4 py-3 text-sm">Manage categories</td>
                        <td className="px-4 py-3 text-center">
                          <CheckCircle size={18} className="text-success-500 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <XCircle size={18} className="text-neutral-300 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <XCircle size={18} className="text-neutral-300 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-t border-neutral-200">
                        <td className="px-4 py-3 text-sm">Manage employees</td>
                        <td className="px-4 py-3 text-center">
                          <CheckCircle size={18} className="text-success-500 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <XCircle size={18} className="text-neutral-300 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <XCircle size={18} className="text-neutral-300 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-t border-neutral-200">
                        <td className="px-4 py-3 text-sm">Respond to requests</td>
                        <td className="px-4 py-3 text-center">
                          <CheckCircle size={18} className="text-success-500 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <CheckCircle size={18} className="text-success-500 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <XCircle size={18} className="text-neutral-300 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-t border-neutral-200">
                        <td className="px-4 py-3 text-sm">Create new requests</td>
                        <td className="px-4 py-3 text-center">
                          <CheckCircle size={18} className="text-success-500 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <XCircle size={18} className="text-neutral-300 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <CheckCircle size={18} className="text-success-500 mx-auto" />
                        </td>
                      </tr>
                      <tr className="border-t border-neutral-200">
                        <td className="px-4 py-3 text-sm">Close requests</td>
                        <td className="px-4 py-3 text-center">
                          <CheckCircle size={18} className="text-success-500 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <CheckCircle size={18} className="text-success-500 mx-auto" />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <XCircle size={18} className="text-neutral-300 mx-auto" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;