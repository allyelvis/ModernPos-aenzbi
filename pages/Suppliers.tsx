import React, { useState, useEffect } from 'react';
import type { Supplier, StoreSettings } from '../types';
import SupplierModal from '../components/SupplierModal';

const SupplierRow: React.FC<{ 
    supplier: Supplier, 
    onEdit: (supplier: Supplier) => void;
    onDelete: (supplierId: number) => void;
}> = ({ supplier, onEdit, onDelete }) => {
    return (
        <tr className="border-b border-dark-700 hover:bg-dark-700/50">
            <td className="p-4">
                <p className="font-medium text-white">{supplier.name}</p>
                <p className="text-sm text-gray-400">{supplier.contactPerson}</p>
            </td>
            <td className="p-4 text-gray-300">{supplier.email}</td>
            <td className="p-4 text-gray-300">{supplier.phone}</td>
            <td className="p-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    <button 
                        onClick={() => onEdit(supplier)}
                        className="bg-dark-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors"
                        aria-label="Edit"
                        title="Edit"
                    >
                        <i data-lucide="pencil" className="w-4 h-4"></i>
                    </button>
                    <button 
                        onClick={() => onDelete(supplier.id)}
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

interface SuppliersProps {
    storeSettings: StoreSettings;
    setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
}

const Suppliers: React.FC<SuppliersProps> = ({ storeSettings, setStoreSettings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [storeSettings.suppliers]);

  const handleAddNew = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };
  
  const handleDelete = (supplierId: number) => {
      if (window.confirm('Are you sure you want to delete this supplier?')) {
          setStoreSettings(prev => ({
              ...prev,
              suppliers: prev.suppliers.filter(s => s.id !== supplierId)
          }));
      }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const handleSave = (supplierData: Omit<Supplier, 'id'> | Supplier) => {
    setStoreSettings(prev => {
        const isEditing = 'id' in supplierData;
        if (isEditing) {
            return { ...prev, suppliers: prev.suppliers.map(s => (s.id === supplierData.id ? supplierData as Supplier : s)) };
        } else {
            const newSupplier: Supplier = {
                ...supplierData,
                id: Date.now(),
            };
            return { ...prev, suppliers: [...prev.suppliers, newSupplier] };
        }
    });
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Supplier Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary/80 transition-colors flex items-center"
        >
          <i data-lucide="plus" className="w-5 h-5 mr-2"></i>
          Add New Supplier
        </button>
      </div>
      
      <div className="bg-dark-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400 bg-dark-900/30">
                <th className="p-4">Supplier / Contact</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {storeSettings.suppliers.map((supplier) => (
                <SupplierRow 
                    key={supplier.id} 
                    supplier={supplier} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <SupplierModal
        isOpen={isModalOpen}
        supplier={editingSupplier}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Suppliers;