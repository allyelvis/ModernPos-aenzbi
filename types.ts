
export type Page = 'dashboard' | 'pos' | 'reports' | 'products' | 'settings';

export type Category = 'Appetizers' | 'Main Courses' | 'Desserts' | 'Beverages' | 'Electronics' | 'Apparel' | 'All';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  imageUrl: string;
  stock: number;
}

export interface OrderItem extends Product {
  quantity: number;
}

export interface Sale {
    id: string;
    date: string; // YYYY-MM-DD
    total: number;
    items: OrderItem[];
}
