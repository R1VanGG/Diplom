import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const Register: React.FC = () => {
  const { register, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    fullName: '',
    district: '',
    email: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!formData.username.trim()) errors.username = 'Username is required';
    if (!formData.password.trim()) errors.password = 'Password is required';
    if (!formData.passwordConfirm.trim()) errors.passwordConfirm = 'Password confirmation is required';
    if (formData.password !== formData.passwordConfirm) errors.passwordConfirm = 'Passwords do not match';
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.district.trim()) errors.district = 'District is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await register(formData);
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo size="large" />
        </div>
        
        <div className="card p-6 shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-6">Create an account</h1>
          
          {error && (
            <div className="mb-4 bg-error-50 text-error-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                  Full Name <span className="text-error-600">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`input ${formErrors.fullName ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-xs text-error-600">{formErrors.fullName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="district" className="block text-sm font-medium mb-1">
                  District/Area <span className="text-error-600">*</span>
                </label>
                <input
                  id="district"
                  name="district"
                  type="text"
                  value={formData.district}
                  onChange={handleChange}
                  className={`input ${formErrors.district ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Enter your district"
                />
                {formErrors.district && (
                  <p className="mt-1 text-xs text-error-600">{formErrors.district}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number <span className="text-error-600">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`input ${formErrors.phone ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Enter your phone number"
                />
                {formErrors.phone && (
                  <p className="mt-1 text-xs text-error-600">{formErrors.phone}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email (Optional)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input ${formErrors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-error-600">{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-1">
                  Username <span className="text-error-600">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`input ${formErrors.username ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Choose a username"
                />
                {formErrors.username && (
                  <p className="mt-1 text-xs text-error-600">{formErrors.username}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password <span className="text-error-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`input pr-10 ${formErrors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-neutral-500" />
                    ) : (
                      <Eye size={18} className="text-neutral-500" />
                    )}
                  </button>
                </div>
                {formErrors.password && (
                  <p className="mt-1 text-xs text-error-600">{formErrors.password}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium mb-1">
                  Confirm Password <span className="text-error-600">*</span>
                </label>
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  className={`input ${formErrors.passwordConfirm ? 'border-error-500 focus:ring-error-500' : ''}`}
                  placeholder="Confirm your password"
                />
                {formErrors.passwordConfirm && (
                  <p className="mt-1 text-xs text-error-600">{formErrors.passwordConfirm}</p>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{' '}
              <Link to="/" className="text-primary-600 hover:text-primary-800 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;