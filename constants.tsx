import React from 'react';
import { Page, Product, Sale, Customer, StoreSettings, DatabaseSettings, Category, User, UserRole, Department, Supplier, PurchaseOrder } from './types';

export const NAV_ITEMS: { id: Page; label: string; icon: React.ReactNode; roles: UserRole[] }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <i data-lucide="layout-dashboard"></i>, roles: ['Admin', 'Manager'] },
  { id: 'pos', label: 'POS', icon: <i data-lucide="scan-line"></i>, roles: ['Admin', 'Manager', 'Cashier'] },
  { id: 'reports', label: 'Reports', icon: <i data-lucide="bar-chart-3"></i>, roles: ['Admin', 'Manager'] },
  { id: 'products', label: 'Products', icon: <i data-lucide="package"></i>, roles: ['Admin', 'Manager'] },
  { id: 'purchases', label: 'Purchases', icon: <i data-lucide="clipboard-list"></i>, roles: ['Admin', 'Manager'] },
  { id: 'customers', label: 'Customers', icon: <i data-lucide="users-round"></i>, roles: ['Admin', 'Manager'] },
  { id: 'suppliers', label: 'Suppliers', icon: <i data-lucide="truck"></i>, roles: ['Admin', 'Manager'] },
  { id: 'departments', label: 'Departments', icon: <i data-lucide="building-2"></i>, roles: ['Admin'] },
  { id: 'users', label: 'Users', icon: <i data-lucide="users"></i>, roles: ['Admin'] },
  { id: 'settings', label: 'Settings', icon: <i data-lucide="settings"></i>, roles: ['Admin'] },
];

export const MOCK_DEPARTMENTS: Department[] = [
    { id: 1, name: 'Food & Beverage', description: 'All edible items and drinks.' },
    { id: 2, name: 'Consumer Electronics', description: 'Gadgets and electronic devices.' },
    { id: 3, name: 'Fashion & Apparel', description: 'Clothing, shoes, and accessories.' },
];

export const MOCK_PRODUCTS: Product[] = [
    // Restaurant
    { id: 1, sku: 'APP-BRU-01', name: 'Bruschetta', price: 8.99, category: 'Appetizers', imageUrl: 'https://picsum.photos/id/10/400/400', stock: 50, departmentId: 1 },
    { id: 2, sku: 'APP-CAP-02', name: 'Caprese Salad', price: 10.50, category: 'Appetizers', imageUrl: 'https://picsum.photos/id/20/400/400', stock: 40, departmentId: 1 },
    { id: 3, sku: 'MAIN-CAR-03', name: 'Spaghetti Carbonara', price: 15.99, category: 'Main Courses', imageUrl: 'https://picsum.photos/id/30/400/400', stock: 30, departmentId: 1 },
    { id: 4, sku: 'MAIN-PIZ-04', name: 'Margherita Pizza', price: 14.50, category: 'Main Courses', imageUrl: 'https://picsum.photos/id/40/400/400', stock: 25, departmentId: 1 },
    { id: 5, sku: 'MAIN-SAL-05', name: 'Grilled Salmon', price: 22.00, category: 'Main Courses', imageUrl: 'https://picsum.photos/id/50/400/400', stock: 20, departmentId: 1 },
    { id: 6, sku: 'DES-TIR-06', name: 'Tiramisu', price: 7.50, category: 'Desserts', imageUrl: 'https://picsum.photos/id/60/400/400', stock: 35, departmentId: 1 },
    { id: 7, sku: 'DES-PAN-07', name: 'Panna Cotta', price: 6.99, category: 'Desserts', imageUrl: 'https://picsum.photos/id/70/400/400', stock: 30, departmentId: 1 },
    { id: 8, sku: 'BEV-ESP-08', name: 'Espresso', price: 3.00, category: 'Beverages', imageUrl: 'https://picsum.photos/id/80/400/400', stock: 100, departmentId: 1 },
    { id: 9, sku: 'BEV-WAT-09', name: 'Mineral Water', price: 2.50, category: 'Beverages', imageUrl: 'https://picsum.photos/id/90/400/400', stock: 150, departmentId: 1 },

    // Retail
    { id: 10, sku: 'ELEC-HDPH-10', name: 'Wireless Headphones', price: 199.99, category: 'Electronics', imageUrl: 'https://picsum.photos/id/100/400/400', stock: 60, departmentId: 2 },
    { id: 11, sku: 'ELEC-SWAT-11', name: 'Smartwatch', price: 249.50, category: 'Electronics', imageUrl: 'https://picsum.photos/id/110/400/400', stock: 45, departmentId: 2 },
    { id: 12, sku: 'ELEC-LTP-12', name: 'Laptop Pro', price: 1299.00, category: 'Electronics', imageUrl: 'https://picsum.photos/id/120/400/400', stock: 15, departmentId: 2 },
    { id: 13, sku: 'APP-TSH-13', name: 'Graphic T-Shirt', price: 29.99, category: 'Apparel', imageUrl: 'https://picsum.photos/id/130/400/400', stock: 200, departmentId: 3 },
    { id: 14, sku: 'APP-JNS-14', name: 'Denim Jeans', price: 79.99, category: 'Apparel', imageUrl: 'https://picsum.photos/id/140/400/400', stock: 120, departmentId: 3 },
    { id: 15, sku: 'APP-JKT-15', name: 'Leather Jacket', price: 250.00, category: 'Apparel', imageUrl: 'https://picsum.photos/id/150/400/400', stock: 50, departmentId: 3 },
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

export const MOCK_CUSTOMERS: Customer[] = [
    { id: 1, name: 'John Doe', email: 'john.d@example.com', phone: '123-456-7890', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', email: 'jane.s@example.com', phone: '987-654-3210', address: '456 Oak Ave' },
];

export const MOCK_SUPPLIERS: Supplier[] = [
    { id: 1, name: 'Global Foods Inc.', contactPerson: 'Anna Williams', email: 'sales@globalfoods.com', phone: '111-222-3333' },
    { id: 2, name: 'Tech Gadgetry', contactPerson: 'Peter Jones', email: 'contact@techgadgetry.dev', phone: '444-555-6666' },
    { id: 3, name: 'Fashion Forward', contactPerson: 'Emily Brown', email: 'orders@fashionforward.com', phone: '777-888-9999' },
];

export const MOCK_PURCHASE_ORDERS: PurchaseOrder[] = [
    { id: 1, supplierId: 1, date: '2023-10-20', status: 'Received', items: [{ productId: 1, productName: 'Bruschetta', quantity: 100, costPrice: 4.50 }], totalCost: 450.00 },
    { id: 2, supplierId: 2, date: '2023-10-22', status: 'Pending', items: [{ productId: 10, productName: 'Wireless Headphones', quantity: 50, costPrice: 120.00 }], totalCost: 6000.00 },
    { id: 3, supplierId: 3, date: '2023-10-25', status: 'Pending', items: [{ productId: 14, productName: 'Denim Jeans', quantity: 200, costPrice: 40.00 }], totalCost: 8000.00 },
];

export const MOCK_RECENT_SALES: Sale[] = [
    { id: 'TXN-001', date: '2023-10-27', total: 45.98, items: [ { ...MOCK_PRODUCTS[2], quantity: 1 }, { ...MOCK_PRODUCTS[8], quantity: 2 } ], customerId: 1, paymentMethod: 'card' },
    { id: 'TXN-002', date: '2023-10-27', total: 279.98, items: [ { ...MOCK_PRODUCTS[10], quantity: 1 }, { ...MOCK_PRODUCTS[13], quantity: 1 } ], customerId: 2, paymentMethod: 'card' },
    { id: 'TXN-003', date: '2023-10-26', total: 14.50, items: [ { ...MOCK_PRODUCTS[3], quantity: 1 } ], customerId: 1, paymentMethod: 'cash' },
    { id: 'TXN-004', date: '2023-10-26', total: 329.99, items: [ { ...MOCK_PRODUCTS[14], quantity: 1 }, { ...MOCK_PRODUCTS[11], quantity: 1 } ], customerId: 2, paymentMethod: 'card' },
    { id: 'TXN-005', date: '2023-10-25', total: 16.49, items: [ { ...MOCK_PRODUCTS[0], quantity: 1 }, { ...MOCK_PRODUCTS[6], quantity: 1 } ], customerId: 1, paymentMethod: 'cash' },
];

export const MOCK_USERS: User[] = [
    { id: 1, name: 'Ally Elvis', email: 'admin@nexus.pos', role: 'Admin', password: 'password123' },
    { id: 2, name: 'Mark Bridger', email: 'manager@nexus.pos', role: 'Manager', password: 'password123' },
    { id: 3, name: 'Chris Pinner', email: 'cashier@nexus.pos', role: 'Cashier', password: 'password123' },
];

export const STORE_SETTINGS: StoreSettings = {
    storeName: 'Nexus Innovations Inc.',
    contactEmail: 'contact@nexus.pos',
    taxRate: 8,
    currency: {
        symbol: '$',
        code: 'USD',
    },
    fiscalization: {
        enabled: false,
        endpointUrl: 'https://api.fiscal.service/v1/sync',
        syncOn: {
            sale: true,
            refund: false,
            endOfDay: false,
        }
    },
    database: {
        type: 'None',
        host: '',
        port: 5432,
        username: '',
        password: '',
        databaseName: '',
    },
    users: MOCK_USERS,
    customers: MOCK_CUSTOMERS,
    suppliers: MOCK_SUPPLIERS,
    departments: MOCK_DEPARTMENTS,
    purchaseOrders: MOCK_PURCHASE_ORDERS,
};

export const FISCALIZATION_MODULES: { id: keyof StoreSettings['fiscalization']['syncOn']; label: string }[] = [
    { id: 'sale', label: 'On Sale Completion' },
    { id: 'refund', label: 'On Refund Processed' },
    { id: 'endOfDay', label: 'On End-of-Day Report' },
];

export const DATABASE_TYPES: DatabaseSettings['type'][] = ['None', 'PostgreSQL', 'MySQL', 'SQLite'];

export const POS_CATEGORIES: Category[] = ['All', 'Appetizers', 'Main Courses', 'Desserts', 'Beverages', 'Electronics', 'Apparel'];
export const PRODUCT_CATEGORIES: Category[] = ['Appetizers', 'Main Courses', 'Desserts', 'Beverages', 'Electronics', 'Apparel'];

export const USER_ROLES: UserRole[] = ['Admin', 'Manager', 'Cashier'];