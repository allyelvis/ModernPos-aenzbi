import React, { useState, useEffect } from 'react';
import type { Customer } from '../types';

const defaultCustomerState: Omit<Customer, 'id'> = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

interface CustomerModalProps {
  isOpen: boolean;
  customer: Customer | null;
  onClose: () => void;
  onSave: (customer: Omit<Customer, 'id'> | Customer) => void;
}

const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, customer, onClose, onSave }) => {
  const [formData, setFormData] = useState(customer || defaultCustomerState);

  useEffect(() => {
    setFormData(customer || defaultCustomerState);
    
    // @ts-ignore
    if (isOpen && window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [customer, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };
  
  const modalTitle = customer ? 'Edit Customer' : 'Add New Customer';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-dark-800 rounded-lg shadow-xl w-full max-w-lg m-4 transform transition-all duration-300 scale-95 animate-scale-in">
        <div className="p-6 border-b border-dark-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{modalTitle}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i data-lucide="x" className="w-6 h-6"></i>
          </button>
        </div>
        <div className="p-8 space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
                    <input id="phone" name="phone" type="text" value={formData.phone} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                </div>
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                <input id="address" name="address" type="text" value={formData.address} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
            </div>
        </div>
        <div className="p-6 bg-dark-900/50 flex justify-end space-x-4 rounded-b-lg">
            <button onClick={onClose} className="bg-dark-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-dark-500 transition-colors">
                Cancel
            </button>
            <button
                onClick={handleSave}
                className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-primary/80 transition-colors"
            >
                Save Customer
            </button>
          </div>
      </div>
      <style>{`.animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; } @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
};

export default CustomerModal;