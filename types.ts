export type Page = 'dashboard' | 'pos' | 'reports' | 'products' | 'settings' | 'users' | 'customers' | 'suppliers' | 'purchases' | 'departments';

export type Category = 'Appetizers' | 'Main Courses' | 'Desserts' | 'Beverages' | 'Electronics' | 'Apparel' | 'All';

export type UserRole = 'Admin' | 'Manager' | 'Cashier';

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    password?: string; // Should be hashed in a real app
}

export interface Department {
    id: number;
    name: string;
    description: string;
}

export interface Product {
  id: number;
  sku: string;
  name:string;
  price: number;
  category: Category;
  imageUrl: string;
  stock: number;
  description?: string;
  departmentId?: number;
}

export interface OrderItem extends Product {
  quantity: number;
}

export interface Sale {
    id: string;
    date: string; // YYYY-MM-DD
    total: number;
    items: OrderItem[];
    customerId: number;
    paymentMethod: 'card' | 'cash';
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
}

export interface Supplier {
    id: number;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
}

export interface PurchaseOrderItem {
    productId: number;
    productName: string;
    quantity: number;
    costPrice: number;
}

export interface PurchaseOrder {
    id: number;
    supplierId: number;
    date: string; // YYYY-MM-DD
    status: 'Pending' | 'Received' | 'Cancelled';
    items: PurchaseOrderItem[];
    totalCost: number;
}


export interface FiscalizationSettings {
    enabled: boolean;
    endpointUrl: string;
    syncOn: {
        sale: boolean;
        refund: boolean;
        endOfDay: boolean;
    };
}

export interface DatabaseSettings {
    type: 'PostgreSQL' | 'MySQL' | 'SQLite' | 'None';
    host: string;
    port: number;
    username: string;
    password: string;
    databaseName: string;
}

export interface StoreSettings {
    storeName: string;
    contactEmail: string;
    taxRate: number; // in percentage
    currency: {
        symbol: string; // e.g., $
        code: string; // e.g., USD
    };
    fiscalization: FiscalizationSettings;
    database: DatabaseSettings;
    users: User[];
    customers: Customer[];
    suppliers: Supplier[];
    departments: Department[];
    purchaseOrders: PurchaseOrder[];
}