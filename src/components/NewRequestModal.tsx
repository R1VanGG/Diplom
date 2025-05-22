import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Category } from '../types';
import { useRequests } from '../contexts/RequestsContext';

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewRequestModal: React.FC<NewRequestModalProps> = ({ isOpen, onClose }) => {
  const { categories, createRequest } = useRequests();
  const [categoryId, setCategoryId] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!categoryId) {
      setError('Please select a category');
      return;
    }
    
    if (!subject.trim()) {
      setError('Please enter a subject');
      return;
    }
    
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await createRequest(categoryId, subject, message);
      onClose();
      setSubject('');
      setMessage('');
      setCategoryId('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">New Request</h2>
            <button
              className="rounded-full p-1 hover:bg-neutral-100 transition-colors"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 bg-error-50 text-error-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="input"
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="input"
              placeholder="Brief description of your request"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input min-h-[120px]"
              placeholder="Detailed description of your request"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRequestModal;