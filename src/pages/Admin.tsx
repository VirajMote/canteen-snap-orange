import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context/AuthContext';
import { Search, Clock, CheckCircle, AlertCircle, Utensils } from 'lucide-react';
import { Order } from '@/types/order';

const Admin: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { logout, student } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

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
    updateOrderStatus(orderId, newStatus);
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

  const OrderTable = ({ orders: orderList, showActions = true }: { orders: Order[], showActions?: boolean }) => (
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
        {orderList.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>
              <div className="space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="text-sm">
                    {item.name} × {item.quantity}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>₹{order.totalPrice}</TableCell>
            <TableCell>
              <div className="text-sm">
                <div>{formatTime(order.orderTime)}</div>
                <div className="text-muted-foreground">{formatDate(order.orderTime)}</div>
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
                    >
                      Start
                    </Button>
                  )}
                  {order.status === 'In Progress' && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleStatusUpdate(order.id, 'Completed')}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Utensils className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Canteen Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Welcome, {student?.name}</span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{pendingOrders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{inProgressOrders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary-foreground">{completedOrders.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Orders Tabs */}
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Orders ({filteredOrders.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
                <TabsTrigger value="progress">In Progress ({inProgressOrders.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
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

export default Admin;