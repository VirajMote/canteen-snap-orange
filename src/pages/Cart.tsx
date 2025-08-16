import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { useCart } from '@/context/CartContext';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart first",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order placed!",
      description: "Your order has been placed successfully"
    });
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-primary text-primary-foreground p-4">
          <h1 className="text-xl font-bold">Cart</h1>
        </div>
        
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground">Add some delicious items to get started!</p>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Cart</h1>
      </div>

      <div className="p-4 space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-primary font-semibold">₹{item.price}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-medium min-w-[30px] text-center">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 rounded-full p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="mt-2 text-right">
                <span className="font-semibold">Subtotal: ₹{item.price * item.quantity}</span>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total Amount:</span>
                <span className="text-primary">₹{getCartTotal()}</span>
              </div>
            </div>
            
            <Button onClick={handleCheckout} className="w-full mt-4">
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Cart;