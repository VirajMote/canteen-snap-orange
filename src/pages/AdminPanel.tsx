import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Clock, CheckCircle, AlertCircle, Utensils, Bell, RefreshCw } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  totalPrice: number;
  orderTime: Date;
  status: 'Pending' | 'In Progress' | 'Completed';
}

// Mock orders data with more realistic timestamps
const generateMockOrders = (): Order[] => {
  const now = new Date();
  return [
    {
      id: 'ORD001',
      customerId: '12345',
      customerName: 'Sushil Ashok Pote',
      items: [
        { id: '28', name: 'Coffee', price: 15, quantity: 2, isVeg: true },
        { id: '24', name: 'Vada Pav', price: 15, quantity: 1, isVeg: true }
      ],
      totalPrice: 45,
      orderTime: new Date(now.getTime() - 1000 * 60 * 15), // 15 minutes ago
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
      orderTime: new Date(now.getTime() - 1000 * 60 * 8), // 8 minutes ago
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
      orderTime: new Date(now.getTime() - 1000 * 60 * 45), // 45 minutes ago
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
      orderTime: new Date(now.getTime() - 1000 * 60 * 5), // 5 minutes ago
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
      orderTime: new Date(now.getTime() - 1000 * 60 * 12), // 12 minutes ago
      status: 'In Progress'
    },
    {
      id: 'ORD006',
      customerId: '44444',
      customerName: 'Vikram Singh',
      items: [
        { id: '12', name: 'Veg Sandwich', price: 40, quantity: 1, isVeg: true },
        { id: '28', name: 'Coffee', price: 15, quantity: 1, isVeg: true }
      ],
      totalPrice: 55,
      orderTime: new Date(now.getTime() - 1000 * 60 * 3), // 3 minutes ago
      status: 'Pending'
    },
    {
      id: 'ORD007',
      customerId: '55555',
      customerName: 'Anita Gupta',
      items: [
        { id: '20', name: 'Plain Dosa', price: 40, quantity: 2, isVeg: true },
        { id: '19', name: 'Medu Vada', price: 30, quantity: 1, isVeg: true }
      ],
      totalPrice: 110,
      orderTime: new Date(now.getTime() - 1000 * 60 * 20), // 20 minutes ago
      status: 'Completed'
    }
  ];
};

const AdminPanel: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(generateMockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [newOrderCount, setNewOrderCount] = useState(0);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new orders occasionally
      if (Math.random() > 0.9) {
        const newOrder: Order = {
          id: `ORD${String(orders.length + 1).padStart(3, '0')}`,
          customerId: '99999',
          customerName: 'New Customer',
          items: [
            { id: '27', name: 'Tea', price: 10, quantity: 1, isVeg: true }
          ],
          totalPrice: 10,
          orderTime: new Date(),
          status: 'Pending'
        };
        setOrders(prev => [newOrder, ...prev]);
        setNewOrderCount(prev => prev + 1);
      }
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [orders.length]);

  const filteredOrders = orders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingOrders = filteredOrders.filter(order => order.status === 'Pending');
  const inProgressOrders = filteredOrders.filter(order => order.status === 'In Progress');
  const completedOrders = filteredOrders.filter(order => order.status === 'Completed');

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'In Progress':
        return <Clock className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'destructive';
      case 'In Progress':
        return 'default';
      case 'Completed':
        return 'secondary';
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN');
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const refreshOrders = () => {
    setLastUpdate(new Date());
    setNewOrderCount(0);
  };

  const OrderTable = ({ orders: orderList, showActions = true }: { orders: Order[], showActions?: boolean }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            {showActions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showActions ? 7 : 6} className="text-center py-8 text-muted-foreground">
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orderList.map((order) => (
              <TableRow key={order.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell className="font-medium">{order.customerName}</TableCell>
                <TableCell>
                  <div className="space-y-1 max-w-xs">
                    {order.items.map((item) => (
                      <div key={item.id} className="text-sm flex justify-between">
                        <span>{item.name}</span>
                        <span className="text-muted-foreground">×{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">₹{order.totalPrice}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-medium">{formatTime(order.orderTime)}</div>
                    <div className="text-muted-foreground">{getTimeAgo(order.orderTime)}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1 w-fit">
                    {getStatusIcon(order.status)}
                    {order.status}
                  </Badge>
                </TableCell>
                {showActions && (
                  <TableCell>
                    <div className="flex gap-2">
                      {order.status === 'Pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(order.id, 'In Progress')}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Start
                        </Button>
                      )}
                      {order.status === 'In Progress' && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleStatusUpdate(order.id, 'Completed')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Complete
                        </Button>
                      )}
                      {order.status === 'Completed' && (
                        <span className="text-sm text-green-600 font-medium">✓ Done</span>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Utensils className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">COE Canteen Admin</h1>
                <p className="text-sm text-gray-500">Order Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Last updated: {formatTime(lastUpdate)}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={refreshOrders}
                  className="h-8 w-8 p-0"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              {newOrderCount > 0 && (
                <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Bell className="h-4 w-4" />
                  {newOrderCount} new order{newOrderCount > 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{orders.length}</div>
              <p className="text-sm text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{pendingOrders.length}</div>
              <p className="text-sm text-gray-500 mt-1">Needs attention</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{inProgressOrders.length}</div>
              <p className="text-sm text-gray-500 mt-1">Being prepared</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{completedOrders.length}</div>
              <p className="text-sm text-gray-500 mt-1">Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6 bg-white">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Orders Tabs */}
        <Card className="bg-white">
          <CardContent className="pt-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                  All Orders ({filteredOrders.length})
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                  Pending ({pendingOrders.length})
                </TabsTrigger>
                <TabsTrigger value="progress" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                  In Progress ({inProgressOrders.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  Completed ({completedOrders.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <OrderTable orders={filteredOrders} />
              </TabsContent>
              
              <TabsContent value="pending" className="mt-4">
                <OrderTable orders={pendingOrders} />
              </TabsContent>
              
              <TabsContent value="progress" className="mt-4">
                <OrderTable orders={inProgressOrders} />
              </TabsContent>
              
              <TabsContent value="completed" className="mt-4">
                <OrderTable orders={completedOrders} showActions={false} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPanel;