import React, { useState, useEffect } from 'react';
import type { Department, StoreSettings } from '../types';
import DepartmentModal from '../components/DepartmentModal';

const DepartmentRow: React.FC<{ 
    department: Department, 
    onEdit: (department: Department) => void;
    onDelete: (departmentId: number) => void;
}> = ({ department, onEdit, onDelete }) => {
    return (
        <tr className="border-b border-dark-700 hover:bg-dark-700/50">
            <td className="p-4 font-medium text-white">{department.name}</td>
            <td className="p-4 text-gray-300">{department.description}</td>
            <td className="p-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    <button 
                        onClick={() => onEdit(department)}
                        className="bg-dark-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors"
                        aria-label="Edit"
                        title="Edit"
                    >
                        <i data-lucide="pencil" className="w-4 h-4"></i>
                    </button>
                    <button 
                        onClick={() => onDelete(department.id)}
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

interface DepartmentsProps {
    storeSettings: StoreSettings;
    setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
}

const Departments: React.FC<DepartmentsProps> = ({ storeSettings, setStoreSettings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [storeSettings.departments]);

  const handleAddNew = () => {
    setEditingDepartment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setIsModalOpen(true);
  };
  
  const handleDelete = (departmentId: number) => {
      if (window.confirm('Are you sure you want to delete this department?')) {
          setStoreSettings(prev => ({
              ...prev,
              departments: prev.departments.filter(d => d.id !== departmentId)
          }));
      }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
  };

  const handleSave = (departmentData: Omit<Department, 'id'> | Department) => {
    setStoreSettings(prev => {
        const isEditing = 'id' in departmentData;
        if (isEditing) {
            return { ...prev, departments: prev.departments.map(d => (d.id === departmentData.id ? departmentData as Department : d)) };
        } else {
            const newDepartment: Department = {
                ...departmentData,
                id: Date.now(),
            };
            return { ...prev, departments: [...prev.departments, newDepartment] };
        }
    });
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Department Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary/80 transition-colors flex items-center"
        >
          <i data-lucide="plus" className="w-5 h-5 mr-2"></i>
          Add New Department
        </button>
      </div>
      
      <div className="bg-dark-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400 bg-dark-900/30">
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {storeSettings.departments.map((department) => (
                <DepartmentRow 
                    key={department.id} 
                    department={department} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DepartmentModal
        isOpen={isModalOpen}
        department={editingDepartment}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Departments;