import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  GiChickenLeg, 
  GiWheat, 
  GiFire, 
  GiPlantSeed,
  GiPlantRoots
} from 'react-icons/gi';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number; // stored as paise (1/100 of a rupee)
  image: string;
  category: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
}

// Tooltip component for dietary preferences
const DietaryTooltip = ({ 
  isVegetarian, 
  isVegan, 
  isGlutenFree, 
  isSpicy 
}: { 
  isVegetarian: boolean, 
  isVegan: boolean, 
  isGlutenFree: boolean, 
  isSpicy: boolean 
}) => {
  return (
    <div className="flex gap-1 flex-wrap mt-2 mb-3">
      {isVegetarian && (
        <Badge variant="outline" className="bg-green-50 border-green-300 text-green-700 flex items-center gap-1">
          <GiPlantSeed className="text-green-600" /> Vegetarian
        </Badge>
      )}
      {isVegan && (
        <Badge variant="outline" className="bg-green-50 border-green-500 text-green-800 flex items-center gap-1">
          <GiPlantRoots className="text-green-700" /> Vegan
        </Badge>
      )}
      {!isVegetarian && !isVegan && (
        <Badge variant="outline" className="bg-red-50 border-red-300 text-red-700 flex items-center gap-1">
          <GiChickenLeg className="text-red-600" /> Non-Veg
        </Badge>
      )}
      {isGlutenFree && (
        <Badge variant="outline" className="bg-amber-50 border-amber-300 text-amber-700 flex items-center gap-1">
          <GiWheat className="text-amber-600" /> Gluten-Free
        </Badge>
      )}
      {isSpicy && (
        <Badge variant="outline" className="bg-red-50 border-red-300 text-red-700 flex items-center gap-1">
          <GiFire className="text-red-600" /> Spicy
        </Badge>
      )}
    </div>
  );
};

const CATEGORIES = ["All", "Starters", "Main Course", "Desserts", "Beverages"];

