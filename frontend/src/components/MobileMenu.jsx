import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function MobileMenu({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="bg-white w-64 h-full shadow-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-green-600">EcoFinds</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <nav className="space-y-4">
            <Link 
              to="/" 
              onClick={onClose}
              className="block py-2 text-gray-700 hover:text-green-600"
            >
              🏠 Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  onClick={onClose}
                  className="block py-2 text-gray-700 hover:text-green-600"
                >
                  👤 Profile
                </Link>
                <Link 
                  to="/add" 
                  onClick={onClose}
                  className="block py-2 text-gray-700 hover:text-green-600"
                >
                  ➕ Sell Product
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="block py-2 text-gray-700 hover:text-green-600 w-full text-left"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={onClose}
                  className="block py-2 text-gray-700 hover:text-green-600"
                >
                  🔑 Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={onClose}
                  className="block py-2 text-gray-700 hover:text-green-600"
                >
                  📝 Signup
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
