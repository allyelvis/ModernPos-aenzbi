import React, { useState, useEffect } from 'react';
import type { Product, StoreSettings } from '../types';
import ProductModal from '../components/StockAdjustmentModal';

const ProductRow: React.FC<{ 
    product: Product, 
    currencySymbol: string,
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}> = ({ product, currencySymbol, onEdit, onDelete }) => {

    const getStockStatus = (stock: number) => {
        if (stock <= 0) return <span className="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">Out of Stock</span>;
        if (stock < 10) return <span className="px-2 py-1 text-xs font-semibold text-dark-900 bg-yellow-400 rounded-full">Low Stock</span>;
        return <span className="px-2 py-1 text-xs font-semibold text-dark-900 bg-green-400 rounded-full">In Stock</span>;
    }

    return (
        <tr className="border-b border-dark-700 hover:bg-dark-700/50 align-middle">
            <td className="p-4 flex items-center">
                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover mr-4" />
                <div className="flex-grow">
                    <span className="font-medium text-white">{product.name}</span>
                    <p className="text-gray-400 font-mono text-xs">{product.sku}</p>
                </div>
            </td>
            <td className="p-4">{product.category}</td>
            <td className="p-4">{currencySymbol}{product.price.toFixed(2)}</td>
            <td className="p-4 font-bold text-white text-center">{product.stock}</td>
             <td className="p-4">{getStockStatus(product.stock)}</td>
            <td className="p-4 text-sm text-gray-300 min-w-[250px] max-w-[350px]">
                <p className="truncate" title={product.description}>{product.description || 'No AI description.'}</p>
            </td>
            <td className="p-4 text-right">
                <div className="flex items-center justify-end space-x-2">
                    <button 
                        onClick={() => onEdit(product)}
                        className="bg-dark-600 text-white p-2 rounded-md text-sm font-semibold hover:bg-blue-600 transition-colors"
                        aria-label="Edit"
                        title="Edit"
                    >
                        <i data-lucide="pencil" className="w-4 h-4"></i>
                    </button>
                    <button 
                        onClick={() => onDelete(product.id)}
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

interface ProductsProps {
    storeSettings: StoreSettings;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Products: React.FC<ProductsProps> = ({ storeSettings, products, setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  }, [products]); // Rerun when products change to render new icons

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };
  
  const handleDelete = (productId: number) => {
      if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
          setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = (productData: Omit<Product, 'id'> | Product) => {
    setProducts(prevProducts => {
        const isEditing = 'id' in productData;
        if (isEditing) {
            return prevProducts.map(p => (p.id === productData.id ? productData as Product : p));
        } else {
            const newProduct: Product = {
                ...productData,
                id: Date.now(), // Use a more robust ID in a real app
                sku: productData.sku || `SKU-${Date.now()}`,
            };
            return [...prevProducts, newProduct];
        }
    });
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">Product & Inventory</h1>
        <button
          onClick={handleAddNew}
          className="bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-primary/80 transition-colors flex items-center"
        >
          <i data-lucide="plus" className="w-5 h-5 mr-2"></i>
          Add New Product
        </button>
      </div>
      
      <div className="bg-dark-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400 bg-dark-900/30">
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductRow 
                    key={product.id} 
                    product={product} 
                    currencySymbol={storeSettings.currency.symbol}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        product={editingProduct}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Products;
