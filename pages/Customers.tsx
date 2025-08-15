import React, { useState, useEffect } from 'react';
import type { Customer, StoreSettings } from '../types';
import CustomerModal from '../components/CustomerModal';

const CustomerRow: React.FC<{ 
    customer: Customer, 
    onEdit: (customer: Customer) => void;
    onDelete: (customerId: number) => void;
}> = ({ customer, onEdit, onDelete }) => {
    return (
        <tr className="border-b border-dark-700 hover:bg-dark-700/50">
            <td className="p-4">
                <p className="font-medium text-white">{customer.name}</p>
            </td>
            <td className="p-4 text-gray-300">{customer.email}</td>
            <td className="p-4 text-gray-300">{customer.phone}</td>
            <td className="p-4 text-gray-300">{customer.address}</td>
            <td className="p-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    <button 
                        onClick={() => onEdit(customer)}
                        className="bg-dark-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors"
                        aria-label="Edit"
                        title="Edit"
                    >
                        <i data-lucide="pencil" className="w-4 h-4"></i>
                    </button>
                    <button 
                        onClick={() => onDelete(customer.id)}
                        className="bg-dark-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-red-600 transition-colors"
                        aria-label="Delete"
                        title="Delete"
                    >
                        <i data-lucide="trash-2" className="w-4 h-4"></i>
                    </button>
                </div>
            </td>
        </tr>
    );
};

interface CustomersProps {
    storeSettings: StoreSettings;
    setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
}

const Customers: React.FC<CustomersProps> = ({ storeSettings, setStoreSettings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [storeSettings.customers]);

  const handleAddNew = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };
  
  const handleDelete = (customerId: number) => {
      if (window.confirm('Are you sure you want to delete this customer?')) {
          setStoreSettings(prev => ({
              ...prev,
              customers: prev.customers.filter(c => c.id !== customerId)
          }));
      }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleSave = (customerData: Omit<Customer, 'id'> | Customer) => {
    setStoreSettings(prev => {
        const isEditing = 'id' in customerData;
        if (isEditing) {
            return { ...prev, customers: prev.customers.map(c => (c.id === customerData.id ? customerData as Customer : c)) };
        } else {
            const newCustomer: Customer = {
                ...customerData,
                id: Date.now(),
            };
            return { ...prev, customers: [...prev.customers, newCustomer] };
        }
    });
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Customer Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary/80 transition-colors flex items-center"
        >
          <i data-lucide="plus" className="w-5 h-5 mr-2"></i>
          Add New Customer
        </button>
      </div>
      
      <div className="bg-dark-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400 bg-dark-900/30">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Address</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {storeSettings.customers.map((customer) => (
                <CustomerRow 
                    key={customer.id} 
                    customer={customer} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CustomerModal
        isOpen={isModalOpen}
        customer={editingCustomer}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Customers;