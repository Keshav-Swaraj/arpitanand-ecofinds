import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsAPI } from "../api.js";
import { useCart } from "../contexts/CartContext";
import MobileMenu from "../components/MobileMenu";

export default function Home() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [addedItems, setAddedItems] = useState(new Set());
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [sortBy, setSortBy] = useState('latest');
  const [filterBy, setFilterBy] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🏠' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'furniture', name: 'Furniture', icon: '🪑' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'clothing', name: 'Clothing', icon: '👕' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'home', name: 'Home & Garden', icon: '🏡' },
    { id: 'other', name: 'Other', icon: '📦' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error fetching products:', err);
      if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        setError('Backend server is not running. Please start the backend server on port 5000.');
      } else {
        setError('Failed to fetch products');
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = Array.isArray(products) ? products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterBy === 'all' || product.category.toLowerCase() === filterBy.toLowerCase();
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'latest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    }) : [];

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedItems(prev => new Set([...prev, product._id]));
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product._id);
        return newSet;
      });
    }, 2000);
  };

  if (loading) {
    return (
      <div className="px-6 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b md:hidden">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-600"
          >
            ☰
          </button>
          <h1 className="text-xl font-bold text-green-600">EcoFinds</h1>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">👤</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-4 bg-white">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Search ...." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
          />
        </div>
        
        {/* Sort & Filter (Groupby removed) */}
        <div className="flex space-x-2 mb-4">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="latest">Sort: Latest</option>
            <option value="price-low">Sort: Price Low</option>
            <option value="price-high">Sort: Price High</option>
            <option value="name">Sort: Name</option>
          </select>
          
          <select 
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">Filter: All</option>
            {categories.slice(1).map(category => (
              <option key={category.id} value={category.id}>
                Filter: {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Banner Image */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Welcome to EcoFinds</h2>
          <p className="text-green-100">Discover amazing second-hand items at great prices!</p>
        </div>
      </div>

      {/* Categories Section */}
      <div className="p-4">
        <div className="mb-4">
          <button className="w-full p-3 bg-white border border-gray-300 rounded-lg text-left font-medium">
            All Categories
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {categories.slice(1, 4).map((category) => (
            <button
              key={category.id}
              onClick={() => setFilterBy(category.id)}
              className={`p-4 bg-white border rounded-lg text-center ${
                filterBy === category.id ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <div className="text-xs font-medium">{category.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-4">Latest Listings</h2>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="text-lg">Loading products...</div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <Link to={`/product/${product._id}`}>
                  <img 
                    src={product.image || "https://via.placeholder.com/300x200"} 
                    alt={product.title} 
                    className="w-full h-48 object-cover rounded-t-lg" 
                  />
                </Link>
                <div className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.title}</h3>
                  <p className="text-green-600 font-bold text-sm">₹{product.price}</p>
                  <p className="text-xs text-gray-600 mb-2">{product.category}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full py-1 px-2 rounded text-xs font-medium ${
                      addedItems.has(product._id)
                        ? 'bg-green-500 text-white'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {addedItems.has(product._id) ? 'Added!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-20"></div>
      <MobileMenu isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </div>
  );
}
