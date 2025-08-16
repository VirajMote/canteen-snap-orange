import React, { useState } from 'react';
import { SearchBar } from '@/components/ui/search-bar';
import { DishCard } from '@/components/ui/dish-card';
import { BottomNavigation } from '@/components/ui/bottom-navigation';
import { Card, CardContent } from '@/components/ui/card';
import { menuCategories, menuItems } from '@/data/menuData';

const Menu: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredItems = searchQuery
    ? menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory)
    : [];

  const popularSections = [
    {
      title: 'Popular in Veg',
      items: menuItems.filter(item => 
        item.isVeg && ['Vada Pav', 'Idli', 'Aloo Paratha', 'Veg Sandwich'].includes(item.name)
      )
    },
    {
      title: 'Popular in Breakfast', 
      items: menuItems.filter(item =>
        ['Tea', 'Coffee', 'Idli', 'Aloo Paratha'].includes(item.name)
      )
    },
    {
      title: 'Popular in South Indian',
      items: menuItems.filter(item =>
        item.category === 'South Indian'
      ).slice(0, 4)
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold mb-4">Menu</h1>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search dishes..."
        />
      </div>

      <div className="p-4">
        {/* Search Results */}
        {searchQuery && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Search Results</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <DishCard key={item.id} item={item} />
              ))}
            </div>
            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No dishes found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {/* Category View */}
        {selectedCategory && !searchQuery && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">{selectedCategory}</h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-primary hover:underline"
              >
                Back to categories
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <DishCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Categories and Popular Sections */}
        {!selectedCategory && !searchQuery && (
          <div className="space-y-8">
            {/* Categories */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {menuCategories.map((category) => (
                  <Card 
                    key={category.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <CardContent className="p-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <div className="p-3">
                        <h3 className="font-medium text-center">{category.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Popular Sections */}
            {popularSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-foreground mb-4">{section.title}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {section.items.map((item) => (
                    <DishCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Menu;