import React, { createContext, useContext, useState } from 'react';
import { Order, OrderContextType } from '@/types/order';

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD001',
    customerId: '12345',
    customerName: 'Sushil Ashok Pote',
    items: [
      { id: '28', name: 'Coffee', price: 15, quantity: 2, isVeg: true },
      { id: '24', name: 'Vada Pav', price: 15, quantity: 1, isVeg: true }
    ],
    totalPrice: 45,
    orderTime: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    status: 'Pending'
  },
  {
    id: 'ORD002',
    customerId: '67890',
    customerName: 'Rahul Sharma',
    items: [
      { id: '21', name: 'Masala Dosa', price: 50, quantity: 1, isVeg: true },
      { id: '11', name: 'Lassi', price: 40, quantity: 1, isVeg: true }
    ],
    totalPrice: 90,
    orderTime: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
    status: 'In Progress'
  },
  {
    id: 'ORD003',
    customerId: '11111',
    customerName: 'Priya Patel',
    items: [
      { id: '13', name: 'Cheese Sandwich', price: 50, quantity: 1, isVeg: true },
      { id: '27', name: 'Tea', price: 10, quantity: 1, isVeg: true }
    ],
    totalPrice: 60,
    orderTime: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
    status: 'Completed'
  },
  {
    id: 'ORD004',
    customerId: '22222',
    customerName: 'Amit Kumar',
    items: [
      { id: '16', name: 'Paneer Roll', price: 50, quantity: 2, isVeg: true }
    ],
    totalPrice: 100,
    orderTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    status: 'Pending'
  },
  {
    id: 'ORD005',
    customerId: '33333',
    customerName: 'Sneha Desai',
    items: [
      { id: '18', name: 'Idli', price: 25, quantity: 4, isVeg: true },
      { id: '6', name: 'Mango Milkshake', price: 40, quantity: 1, isVeg: true }
    ],
    totalPrice: 140,
    orderTime: new Date(Date.now() - 1000 * 60 * 12), // 12 minutes ago
    status: 'In Progress'
  }
];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const addOrder = (orderData: Omit<Order, 'id' | 'orderTime'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${String(orders.length + 1).padStart(3, '0')}`,
      orderTime: new Date()
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  const value: OrderContextType = {
    orders,
    addOrder,
    updateOrderStatus,
    getOrdersByStatus
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};