
import React, { useEffect } from 'react';
import type { OrderItem } from '../types';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
  taxRate: number; // in percentage
  currencySymbol: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems, onQuantityChange, onRemoveItem, onCheckout, taxRate, currencySymbol }) => {

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  
  useEffect(() => {
    // @ts-ignore
    if (window.lucide) {
      // @ts-ignore
      window.lucide.createIcons();
    }
  });

  return (
    <div className="bg-dark-800 w-full lg:w-96 rounded-lg shadow-2xl flex flex-col">
      <div className="p-6 border-b border-dark-700">
        <h2 className="text-2xl font-bold text-white">Current Order</h2>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        {orderItems.length === 0 ? (
          <div className="text-center text-gray-400 h-full flex flex-col items-center justify-center">
            <i data-lucide="shopping-cart" className="w-16 h-16 mb-4 text-dark-600"></i>
            <p>Your cart is empty.</p>
            <p className="text-sm">Click on products to add them.</p>
          </div>
        ) : (
          <ul>
            {orderItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-md object-cover mr-4" />
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-gray-400">{currencySymbol}{item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value, 10))}
                    className="w-16 bg-dark-700 text-white text-center rounded-md border border-dark-600 focus:ring-2 focus:ring-brand-primary focus:outline-none"
                  />
                  <button onClick={() => onRemoveItem(item.id)} className="ml-2 text-red-500 hover:text-red-400">
                    <i data-lucide="trash-2" className="w-5 h-5"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {orderItems.length > 0 && (
        <div className="p-6 bg-dark-900/50 rounded-b-lg">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>{currencySymbol}{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Tax ({taxRate}%)</span>
              <span>{currencySymbol}{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white font-bold text-xl">
              <span>Total</span>
              <span>{currencySymbol}{total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center"
          >
            <i data-lucide="credit-card" className="w-5 h-5 mr-2"></i>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
