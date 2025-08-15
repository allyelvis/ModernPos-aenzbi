import React, { useState, useEffect } from 'react';
import type { PurchaseOrder, StoreSettings, Product } from '../types';
import PurchaseOrderModal from '../components/PurchaseOrderModal';

const PurchaseOrderRow: React.FC<{ 
    order: PurchaseOrder, 
    supplierName: string,
    onEdit: (order: PurchaseOrder) => void;
    onDelete: (orderId: number) => void;
    onReceive: (order: PurchaseOrder) => void;
    currencySymbol: string;
}> = ({ order, supplierName, onEdit, onDelete, onReceive, currencySymbol }) => {
    
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-500/20 text-yellow-300';
            case 'Received': return 'bg-green-500/20 text-green-300';
            case 'Cancelled': return 'bg-red-500/20 text-red-300';
            default: return 'bg-dark-600 text-gray-300';
        }
    }

    return (
        <tr className="border-b border-dark-700 hover:bg-dark-700/50">
            <td className="p-4 font-mono text-white">PO-{order.id}</td>
            <td className="p-4 font-medium text-white">{supplierName}</td>
            <td className="p-4 text-gray-300">{new Date(order.date).toLocaleDateString()}</td>
            <td className="p-4">
                 <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>
                    {order.status}
                </span>
            </td>
            <td className="p-4 font-semibold text-brand-secondary text-right">{currencySymbol}{order.totalCost.toFixed(2)}</td>
            <td className="p-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    {order.status === 'Pending' && (
                        <button 
                            onClick={() => onReceive(order)}
                            className="bg-green-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-green-500 transition-colors"
                            aria-label="Receive Stock"
                            title="Receive Stock"
                        >
                            <i data-lucide="package-check" className="w-4 h-4"></i>
                        </button>
                    )}
                    <button 
                        onClick={() => onEdit(order)}
                        className="bg-dark-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors"
                        aria-label="Edit"
                        title="Edit"
                    >
                        <i data-lucide="pencil" className="w-4 h-4"></i>
                    </button>
                    <button 
                        onClick={() => onDelete(order.id)}
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

interface PurchasesProps {
    storeSettings: StoreSettings;
    setStoreSettings: React.Dispatch<React.SetStateAction<StoreSettings>>;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Purchases: React.FC<PurchasesProps> = ({ storeSettings, setStoreSettings, products, setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<PurchaseOrder | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [storeSettings.purchaseOrders]);

  const handleAddNew = () => {
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const handleEdit = (order: PurchaseOrder) => {
    setEditingOrder(order);
    setIsModalOpen(true);
  };
  
  const handleDelete = (orderId: number) => {
      if (window.confirm('Are you sure you want to delete this purchase order?')) {
          setStoreSettings(prev => ({
              ...prev,
              purchaseOrders: prev.purchaseOrders.filter(po => po.id !== orderId)
          }));
      }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  const handleSave = (orderData: Omit<PurchaseOrder, 'id'> | PurchaseOrder) => {
    setStoreSettings(prev => {
        const isEditing = 'id' in orderData;
        if (isEditing) {
            return { ...prev, purchaseOrders: prev.purchaseOrders.map(po => (po.id === orderData.id ? orderData as PurchaseOrder : po)) };
        } else {
            const newOrder: PurchaseOrder = {
                ...orderData,
                id: Date.now(),
            };
            return { ...prev, purchaseOrders: [...prev.purchaseOrders, newOrder] };
        }
    });
    handleCloseModal();
  };
  
  const handleReceiveStock = (order: PurchaseOrder) => {
      if (window.confirm('Are you sure you want to mark this order as received? This will add the items to your inventory stock.')) {
          // Update product stock
          setProducts(currentProducts => {
              const updatedProducts = [...currentProducts];
              order.items.forEach(item => {
                  const productIndex = updatedProducts.findIndex(p => p.id === item.productId);
                  if (productIndex !== -1) {
                      updatedProducts[productIndex].stock += item.quantity;
                  }
              });
              return updatedProducts;
          });
          
          // Update order status
          const updatedOrder = { ...order, status: 'Received' as 'Received' };
          handleSave(updatedOrder);
      }
  };
  
  const getSupplierName = (supplierId: number) => {
      return storeSettings.suppliers.find(s => s.id === supplierId)?.name || 'Unknown Supplier';
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Purchase Orders</h1>
        <button
          onClick={handleAddNew}
          className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary/80 transition-colors flex items-center"
        >
          <i data-lucide="plus" className="w-5 h-5 mr-2"></i>
          Create New Order
        </button>
      </div>
      
      <div className="bg-dark-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400 bg-dark-900/30">
                <th className="p-4">Order ID</th>
                <th className="p-4">Supplier</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Total</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {storeSettings.purchaseOrders.map((order) => (
                <PurchaseOrderRow 
                    key={order.id} 
                    order={order} 
                    supplierName={getSupplierName(order.supplierId)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onReceive={handleReceiveStock}
                    currencySymbol={storeSettings.currency.symbol}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PurchaseOrderModal
        isOpen={isModalOpen}
        order={editingOrder}
        onClose={handleCloseModal}
        onSave={handleSave}
        suppliers={storeSettings.suppliers}
        products={products}
      />
    </div>
  );
};

export default Purchases;