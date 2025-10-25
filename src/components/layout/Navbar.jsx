import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Logo() {
  return (
    <svg className="w-8 h-8 text-primary-600" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 21V11h8v10h-8zM3 13V3h8v10H3zm6-2V5H5v6h4zM3 21v-6h8v6H3zm2-2h4v-2H5v2zm10 0h4v-6h-4v6zM13 3h8v6h-8V3zm2 2v2h4V5h-4z"/>
    </svg>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full h-16 top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/70 backdrop-blur-md backdrop-saturate-150 shadow-lg' 
        : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-600">
            <Logo />
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
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      setUnderlineStyle({
        width: activeItem.offsetWidth,
        left: activeItem.offsetLeft
      });
    }
  }, [activeIndex]);

  const handleHover = (index) => {
    const item = itemRefs.current[index];
    setUnderlineStyle({
      width: item.offsetWidth,
      left: item.offsetLeft
    });
  };

  const handleLeave = () => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      setUnderlineStyle({
        width: activeItem.offsetWidth,
        left: activeItem.offsetLeft
      });
    }
  };

  return (
    <div className="relative flex items-center gap-6">
      <div 
        className="absolute bottom-0 h-0.5 bg-primary-600 transition-all duration-300 ease-in-out"
        style={{
          width: `${underlineStyle.width}px`,
          left: `${underlineStyle.left}px`,
        }}
      />
      <NavLink 
        ref={el => itemRefs.current[0] = el}
        onMouseEnter={() => handleHover(0)}
        onMouseLeave={handleLeave}
        to="/" 
        className="hover:text-primary-600 pb-1"
        onClick={() => setActiveIndex(0)}
      >
        Home
      </NavLink>
      <NavLink 
        ref={el => itemRefs.current[1] = el}
        onMouseEnter={() => handleHover(1)}
        onMouseLeave={handleLeave}
        to="/products" 
        className="hover:text-primary-600 pb-1"
        onClick={() => setActiveIndex(1)}
      >
        Products
      </NavLink>
      <NavLink 
        ref={el => itemRefs.current[2] = el}
        onMouseEnter={() => handleHover(2)}
        onMouseLeave={handleLeave}
        to="/cart" 
        className="flex items-center hover:text-primary-600 pb-1"
        onClick={() => setActiveIndex(2)}
      >
        Cart
        {totalItems > 0 && (
          <span className="ml-1 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        )}
      </NavLink>
    </div>
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
