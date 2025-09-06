import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { productsAPI, ordersAPI } from '../api.js';

export default function Profile() {
  const { user } = useAuth();
  const [userProducts, setUserProducts] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Fetch user's products and orders
      const [productsResponse, ordersResponse] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getByUser()
      ]);
      
      // Filter products by current user (this would be better handled by backend)
      const myProducts = productsResponse.data.filter(product => 
        product.ownerId === user._id
      );
      
      setUserProducts(myProducts);
      setUserOrders(ordersResponse.data || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4">My Profile</h2>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-xl md:text-2xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg md:text-xl">{user.username}</h3>
              <p className="text-gray-600 text-sm md:text-base">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 md:px-6 py-3 font-semibold whitespace-nowrap text-sm md:text-base ${
                activeTab === 'products'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Products ({userProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 md:px-6 py-3 font-semibold whitespace-nowrap text-sm md:text-base ${
                activeTab === 'orders'
                  ? 'border-b-2 border-green-600 text-green-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Orders ({userOrders.length})
            </button>
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 'products' ? (
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4">My Products</h3>
                {userProducts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">You haven't listed any products yet.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userProducts.map((product) => (
                      <div key={product._id} className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
                        <img
                          src={product.image || "https://via.placeholder.com/150"}
                          alt={product.title}
                          className="w-full h-32 md:h-40 object-cover rounded mb-2"
                        />
                        <h4 className="font-semibold text-sm md:text-base line-clamp-2">{product.title}</h4>
                        <p className="text-green-600 font-bold text-sm md:text-base">₹{product.price}</p>
                        <p className="text-xs md:text-sm text-gray-600">{product.category}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-4">My Orders</h3>
                {userOrders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">You haven't placed any orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div key={order._id} className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 space-y-1 sm:space-y-0">
                          <span className="font-semibold text-sm md:text-base">Order #{order._id.slice(-6)}</span>
                          <span className="text-xs md:text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-xs md:text-sm">
                              <span className="line-clamp-1">{item.productId?.title || 'Product'}</span>
                              <span>Qty: {item.quantity} × ₹{item.price}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-semibold text-sm md:text-base">
                            <span>Total:</span>
                            <span>₹{order.items.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}