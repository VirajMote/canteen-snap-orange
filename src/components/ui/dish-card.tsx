import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import { useCart } from '@/context/CartContext';

interface DishCardProps {
  item: MenuItem;
}

export const DishCard: React.FC<DishCardProps> = ({ item }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [imageError, setImageError] = useState(false);
  
  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateQuantity(item.id, quantity - 1);
    }
  };

  return (
    <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="relative mb-3">
          <img
            src={imageError ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop' : item.image}
            alt={item.name}
            className="w-full h-32 object-cover rounded-md"
            onError={() => setImageError(true)}
          />
          <div className="absolute top-2 left-2">
            <div className={`w-3 h-3 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-card-foreground">{item.name}</h3>
          <p className="text-primary font-semibold">₹{item.price}</p>
          
          <div className="flex items-center justify-between">
            {quantity > 0 ? (
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDecrement}
                  className="w-8 h-8 rounded-full p-0"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-medium min-w-[20px] text-center">{quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-full p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <div className="w-20" />
            )}
            
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};