
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Reports from './pages/Reports';
import Products from './pages/Products';
import Settings from './pages/Settings';
import { Page, StoreSettings, Product } from './types';
import { STORE_SETTINGS, MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('pos');
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(STORE_SETTINGS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard storeSettings={storeSettings} />;
      case 'pos':
        return <POS storeSettings={storeSettings} products={products} setProducts={setProducts} />;
      case 'reports':
        return <Reports storeSettings={storeSettings} />;
      case 'products':
        return <Products storeSettings={storeSettings} products={products} setProducts={setProducts} />;
      case 'settings':
        return <Settings storeSettings={storeSettings} setStoreSettings={setStoreSettings} />;
      default:
        return <Dashboard storeSettings={storeSettings} />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-900 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
