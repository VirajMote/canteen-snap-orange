export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  orderTime: Date;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderTime'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByStatus: (status: Order['status']) => Order[];
}