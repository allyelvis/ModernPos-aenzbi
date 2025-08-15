
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div
      onClick={() => onAddToCart(product)}
      className="bg-dark-800 rounded-lg overflow-hidden cursor-pointer group transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-brand-primary/20"
    >
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
            <i data-lucide="plus-circle" className="text-white h-12 w-12 opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300"></i>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white truncate">{product.name}</h3>
        <p className="text-brand-secondary font-bold mt-1">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
