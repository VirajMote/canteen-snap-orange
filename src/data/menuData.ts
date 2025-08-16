import { MenuCategory, MenuItem } from '@/types/menu';

export const menuItems: MenuItem[] = [
  // Juice
  { id: '1', name: 'Mosambi Juice', price: 25, category: 'Juice', isVeg: true, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&h=300&fit=crop' },
  { id: '2', name: 'Pineapple Juice', price: 25, category: 'Juice', isVeg: true, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=300&h=300&fit=crop' },
  { id: '3', name: 'Watermelon Juice', price: 20, category: 'Juice', isVeg: true, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=300&fit=crop' },
  { id: '4', name: 'Orange Juice', price: 20, category: 'Juice', isVeg: true, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop' },
  { id: '5', name: 'Apple Juice', price: 60, category: 'Juice', isVeg: true, image: 'https://images.unsplash.com/photo-1560424865-0ebf6667eb5f?w=300&h=300&fit=crop' },

  // Milkshake
  { id: '6', name: 'Mango Milkshake', price: 40, category: 'Milkshake', isVeg: true, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop' },
  { id: '7', name: 'Banana Milkshake', price: 40, category: 'Milkshake', isVeg: true, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop' },
  { id: '8', name: 'Strawberry Milkshake', price: 50, category: 'Milkshake', isVeg: true, image: 'https://images.unsplash.com/photo-1553787790-6146c83ac694?w=300&h=300&fit=crop' },

  // Cold Drinks
  { id: '9', name: 'Plain Cold Drink', price: 25, category: 'Cold Drinks', isVeg: true, image: 'https://images.unsplash.com/photo-1624552184280-18bbe7b06369?w=300&h=300&fit=crop' },
  { id: '10', name: 'Special Lemon Soda', price: 30, category: 'Cold Drinks', isVeg: true, image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=300&fit=crop' },
  { id: '11', name: 'Lassi', price: 40, category: 'Cold Drinks', isVeg: true, image: 'https://images.unsplash.com/photo-1576398289164-c48dc021b4e1?w=300&h=300&fit=crop' },

  // Sandwich
  { id: '12', name: 'Veg Sandwich', price: 40, category: 'Sandwich', isVeg: true, image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=300&h=300&fit=crop' },
  { id: '13', name: 'Cheese Sandwich', price: 50, category: 'Sandwich', isVeg: true, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300&h=300&fit=crop' },
  { id: '14', name: 'Paneer Cheese Sandwich', price: 70, category: 'Sandwich', isVeg: true, image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300&h=300&fit=crop' },

  // Rolls
  { id: '15', name: 'Veg Roll', price: 40, category: 'Rolls', isVeg: true, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=300&fit=crop' },
  { id: '16', name: 'Paneer Roll', price: 50, category: 'Rolls', isVeg: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop' },
  { id: '17', name: 'Paneer Tikka Roll', price: 70, category: 'Rolls', isVeg: true, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300&h=300&fit=crop' },

  // South Indian
  { id: '18', name: 'Idli', price: 25, category: 'South Indian', isVeg: true, image: 'https://images.unsplash.com/photo-1630409346881-8c35e4b6fd0a?w=300&h=300&fit=crop' },
  { id: '19', name: 'Medu Vada', price: 30, category: 'South Indian', isVeg: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=300&fit=crop' },
  { id: '20', name: 'Plain Dosa', price: 40, category: 'South Indian', isVeg: true, image: 'https://images.unsplash.com/photo-1624992810022-e7c3ec0ae15e?w=300&h=300&fit=crop' },
  { id: '21', name: 'Masala Dosa', price: 50, category: 'South Indian', isVeg: true, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=300&fit=crop' },

  // Paratha
  { id: '22', name: 'Aloo Paratha', price: 40, category: 'Paratha', isVeg: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop' },
  { id: '23', name: 'Paneer Paratha', price: 60, category: 'Paratha', isVeg: true, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300&h=300&fit=crop' },

  // Snacks
  { id: '24', name: 'Vada Pav', price: 15, category: 'Snacks', isVeg: true, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=300&fit=crop' },
  { id: '25', name: 'Samosa', price: 12, category: 'Snacks', isVeg: true, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=300&fit=crop' },
  { id: '26', name: 'Veg Burger', price: 40, category: 'Snacks', isVeg: true, image: 'https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300&h=300&fit=crop' },

  // Hot Beverages
  { id: '27', name: 'Tea', price: 10, category: 'Hot Beverages', isVeg: true, image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b692c4?w=300&h=300&fit=crop' },
  { id: '28', name: 'Coffee', price: 15, category: 'Hot Beverages', isVeg: true, image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=300&h=300&fit=crop' },
  { id: '29', name: 'Masala Tea', price: 12, category: 'Hot Beverages', isVeg: true, image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b692c4?w=300&h=300&fit=crop' }
];

export const menuCategories: MenuCategory[] = [
  {
    id: 'juice',
    name: 'Juice',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop',
    items: menuItems.filter(item => item.category === 'Juice')
  },
  {
    id: 'milkshake',
    name: 'Milkshake',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    items: menuItems.filter(item => item.category === 'Milkshake')
  },
  {
    id: 'cold-drinks',
    name: 'Cold Drinks',
    image: 'https://images.unsplash.com/photo-1624552184280-18bbe7b06369?w=400&h=300&fit=crop',
    items: menuItems.filter(item => item.category === 'Cold Drinks')
  },
  {
    id: 'sandwich',
    name: 'Sandwich',
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop',
    items: menuItems.filter(item => item.category === 'Sandwich')
  },
  {
    id: 'rolls',
    name: 'Rolls',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    items: menuItems.filter(item => item.category === 'Rolls')
  },
  {
    id: 'south-indian',
    name: 'South Indian',
    image: 'https://images.unsplash.com/photo-1630409346881-8c35e4b6fd0a?w=400&h=300&fit=crop',
    items: menuItems.filter(item => item.category === 'South Indian')
  },
  {
    id: 'paratha',
    name: 'Paratha',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
    items: menuItems.filter(item => item.category === 'Paratha')
  },
  {
    id: 'snacks',
    name: 'Snacks',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
    items: menuItems.filter(item => item.category === 'Snacks')
  },
  {
    id: 'hot-beverages',
    name: 'Hot Beverages',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400&h=300&fit=crop',
    items: menuItems.filter(item => item.category === 'Hot Beverages')
  }
];

export const popularItems = [
  menuItems.find(item => item.name === 'Masala Tea')!,
  menuItems.find(item => item.name === 'Coffee')!,
  menuItems.find(item => item.name === 'Vada Pav')!,
  menuItems.find(item => item.name === 'Samosa')!,
  menuItems.find(item => item.name === 'Idli')!,
  menuItems.find(item => item.name === 'Veg Sandwich')!
];