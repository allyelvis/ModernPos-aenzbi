
import React, { useState, useMemo, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import OrderSummary from '../components/OrderSummary';
import PaymentModal from '../components/PaymentModal';
import { MOCK_PRODUCTS } from '../constants';
import type { Product, OrderItem, Category } from '../types';

const CATEGORIES: Category[] = ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages', 'Electronics', 'Apparel'];

const POS: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return MOCK_PRODUCTS;
    }
    return MOCK_PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = useCallback((product: Product) => {
    setOrderItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const handleQuantityChange = useCallback((productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setOrderItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const handleRemoveItem = useCallback((productId: number) => {
    setOrderItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);
  
  const handleCheckout = () => {
    setIsModalOpen(true);
  };
  
  const handleConfirmPayment = () => {
      console.log('Payment confirmed for order:', orderItems);
      setIsModalOpen(false);
      setOrderItems([]); // Clear cart after successful payment
  };

  const total = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.08;

  return (
    <div className="flex h-full gap-6">
      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Point of Sale</h1>
          <p className="text-gray-400">Select products to start a new transaction.</p>
        </div>
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-brand-primary text-white'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[400px] flex-shrink-0">
        <OrderSummary
          orderItems={orderItems}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </div>

      <PaymentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        totalAmount={total}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
};

export default POS;
