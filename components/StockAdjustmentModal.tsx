import React, { useState, useEffect, useCallback } from 'react';
import type { Product, Category, Department } from '../types';
import { PRODUCT_CATEGORIES } from '../constants';
import { generateProductDescription } from '../services/geminiService';


const defaultProductState = {
  name: '',
  sku: '',
  price: 0,
  category: 'Appetizers' as Category,
  imageUrl: 'https://picsum.photos/400/400',
  stock: 0,
  description: '',
  departmentId: undefined,
};

interface ProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  departments: Department[];
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, product, onClose, onSave, departments }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(product || defaultProductState);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setFormData(product || defaultProductState);
    // @ts-ignore
    if (isOpen && window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [product, isOpen]);
  
  const handleGenerateDescription = useCallback(async () => {
    if (!formData.name) {
        alert("Please enter a product name first.");
        return;
    }
    setIsGenerating(true);
    const generatedDesc = await generateProductDescription(formData.name);
    setFormData(prev => ({ ...prev, description: generatedDesc }));
    setIsGenerating(false);
  }, [formData.name]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number | undefined = value;
    
    if (name === 'price' || name === 'stock') {
        parsedValue = parseFloat(value) || 0;
    }
    if (name === 'departmentId') {
        parsedValue = value ? parseInt(value, 10) : undefined;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };
  
  const modalTitle = product ? 'Edit Product' : 'Add New Product';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-dark-800 rounded-lg shadow-xl w-full max-w-2xl m-4 transform transition-all duration-300 scale-95 animate-scale-in">
        <div className="p-6 border-b border-dark-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{modalTitle}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i data-lucide="x" className="w-6 h-6"></i>
          </button>
        </div>
        <div className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Product Name</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
              </div>
              <div>
                <label htmlFor="sku" className="block text-sm font-medium text-gray-300 mb-1">SKU</label>
                <input id="sku" name="sku" type="text" value={formData.sku} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none">
                    {PRODUCT_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
               <div>
                <label htmlFor="departmentId" className="block text-sm font-medium text-gray-300 mb-1">Department</label>
                <select id="departmentId" name="departmentId" value={formData.departmentId || ''} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none">
                    <option value="">Unassigned</option>
                    {departments.map(dep => <option key={dep.id} value={dep.id}>{dep.name}</option>)}
                </select>
              </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                <input id="price" name="price" type="number" value={formData.price} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-300 mb-1">Stock</label>
                <input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
              </div>
          </div>
          <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
              <input id="imageUrl" name="imageUrl" type="text" value={formData.imageUrl} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
          </div>
           <div>
              <div className="flex justify-between items-center mb-1">
                 <label htmlFor="description" className="block text-sm font-medium text-gray-300">AI Description</label>
                 <button onClick={handleGenerateDescription} disabled={isGenerating} className="text-xs bg-brand-secondary/50 text-white font-semibold py-1 px-3 rounded-md hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center">
                    <i data-lucide="sparkles" className="w-3 h-3 mr-2"></i>
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                </button>
              </div>
              <textarea id="description" name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
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
                Save Changes
            </button>
          </div>
      </div>
      <style>{`.animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; } @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
};

export default ProductModal;