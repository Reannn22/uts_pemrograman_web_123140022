import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { state } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            ShopApp
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <Link to="/products" className="hover:text-primary-600">Products</Link>
            <Link to="/cart" className="flex items-center">
              <span className="relative">
                Cart
                {state.totalItems > 0 && (
                  <span className="absolute -top-2 -right-4 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {state.totalItems}
                  </span>
                )}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
