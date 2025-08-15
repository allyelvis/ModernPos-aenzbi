
import React, { useState, useCallback } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { generateProductDescription } from '../services/geminiService';
import type { Product } from '../types';

const ProductRow: React.FC<{ product: Product }> = ({ product }) => {
    const [description, setDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateDescription = useCallback(async () => {
        setIsLoading(true);
        setDescription('');
        const generatedDesc = await generateProductDescription(product.name);
        setDescription(generatedDesc);
        setIsLoading(false);
    }, [product.name]);

    return (
        <tr className="border-b border-dark-700 hover:bg-dark-700/50">
            <td className="p-4 flex items-center">
                <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover mr-4" />
                <span className="font-medium text-white">{product.name}</span>
            </td>
            <td className="p-4">{product.category}</td>
            <td className="p-4">${product.price.toFixed(2)}</td>
            <td className="p-4">{product.stock}</td>
            <td className="p-4 text-sm text-gray-300">
                {isLoading && <span className="text-blue-400">Generating...</span>}
                {description && !isLoading && <p>{description}</p>}
                {!description && !isLoading && <span className="text-gray-500">No description.</span>}
            </td>
            <td className="p-4 text-right">
                <button 
                    onClick={handleGenerateDescription}
                    disabled={isLoading}
                    className="bg-brand-secondary text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-brand-secondary/80 disabled:bg-dark-600 disabled:cursor-not-allowed flex items-center"
                >
                    <i data-lucide="sparkles" className="w-4 h-4 mr-2"></i>
                    Generate
                </button>
            </td>
        </tr>
    );
};

const Products: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-white">Product Management</h1>
      
      <div className="bg-dark-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-dark-700 text-sm text-gray-400 bg-dark-900/30">
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 min-w-[300px]">AI Generated Description</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCTS.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
