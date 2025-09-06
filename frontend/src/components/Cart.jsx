import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ordersAPI } from '../api.js';

export default function Cart({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    if (!user) {
      setMessage('Please login to checkout');
      return;
    }

    if (cartItems.length === 0) {
      setMessage('Your cart is empty');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await ordersAPI.create(orderData);
      setMessage('Order placed successfully!');
      clearCart();
      
      // Close cart after 2 seconds
      setTimeout(() => {
        onClose();
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Checkout error:', error);
      setMessage('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-sm sm:max-w-md h-full overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl md:text-2xl"
            >
              ×
            </button>
          </div>

          {message && (
            <div className={`mb-4 p-3 rounded ${
              message.includes('success') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm md:text-base">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 border rounded-lg">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.title}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm md:text-base line-clamp-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base">₹{item.price}</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm md:text-base"
                        >
                          -
                        </button>
                        <span className="w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm md:text-base"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 text-xs md:text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base md:text-lg font-semibold">Total:</span>
                  <span className="text-base md:text-lg font-bold">₹{getTotalPrice().toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={loading || !user}
                  className="w-full bg-green-600 text-white py-2 md:py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm md:text-base font-semibold transition-colors"
                >
                  {loading ? 'Processing...' : user ? 'Checkout' : 'Login to Checkout'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
