export type Page = 'dashboard' | 'pos' | 'reports' | 'products' | 'settings';

export type Category = 'Appetizers' | 'Main Courses' | 'Desserts' | 'Beverages' | 'Electronics' | 'Apparel' | 'All';

export interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  category: Category;
  imageUrl: string;
  stock: number;
  description?: string;
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
}
