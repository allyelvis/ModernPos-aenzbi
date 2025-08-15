import React, { useState, useEffect } from 'react';
import type { PurchaseOrder, Supplier, Product, PurchaseOrderItem } from '../types';

const defaultOrderState: Omit<PurchaseOrder, 'id'> = {
  supplierId: 0,
  date: new Date().toISOString().split('T')[0],
  status: 'Pending',
  items: [],
  totalCost: 0,
};

interface PurchaseOrderModalProps {
  isOpen: boolean;
  order: PurchaseOrder | null;
  onClose: () => void;
  onSave: (order: Omit<PurchaseOrder, 'id'> | PurchaseOrder) => void;
  suppliers: Supplier[];
  products: Product[];
}

const PurchaseOrderModal: React.FC<PurchaseOrderModalProps> = ({ isOpen, order, onClose, onSave, suppliers, products }) => {
  const [formData, setFormData] = useState(order || defaultOrderState);
  
  // State for the item entry form
  const [currentItem, setCurrentItem] = useState({productId: '', quantity: 1, costPrice: 0});

  useEffect(() => {
    const initialData = order || { ...defaultOrderState, supplierId: suppliers[0]?.id || 0 };
    setFormData(initialData);
    
    // @ts-ignore
    if (isOpen && window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [order, isOpen, suppliers]);
  
  useEffect(() => {
    const total = formData.items.reduce((sum, item) => sum + item.costPrice * item.quantity, 0);
    setFormData(prev => ({...prev, totalCost: total}));
  }, [formData.items]);


  if (!isOpen) return null;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'supplierId' ? parseInt(value) : value }));
  };
  
  const handleItemFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumeric = ['quantity', 'costPrice'].includes(name);
    setCurrentItem(prev => ({ ...prev, [name]: isNumeric ? parseFloat(value) || '' : value }));
  };
  
  const handleAddItem = () => {
      const productId = parseInt(currentItem.productId);
      const product = products.find(p => p.id === productId);
      if (!product || !currentItem.quantity || currentItem.costPrice <= 0) {
          alert("Please select a product and enter valid quantity and cost.");
          return;
      }
      
      const newItem: PurchaseOrderItem = {
          productId: product.id,
          productName: product.name,
          quantity: Number(currentItem.quantity),
          costPrice: Number(currentItem.costPrice)
      };
      
      setFormData(prev => ({...prev, items: [...prev.items, newItem]}));
      setCurrentItem({productId: '', quantity: 1, costPrice: 0});
  };

  const handleRemoveItem = (index: number) => {
      setFormData(prev => ({...prev, items: prev.items.filter((_, i) => i !== index)}));
  };

  const handleSave = () => {
    onSave(formData);
  };
  
  const modalTitle = order ? 'Edit Purchase Order' : 'Create New Purchase Order';

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-dark-800 rounded-lg shadow-xl w-full max-w-4xl m-4 transform transition-all duration-300 scale-95 animate-scale-in">
        <div className="p-6 border-b border-dark-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{modalTitle}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i data-lucide="x" className="w-6 h-6"></i>
          </button>
        </div>
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="supplierId" className="block text-sm font-medium text-gray-300 mb-1">Supplier</label>
                    <select id="supplierId" name="supplierId" value={formData.supplierId} onChange={handleFormChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none">
                        {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                    <input id="date" name="date" type="date" value={formData.date} onChange={handleFormChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <select id="status" name="status" value={formData.status} onChange={handleFormChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none">
                        <option value="Pending">Pending</option>
                        <option value="Received">Received</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            
            <div className="border-t border-dark-700 pt-4">
                <h3 className="text-lg font-semibold text-white mb-2">Order Items</h3>
                <div className="space-y-2">
                    {formData.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-dark-700/50 p-2 rounded-md">
                            <div>
                                <p className="font-semibold text-white">{item.productName}</p>
                                <p className="text-sm text-gray-400">{item.quantity} x ${item.costPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                               <p className="font-semibold text-white">${(item.quantity * item.costPrice).toFixed(2)}</p>
                               <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-400"><i data-lucide="x" className="w-4 h-4"></i></button>
                           </div>
                        </div>
                    ))}
                </div>
                 {formData.items.length === 0 && <p className="text-gray-400 text-center py-4">No items added to this order.</p>}
            </div>

            <div className="border-t border-dark-700 pt-4 grid grid-cols-12 gap-3 items-end bg-dark-900/30 p-4 rounded-lg">
                <div className="col-span-12 md:col-span-5">
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Product</label>
                    <select name="productId" value={currentItem.productId} onChange={handleItemFormChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none">
                        <option value="">Select a product</option>
                        {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
                 <div className="col-span-6 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Quantity</label>
                    <input name="quantity" type="number" value={currentItem.quantity} onChange={handleItemFormChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                </div>
                 <div className="col-span-6 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300 mb-1 block">Unit Cost</label>
                    <input name="costPrice" type="number" value={currentItem.costPrice} onChange={handleItemFormChange} className="w-full bg-dark-700 text-white rounded-md border border-dark-600 p-2 focus:ring-2 focus:ring-brand-primary focus:outline-none" />
                </div>
                <div className="col-span-12 md:col-span-3">
                    <button onClick={handleAddItem} className="w-full bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-secondary/80 transition-colors flex items-center justify-center">
                        <i data-lucide="plus" className="w-5 h-5 mr-2"></i>
                        Add Item
                    </button>
                </div>
            </div>
        </div>
        <div className="p-6 bg-dark-900/50 flex justify-between items-center rounded-b-lg">
            <div>
                <span className="text-gray-300">Total Cost:</span>
                <span className="text-2xl font-bold text-white ml-2">${formData.totalCost.toFixed(2)}</span>
            </div>
            <div className="space-x-4">
                <button onClick={onClose} className="bg-dark-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-dark-500 transition-colors">
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-primary/80 transition-colors"
                >
                    Save Order
                </button>
            </div>
          </div>
      </div>
      <style>{`.animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; } @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
};

export default PurchaseOrderModal;