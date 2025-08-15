import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Reports from './pages/Reports';
import Products from './pages/Products';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Login from './pages/Login';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Departments from './pages/Departments';
import Purchases from './pages/Purchases';
import { Page, StoreSettings, Product, User } from './types';
import { STORE_SETTINGS, MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('pos');
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(STORE_SETTINGS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const handleLogin = (email: string, pass: string): boolean => {
      const user = storeSettings.users.find(u => u.email === email && u.password === pass);
      if (user) {
          setActiveUser(user);
          // Default page based on role
          if (user.role === 'Cashier') setActivePage('pos');
          else setActivePage('dashboard');
          return true;
      }
      return false;
  };

  const handleLogout = () => {
      setActiveUser(null);
  };
  
  const renderPage = () => {
    if (!activeUser) return null; // Should not happen if Login component is shown

    switch (activePage) {
      case 'dashboard':
        return <Dashboard storeSettings={storeSettings} />;
      case 'pos':
        return <POS storeSettings={storeSettings} products={products} setProducts={setProducts} />;
      case 'reports':
        return <Reports storeSettings={storeSettings} />;
      case 'products':
        return <Products storeSettings={storeSettings} products={products} setProducts={setProducts} activeUser={activeUser} />;
      case 'users':
        return <Users storeSettings={storeSettings} setStoreSettings={setStoreSettings} activeUser={activeUser} />;
      case 'settings':
        return <Settings storeSettings={storeSettings} setStoreSettings={setStoreSettings} />;
      case 'customers':
        return <Customers storeSettings={storeSettings} setStoreSettings={setStoreSettings} />;
      case 'suppliers':
        return <Suppliers storeSettings={storeSettings} setStoreSettings={setStoreSettings} />;
      case 'departments':
        return <Departments storeSettings={storeSettings} setStoreSettings={setStoreSettings} />;
       case 'purchases':
        return <Purchases storeSettings={storeSettings} setStoreSettings={setStoreSettings} products={products} setProducts={setProducts} />;
      default:
        return <Dashboard storeSettings={storeSettings} />;
    }
  };
  
  if (!activeUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-dark-900 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} activeUser={activeUser} onLogout={handleLogout} />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;