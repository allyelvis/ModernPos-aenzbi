import React, { useState, useMemo, useCallback, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import OrderSummary from '../components/OrderSummary';
import PaymentModal from '../components/PaymentModal';
import type { Product, OrderItem, Category, StoreSettings } from '../types';
import { syncWithFiscalPrinter } from '../services/fiscalizationService';
import { POS_CATEGORIES } from '../constants';

interface POSProps {
  storeSettings: StoreSettings;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const POS: React.FC<POSProps> = ({ storeSettings, products, setProducts }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (isSyncing) {
      // @ts-ignore
      if (window.lucide) {
        // @ts-ignore
        window.lucide.createIcons();
      }
    }
  }, [isSyncing]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory, products]);

  const handleAddToCart = useCallback((product: Product) => {
    const productInStock = products.find(p => p.id === product.id);
    if (!productInStock || productInStock.stock <= 0) return;

    setOrderItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= productInStock.stock) return prevItems;
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1, stock: productInStock.stock }];
    });
  }, [products]);

  const handleQuantityChange = useCallback((productId: number, newQuantity: number) => {
    const productInStock = products.find(p => p.id === productId);
    if (!productInStock) return;
    
    const newClampedQuantity = Math.max(1, Math.min(newQuantity, productInStock.stock));

    setOrderItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newClampedQuantity } : item
      )
    );
  }, [products]);

  const handleRemoveItem = useCallback((productId: number) => {
    setOrderItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);
  
  const handleCheckout = () => {
    if (orderItems.length > 0) {
      setIsModalOpen(true);
    }
  };
  
  const subtotal = useMemo(() => orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0), [orderItems]);
  const taxAmount = useMemo(() => subtotal * (storeSettings.taxRate / 100), [subtotal, storeSettings.taxRate]);
  const total = useMemo(() => subtotal + taxAmount, [subtotal, taxAmount]);
  
  const handleConfirmPayment = async (paymentMethod: 'card' | 'cash') => {
      setIsModalOpen(false);

      if (storeSettings.fiscalization.enabled && storeSettings.fiscalization.syncOn.sale) {
          setIsSyncing(true);
          const payload = {
              transactionId: `TXN-${Date.now()}`,
              timestamp: new Date().toISOString(),
              items: orderItems,
              subtotal: subtotal,
              tax: taxAmount,
              total: total,
              paymentMethod: paymentMethod,
          };

          try {
              const result = await syncWithFiscalPrinter(storeSettings.fiscalization.endpointUrl, payload);
              alert(result.message);
              if (!result.success) {
                  console.warn("Fiscalization sync failed, but sale is proceeding locally.");
              }
          } catch (e) {
              alert("A critical error occurred during the fiscalization process.");
          } finally {
              setIsSyncing(false);
          }
      }
      
      // Decrement stock
      setProducts(currentProducts => {
        const updatedProducts = [...currentProducts];
        orderItems.forEach(itemInCart => {
            const productIndex = updatedProducts.findIndex(p => p.id === itemInCart.id);
            if (productIndex !== -1) {
                const newStock = updatedProducts[productIndex].stock - itemInCart.quantity;
                updatedProducts[productIndex] = {
                    ...updatedProducts[productIndex],
                    stock: newStock >= 0 ? newStock : 0 // Ensure stock doesn't go negative
                };
            }
        });
        return updatedProducts;
      });

      setOrderItems([]); // Clear cart after successful payment
  };


  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">Point of Sale</h1>
          <p className="text-gray-400">Select products to start a new transaction.</p>
        </div>
        <div className="mb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2 -mx-1 px-1">
            {POS_CATEGORIES.map(category => (
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
        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} currencySymbol={storeSettings.currency.symbol} />
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
          taxRate={storeSettings.taxRate}
          currencySymbol={storeSettings.currency.symbol}
        />
      </div>

      <PaymentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        totalAmount={total}
        onConfirm={handleConfirmPayment}
        currencySymbol={storeSettings.currency.symbol}
      />

      {isSyncing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
            <div className="flex flex-col items-center text-white">
                <i data-lucide="zap" className="w-16 h-16 animate-pulse text-brand-primary"></i>
                <p className="mt-4 text-xl font-bold">Syncing with Fiscal Printer...</p>
                <p className="text-gray-400">Please wait.</p>
            </div>
            <style>{`.animate-fade-in { animation: fade-in 0.3s ease-out forwards; } @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
        </div>
      )}
    </div>
  );
};

export default POS;
