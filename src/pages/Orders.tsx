import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { Clock, CheckCircle, Truck } from 'lucide-react';

const Orders: React.FC = () => {
  // Mock order data
  const orders = [
    {
      id: 'ORD001',
      items: ['Masala Tea', 'Vada Pav'],
      total: 27,
      status: 'preparing',
      timestamp: '10:30 AM',
      estimatedTime: '5 mins'
    },
    {
      id: 'ORD002', 
      items: ['Idli', 'Coffee'],
      total: 40,
      status: 'ready',
      timestamp: '9:45 AM',
      estimatedTime: 'Ready'
    },
    {
      id: 'ORD003',
      items: ['Cheese Sandwich', 'Mango Juice'],
      total: 75,
      status: 'completed',
      timestamp: 'Yesterday',
      estimatedTime: 'Completed'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'preparing':
        return <Clock className="h-4 w-4" />;
      case 'ready':
        return <Truck className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-500';
      case 'ready':
        return 'bg-green-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Pickup';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Orders</h1>
      </div>

      <div className="p-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-bold text-foreground mb-2">No orders yet</h2>
            <p className="text-muted-foreground">Your order history will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(order.status)} text-white`}
                    >
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span>{getStatusText(order.status)}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Items:</h4>
                    <p className="text-muted-foreground">{order.items.join(', ')}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-muted-foreground">Total: </span>
                      <span className="font-semibold text-primary">₹{order.total}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{order.timestamp}</div>
                      <div className="text-sm font-medium">{order.estimatedTime}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Orders;