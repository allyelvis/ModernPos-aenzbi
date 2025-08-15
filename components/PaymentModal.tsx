
import React, { useState, useEffect } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, totalAmount, onConfirm }) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'cash'>('card');

  useEffect(() => {
    if (isOpen) {
      // @ts-ignore
      if (window.lucide) {
        // @ts-ignore
        window.lucide.createIcons();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-dark-800 rounded-lg shadow-xl w-full max-w-md m-4 transform transition-all duration-300 scale-95 animate-scale-in">
        <div className="p-6 border-b border-dark-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Confirm Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i data-lucide="x" className="w-6 h-6"></i>
          </button>
        </div>
        <div className="p-8">
          <div className="text-center mb-6">
            <p className="text-gray-400">Total Amount Due</p>
            <p className="text-5xl font-extrabold text-brand-primary">${totalAmount.toFixed(2)}</p>
          </div>
          <div className="mb-8">
            <p className="text-lg font-semibold mb-4 text-center text-white">Select Payment Method</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedMethod('card')}
                className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${selectedMethod === 'card' ? 'border-brand-primary bg-brand-primary/10' : 'border-dark-700 bg-dark-700/50'}`}
              >
                <i data-lucide="credit-card" className="w-10 h-10 mb-2 text-brand-primary"></i>
                <span className="font-semibold text-white">Card</span>
              </button>
              <button
                onClick={() => setSelectedMethod('cash')}
                className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${selectedMethod === 'cash' ? 'border-brand-secondary bg-brand-secondary/10' : 'border-dark-700 bg-dark-700/50'}`}
              >
                <i data-lucide="dollar-sign" className="w-10 h-10 mb-2 text-brand-secondary"></i>
                <span className="font-semibold text-white">Cash</span>
              </button>
            </div>
          </div>
          <button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-lg text-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center"
          >
            <i data-lucide="check-circle" className="w-6 h-6 mr-2"></i>
            Confirm Payment
          </button>
        </div>
      </div>
      <style>{`.animate-scale-in { animation: scale-in 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; } @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
};

export default PaymentModal;
