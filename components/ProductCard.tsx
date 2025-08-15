
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  currencySymbol: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, currencySymbol }) => {
  const isOutOfStock = product.stock <= 0;

  return (
    <div
      onClick={!isOutOfStock ? () => onAddToCart(product) : undefined}
      className={`bg-dark-800 rounded-lg overflow-hidden group transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-brand-primary/20 ${
        isOutOfStock ? 'cursor-not-allowed filter grayscale' : 'cursor-pointer'
      }`}
    >
      <div className="relative">
        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
         {isOutOfStock ? (
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold text-sm bg-red-600 px-3 py-1 rounded">OUT OF STOCK</span>
            </div>
        ) : (
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                <i data-lucide="plus-circle" className="text-white h-12 w-12 opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300"></i>
            </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white truncate">{product.name}</h3>
        <div className="flex justify-between items-center mt-1">
            <p className="text-brand-secondary font-bold">{currencySymbol}{product.price.toFixed(2)}</p>
            <p className={`text-sm font-medium ${product.stock < 10 && product.stock > 0 ? 'text-yellow-400' : 'text-gray-400'}`}>{product.stock} in stock</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
