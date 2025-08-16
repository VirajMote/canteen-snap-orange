export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  isVeg: boolean;
  image: string;
  description?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  image: string;
  items: MenuItem[];
}