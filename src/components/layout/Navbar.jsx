import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            ShopApp
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <NavLinks totalItems={totalItems} />
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            <MenuIcon />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <NavLinks totalItems={totalItems} />
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLinks({ totalItems }) {
  return (
    <>
      <Link to="/" className="hover:text-primary-600">Home</Link>
      <Link to="/products" className="hover:text-primary-600">Products</Link>
      <Link to="/cart" className="flex items-center">
        Cart
        {totalItems > 0 && (
          <span className="ml-1 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        )}
      </Link>
    </>
  );
}

NavLinks.propTypes = {
  totalItems: PropTypes.number.isRequired
};

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}
