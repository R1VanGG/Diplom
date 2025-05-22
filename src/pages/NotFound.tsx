import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Logo from '../components/Logo';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 p-4">
      <div className="text-center">
        <div className="mb-6">
          <Logo size="large" />
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-warning-100 rounded-full">
            <AlertTriangle size={64} className="text-warning-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-neutral-800 mb-2">404</h1>
        <h2 className="text-2xl font-medium text-neutral-700 mb-4">Page Not Found</h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link to="/" className="btn btn-primary inline-flex items-center">
          <Home size={18} className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;