import React, { useState, useEffect } from 'react';
import type { User, StoreSettings } from '../types';
import UserModal from '../components/UserModal';

const UserRow: React.FC<{ 
    user: User, 
    onEdit: (user: User) => void;
    onDelete: (userId: number) => void;
    isCurrentUser: boolean;
}> = ({ user, onEdit, onDelete, isCurrentUser }) => {
    
    const getRoleClass = (role: string) => {
        switch (role) {
            case 'Admin': return 'bg-purple-500/20 text-purple-300';
            case 'Manager': return 'bg-blue-500/20 text-blue-300';
            case 'Cashier': return 'bg-green-500/20 text-green-300';
            default: return 'bg-dark-600 text-gray-300';
        }
    }

    return (
        <tr className="border-b border-dark-700 hover:bg-dark-700/50">
            <td className="p-4 flex items-center">
                <img src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} className="w-10 h-10 rounded-full object-cover mr-4" />
                <div>
                    <span className="font-medium text-white">{user.name}</span>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
            </td>
            <td className="p-4">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleClass(user.role)}`}>
                    {user.role}
                </span>
            </td>
            <td className="p-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    <button 
                        onClick={() => onEdit(user)}
                        className="bg-dark-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors"
                        aria-label="Edit"
                        title="Edit"
                    >
                        <i data-lucide="pencil" className="w-4 h-4"></i>
                    </button>
                    <button 
                        onClick={() => onDelete(user.id)}
                        disabled={isCurrentUser}
                        className="bg-dark-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Delete"
                        title={isCurrentUser ? "Cannot delete yourself" : "Delete"}
                    >
                        <i data-lucide="trash-2" className="w-4 h-4"></i>
                    </button>
                </div>
            </td>
        </tr>
    );
};

interface UsersProps {
    storeSettings: StoreSettings;
    setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
    activeUser: User;
}

const Users: React.FC<UsersProps> = ({ storeSettings, setStoreSettings, activeUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [storeSettings.users]);

  const handleAddNew = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };
  
  const handleDelete = (userId: number) => {
      if (userId === activeUser.id) {
          alert("You cannot delete your own account.");
          return;
      }
      if (window.confirm('Are you sure you want to delete this user?')) {
          setStoreSettings(prev => ({
              ...prev,
              users: prev.users.filter(u => u.id !== userId)
          }));
      }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = (userData: Omit<User, 'id'> | User) => {
    setStoreSettings(prev => {
        const isEditing = 'id' in userData;
        if (isEditing) {
            return { ...prev, users: prev.users.map(u => (u.id === userData.id ? userData as User : u)) };
        } else {
            const newUser: User = {
                ...userData,
                id: Date.now(), // Use a more robust ID in a real app
            };
            return { ...prev, users: [...prev.users, newUser] };
        }
    });
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">User Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary/80 transition-colors flex items-center"
        >
          <i data-lucide="plus" className="w-5 h-5 mr-2"></i>
          Add New User
        </button>
      </div>
      
      <div className="bg-dark-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400 bg-dark-900/30">
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {storeSettings.users.map((user) => (
                <UserRow 
                    key={user.id} 
                    user={user} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isCurrentUser={user.id === activeUser.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UserModal
        isOpen={isModalOpen}
        user={editingUser}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Users;
