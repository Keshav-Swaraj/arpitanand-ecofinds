import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <nav className="flex justify-between items-center bg-green-600 text-white px-6 py-4 shadow-md">
          <Link to="/" className="text-2xl font-bold">EcoFinds</Link>
          <div className="space-x-4">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/add">Sell</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}