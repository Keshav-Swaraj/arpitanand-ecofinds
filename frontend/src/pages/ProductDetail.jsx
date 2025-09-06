import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsAPI } from "../api.js";
import { useCart } from "../contexts/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      setProduct(response.data);
    } catch (err) {
      setError('Product not found');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="px-6 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading product...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="px-6 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Product not found'}
        </div>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="mb-4 md:mb-6 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Back to Home
        </button>
        
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="order-2 lg:order-1">
              <img 
                src={product.image || "https://via.placeholder.com/400"} 
                alt={product.title} 
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-sm" 
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{product.title}</h2>
              <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
              <p className="text-green-600 font-bold text-2xl md:text-3xl mb-6">₹{product.price}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">{product.description}</p>
                </div>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className={`w-full px-6 py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base transition-colors ${
                  addedToCart 
                    ? 'bg-green-500 text-white' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}