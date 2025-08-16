import React, { useState } from 'react';
import { SearchBar } from '@/components/ui/search-bar';
import { DishCard } from '@/components/ui/dish-card';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { useAuth } from '@/context/AuthContext';
import { popularItems, menuItems } from '@/data/menuData';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { student, logout } = useAuth();

  const filteredItems = searchQuery
    ? menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularItems;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span className="font-medium">Hello, {student?.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search dishes..."
            />
          </div>
        </div>
        
        {searchQuery && (
          <p className="text-sm mt-2 text-primary-foreground/80">
            what would you like to eat today?
          </p>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-foreground mb-4">
          {searchQuery ? 'Search Results' : 'Popular dishes of all time'}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <DishCard key={item.id} item={item} />
          ))}
        </div>
        
        {searchQuery && filteredItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No dishes found matching your search.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;