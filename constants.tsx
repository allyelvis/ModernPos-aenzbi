
import React from 'react';
import { Page, Product, Sale } from './types';

export const NAV_ITEMS: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <i data-lucide="layout-dashboard"></i> },
  { id: 'pos', label: 'POS', icon: <i data-lucide="scan-line"></i> },
  { id: 'reports', label: 'Reports', icon: <i data-lucide="bar-chart-3"></i> },
  { id: 'products', label: 'Products', icon: <i data-lucide="package"></i> },
  { id: 'settings', label: 'Settings', icon: <i data-lucide="settings"></i> },
];

export const MOCK_PRODUCTS: Product[] = [
    // Restaurant
    { id: 1, name: 'Bruschetta', price: 8.99, category: 'Appetizers', imageUrl: 'https://picsum.photos/id/10/400/400', stock: 50 },
    { id: 2, name: 'Caprese Salad', price: 10.50, category: 'Appetizers', imageUrl: 'https://picsum.photos/id/20/400/400', stock: 40 },
    { id: 3, name: 'Spaghetti Carbonara', price: 15.99, category: 'Main Courses', imageUrl: 'https://picsum.photos/id/30/400/400', stock: 30 },
    { id: 4, name: 'Margherita Pizza', price: 14.50, category: 'Main Courses', imageUrl: 'https://picsum.photos/id/40/400/400', stock: 25 },
    { id: 5, name: 'Grilled Salmon', price: 22.00, category: 'Main Courses', imageUrl: 'https://picsum.photos/id/50/400/400', stock: 20 },
    { id: 6, name: 'Tiramisu', price: 7.50, category: 'Desserts', imageUrl: 'https://picsum.photos/id/60/400/400', stock: 35 },
    { id: 7, name: 'Panna Cotta', price: 6.99, category: 'Desserts', imageUrl: 'https://picsum.photos/id/70/400/400', stock: 30 },
    { id: 8, name: 'Espresso', price: 3.00, category: 'Beverages', imageUrl: 'https://picsum.photos/id/80/400/400', stock: 100 },
    { id: 9, name: 'Mineral Water', price: 2.50, category: 'Beverages', imageUrl: 'https://picsum.photos/id/90/400/400', stock: 150 },

    // Retail
    { id: 10, name: 'Wireless Headphones', price: 199.99, category: 'Electronics', imageUrl: 'https://picsum.photos/id/100/400/400', stock: 60 },
    { id: 11, name: 'Smartwatch', price: 249.50, category: 'Electronics', imageUrl: 'https://picsum.photos/id/110/400/400', stock: 45 },
    { id: 12, name: 'Laptop Pro', price: 1299.00, category: 'Electronics', imageUrl: 'https://picsum.photos/id/120/400/400', stock: 15 },
    { id: 13, name: 'Graphic T-Shirt', price: 29.99, category: 'Apparel', imageUrl: 'https://picsum.photos/id/130/400/400', stock: 200 },
    { id: 14, name: 'Denim Jeans', price: 79.99, category: 'Apparel', imageUrl: 'https://picsum.photos/id/140/400/400', stock: 120 },
    { id: 15, name: 'Leather Jacket', price: 250.00, category: 'Apparel', imageUrl: 'https://picsum.photos/id/150/400/400', stock: 50 },
];

export const MOCK_SALES_DATA = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export const MOCK_RECENT_SALES: Sale[] = [
    { id: 'TXN-001', date: '2023-10-27', total: 45.98, items: [ { ...MOCK_PRODUCTS[2], quantity: 1 }, { ...MOCK_PRODUCTS[8], quantity: 2 } ] },
    { id: 'TXN-002', date: '2023-10-27', total: 279.98, items: [ { ...MOCK_PRODUCTS[10], quantity: 1 }, { ...MOCK_PRODUCTS[13], quantity: 1 } ] },
    { id: 'TXN-003', date: '2023-10-26', total: 14.50, items: [ { ...MOCK_PRODUCTS[3], quantity: 1 } ] },
    { id: 'TXN-004', date: '2023-10-26', total: 329.99, items: [ { ...MOCK_PRODUCTS[14], quantity: 1 }, { ...MOCK_PRODUCTS[11], quantity: 1 } ] },
    { id: 'TXN-005', date: '2023-10-25', total: 16.49, items: [ { ...MOCK_PRODUCTS[0], quantity: 1 }, { ...MOCK_PRODUCTS[6], quantity: 1 } ] },
];
