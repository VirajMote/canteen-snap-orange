import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Menu, ShoppingCart, ClipboardList } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/menu', icon: Menu, label: 'Menu' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
    { path: '/orders', icon: ClipboardList, label: 'Orders' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground shadow-lg">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center p-2 min-w-0 relative ${
                isActive ? 'text-primary-foreground' : 'text-primary-foreground/70'
              }`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};