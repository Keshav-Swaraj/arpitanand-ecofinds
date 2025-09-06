import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider, useCart } from "./contexts/CartContext";
import Cart from "./components/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";

function AppContent() {
  const { user, logout, loading } = useAuth();
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Desktop Navigation */}
      <nav className="hidden md:flex justify-between items-center bg-green-600 text-white px-6 py-4 shadow-md">
        <Link to="/" className="text-2xl font-bold">EcoFinds</Link>
        <div className="space-x-4 flex items-center">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-white hover:bg-green-700 rounded-lg"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.username}</span>
              <Link to="/profile">Profile</Link>
              <Link to="/add">Sell</Link>
              <button onClick={logout} className="hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Cart Button - Fixed Position */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-4 right-4 md:hidden bg-green-600 text-white p-3 rounded-full shadow-lg z-40"
      >
        🛒
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}