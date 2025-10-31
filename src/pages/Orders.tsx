import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { Clock, CheckCircle, Truck } from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import { format } from 'date-fns';

const Orders: React.FC = () => {
  const { orders } = useOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'In Progress':
        return <Truck className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Completed':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
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
                        <span>{order.status}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-1">Items:</h4>
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <p key={item.id} className="text-muted-foreground">
                          {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t pt-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Total: </span>
                      <span className="font-semibold text-primary">₹{order.totalPrice}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        {format(order.orderTime, 'MMM dd, yyyy')}
                      </div>
                      <div className="text-sm font-medium">
                        {format(order.orderTime, 'hh:mm a')}
                      </div>
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