const DIETARY_FILTERS = [
  { id: 'vegetarian', label: 'Vegetarian', icon: <GiPlantSeed className="text-green-600" /> },
  { id: 'vegan', label: 'Vegan', icon: <GiPlantRoots className="text-green-700" /> },
  { id: 'gluten-free', label: 'Gluten Free', icon: <GiWheat className="text-amber-600" /> },
  { id: 'spicy', label: 'Spicy', icon: <GiFire className="text-red-600" /> },
  { id: 'non-veg', label: 'Non-Veg', icon: <GiChickenLeg className="text-red-600" /> },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<string[]>([]);
  
  const { data: menuItems = [], isLoading, error } = useQuery({
    queryKey: ['/api/menu']
  });
  
  // Sample menu items to use if API fails when running locally
  const sampleMenuItems: MenuItem[] = [
    {
      id: 1,
      name: "Butter Chicken",
      description: "Tender chicken pieces simmered in a rich, creamy tomato sauce with aromatic spices.",
      price: 35000, // 350 rupees
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
      category: "Main Course",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      isSpicy: true
    },
    {
      id: 2,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese cubes marinated in spices and yogurt, cooked in a tandoor.",
      price: 25000, // 250 rupees
      image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
      category: "Starters",
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: true,
      isSpicy: false
    },
    {
      id: 3,
      name: "Chicken Biryani",
      description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices.",
      price: 32000, // 320 rupees
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
      category: "Main Course",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isSpicy: true
    },
    {
      id: 4,
      name: "Malai Kofta",
      description: "Soft potato and paneer dumplings in a rich, creamy gravy.",
      price: 28000, // 280 rupees
      image: "https://images.unsplash.com/photo-1645112411341-6c4fd023882d",
      category: "Main Course",
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isSpicy: false
    },
    {
      id: 5,
      name: "Masala Dosa",
      description: "Crispy rice crepe filled with spiced potato filling, served with sambar and chutney.",
      price: 20000, // 200 rupees
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
      category: "Breakfast",
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
      isSpicy: true
    },
    {
      id: 6,
      name: "Gulab Jamun",
      description: "Deep-fried milk solids soaked in sugar syrup, garnished with pistachios.",
      price: 15000, // 150 rupees
      image: "https://images.unsplash.com/photo-1615832494873-b3d538c5427c",
      category: "Desserts",
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      isSpicy: false
    }
  ];
  
  const toggleDietaryFilter = (filterId: string) => {
    setActiveDietaryFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
  };
  
  const filteredItems: MenuItem[] = menuItems && Array.isArray(menuItems) ? 
    menuItems
      // Filter by category
      .filter((item: MenuItem) => 
        activeCategory === "All" || item.category === activeCategory
      )
      // Filter by dietary preferences
      .filter((item: MenuItem) => {
        if (activeDietaryFilters.length === 0) return true;
        
        return activeDietaryFilters.every(filter => {
          switch (filter) {
            case 'vegetarian':
              return item.isVegetarian;
            case 'vegan':
              return item.isVegan;
            case 'gluten-free':
              return item.isGlutenFree;
            case 'spicy':
              return item.isSpicy;
            case 'non-veg':
              return !item.isVegetarian && !item.isVegan;
            default:
              return true;
          }
        });
      }) : 
    [];
  
  const formatPrice = (price: number) => {
    return `₹${(price / 100).toFixed(0)}`;
  };
  
  return (
    <section className="py-16 bg-amber-50" id="menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">Our Menu</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">Explore our carefully crafted dishes made with authentic Indian spices</p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center mb-6 space-x-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full mb-2 transition duration-300 ${
                activeCategory === category 
                  ? 'bg-amber-500 text-white' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Dietary Preference Filters */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          <div className="w-full text-center mb-2">
            <p className="text-gray-600 font-medium">Dietary Preferences</p>
          </div>
          {DIETARY_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => toggleDietaryFilter(filter.id)}
              className={`px-4 py-2 rounded-full mb-2 transition duration-300 flex items-center gap-1 ${
                activeDietaryFilters.includes(filter.id) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {filter.icon} {filter.label}
            </button>
          ))}
        </div>
        
        {/* Results counter */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
          </p>
        </div>
        
        {/* Menu Items Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                  <Skeleton className="h-8 w-32 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          // If error occurs, display sample menu items
          <div>
            <div className="text-center mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg inline-block">
              <p>Using sample menu items. Database connection not available.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sampleMenuItems
                .filter(item => activeCategory === "All" || item.category === activeCategory)
                .filter(item => {
                  if (activeDietaryFilters.length === 0) return true;
                  
                  return activeDietaryFilters.every(filter => {
                    switch (filter) {
                      case 'vegetarian': return item.isVegetarian;
                      case 'vegan': return item.isVegan;
                      case 'gluten-free': return item.isGlutenFree;
                      case 'spicy': return item.isSpicy;
                      case 'non-veg': return !item.isVegetarian && !item.isVegan;
                      default: return true;
                    }
                  });
                })
                .map((item) => (
                <div key={item.id} className="menu-item bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-playfair font-bold text-gray-800">{item.name}</h3>
                      <span className="text-red-700 font-medium">{formatPrice(item.price)}</span>
                    </div>
                    
                    {/* Dietary Preferences */}
                    <DietaryTooltip 
                      isVegetarian={item.isVegetarian}
                      isVegan={item.isVegan}
                      isGlutenFree={item.isGlutenFree}
                      isSpicy={item.isSpicy}
                    />
                    
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <button className="text-amber-500 hover:text-amber-700 font-medium flex items-center transition duration-300">
                      Add to order <i className="ri-arrow-right-line ml-1"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No items match your filters</h3>
            <p className="text-gray-500">Try changing your filter selection</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item: MenuItem) => (
              <div key={item.id} className="menu-item bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-playfair font-bold text-gray-800">{item.name}</h3>
                    <span className="text-red-700 font-medium">{formatPrice(item.price)}</span>
                  </div>
                  
                  {/* Dietary Preferences */}
                  <DietaryTooltip 
                    isVegetarian={item.isVegetarian}
                    isVegan={item.isVegan}
                    isGlutenFree={item.isGlutenFree}
                    isSpicy={item.isSpicy}
                  />
                  
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <button className="text-amber-500 hover:text-amber-700 font-medium flex items-center transition duration-300">
                    Add to order <i className="ri-arrow-right-line ml-1"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <a href="#" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300">
            View Full Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default Menu;