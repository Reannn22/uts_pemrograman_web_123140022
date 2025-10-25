import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { translations } from '../../utils/translations';
import { useTheme } from '../../context/ThemeContext';
import logoImage from '../../assets/logo/ShoPPie.png';
import heartIcon from '../../assets/icon/heart.svg';
import languagesIcon from '../../assets/icon/languages.svg';
import moonIcon from '../../assets/icon/moon.svg';
import sunIcon from '../../assets/icon/sun.svg';
import searchIcon from '../../assets/icon/search.svg';
import cartIcon from '../../assets/icon/shopping-cart.svg';

function Logo({ isDark }) {
  return (
    <div className="flex items-center gap-2">
      <img src={logoImage} alt="ShoPPie Logo" className="w-8 h-8 object-contain" />
      <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <span className="text-blue-600">ShoP</span>
        <span className="text-orange-500">Pie</span>
      </span>
    </div>
  );
}

Logo.propTypes = {
  isDark: PropTypes.bool.isRequired
};

// Update icon components with proper dark mode colors
function ThemeIcon({ isDark }) {
  return (
    <img 
      src={isDark ? sunIcon : moonIcon} 
      alt="Theme Toggle" 
      className={`w-5 h-5 ${isDark ? 'invert brightness-100' : ''}`}
    />
  );
}

function LanguageIcon({ isDark }) {
  return (
    <img 
      src={languagesIcon} 
      alt="Language" 
      className={`w-5 h-5 ${isDark ? 'invert brightness-100' : ''}`}
    />
  );
}

function SearchIcon({ isDark }) {
  return (
    <img 
      src={searchIcon} 
      alt="Search" 
      className={`w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity ${isDark ? 'invert brightness-100' : ''}`}
    />
  );
}

function HeartIcon({ isDark, count = 0 }) {
  return (
    <div className="relative">
      <img 
        src={heartIcon} 
        alt="Wishlist" 
        className={`w-5 h-5 ${isDark ? 'invert brightness-100' : ''}`}
      />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}

function CartIcon({ isDark, count = 0 }) {
  return (
    <div className="relative">
      <img 
        src={cartIcon} 
        alt="Cart" 
        className={`w-5 h-5 ${isDark ? 'invert brightness-100' : ''}`}
      />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
}

export default function Navbar() {
  const { isDark, setIsDark } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'id');
  const { totalItems } = useCart();
  const { state: wishlistState } = useWishlist();
  const { state: cartState } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update handlers to include URL state
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('lang', newLang);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleThemeChange = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('theme', newTheme ? 'dark' : 'light');
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlLang = searchParams.get('lang');
    const urlTheme = searchParams.get('theme');
    
    if (urlLang && ['id', 'en'].includes(urlLang)) {
      setLang(urlLang);
      localStorage.setItem('lang', urlLang);
    }
    
    if (urlTheme && ['dark', 'light'].includes(urlTheme)) {
      setIsDark(urlTheme === 'dark');
    }
  }, [location.search, setIsDark]); // Added setIsDark to dependency array

  // Fix translation access
  const navTexts = translations[lang]?.navigation || {};
  const navigationItems = useMemo(() => [
    { path: '/', label: navTexts.home || 'Home' },
    { path: '/products', label: navTexts.products || 'Products' },
    { path: '/categories', label: navTexts.categories || 'Categories' },
    { path: '/about', label: navTexts.about || 'About' }
  ], [navTexts]);

  // Get total items
  const totalCartItems = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistItems = wishlistState.items.length;

  return (
    <nav className={`fixed w-full top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? isDark 
          ? 'bg-gray-900/70 backdrop-blur-md backdrop-saturate-150 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' 
          : 'bg-white/70 backdrop-blur-md backdrop-saturate-150 shadow-lg'
        : isDark 
          ? 'bg-gray-900 shadow-[0_1px_3px_0_rgba(0,0,0,0.3)]' 
          : 'bg-white shadow-md'
    }`}>
      <div className="relative container mx-auto px-6">
        {/* Main navbar content */}
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <Logo isDark={isDark} />
            </Link>
          </div>
          
          {/* Center section with navigation and search */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-8">
              <NavLinks totalItems={totalItems} lang={lang} isDark={isDark} />
            </div>
          </div>

          {/* Right section with actions */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handleThemeChange}
                className={`p-2 transition-opacity ${
                  isDark ? 'opacity-70 hover:opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <ThemeIcon isDark={isDark} />
              </button>

              <button
                onClick={() => handleLanguageChange(lang === 'id' ? 'en' : 'id')}
                className={`flex items-center gap-1 text-sm transition-opacity ${
                  isDark ? 'opacity-70 hover:opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <LanguageIcon isDark={isDark} />
                <span className={`uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>{lang}</span>
              </button>
            </div>
            {/* Divider - Updated with consistent color */}
            <div className="h-6 w-px bg-gray-400/30"></div>
            <div className="flex items-center gap-4">
              <Link to="/wishlist" className={`relative transition-opacity ${
                isDark ? 'opacity-70 hover:opacity-100' : 'opacity-70 hover:opacity-100'
              }`}>
                <HeartIcon isDark={isDark} count={totalWishlistItems} />
              </Link>

              <Link to="/cart" className={`relative transition-opacity ${
                isDark ? 'opacity-70 hover:opacity-100' : 'opacity-70 hover:opacity-100'
              }`}>
                <CartIcon isDark={isDark} count={totalCartItems} />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Menu</span>
            <MenuIcon isOpen={isMenuOpen} />
          </button>
        </div>

        {/* Mobile Menu - Remove backdrop effects */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300
            ${isMenuOpen ? 'max-h-[calc(100vh-4rem)]' : 'max-h-0'}
          `}
        >
          <div className="px-4 py-3 space-y-6">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `
                    block py-3 transition-colors duration-300 opacity-70 hover:opacity-100
                    ${isDark 
                      ? isActive ? 'text-white' : 'text-gray-400 hover:text-white' 
                      : isActive ? 'text-black' : 'text-gray-600 hover:text-black'
                    }
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder={navTexts.searchPlaceholder || 'Search products...'}
                className={`w-full pl-10 pr-4 py-2 text-sm rounded-full bg-transparent
                  ${isDark 
                    ? 'text-white placeholder:text-gray-400/70' 
                    : 'text-gray-700 placeholder:text-gray-500/70'
                  } 
                  opacity-70 hover:opacity-100 focus:opacity-100
                  outline-none border-0`}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <SearchIcon isDark={isDark} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MenuIcon({ isOpen }) {
  return (
    <div className="relative w-6 h-6">
      <span className={`absolute h-0.5 w-full bg-gray-600 transform transition-all duration-300 ${
        isOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'
      }`} />
      <span className={`absolute h-0.5 w-full bg-gray-600 top-3 transition-all duration-300 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`} />
      <span className={`absolute h-0.5 w-full bg-gray-600 transform transition-all duration-300 ${
        isOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'
      }`} />
    </div>
  );
}

function NavLinks({ totalItems, wishlistCount = 0, isMobile = false, lang, isDark }) {
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const itemRefs = useRef([]);
  const location = useLocation();

  useEffect(() => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      // Get the text content width instead of full element width
      const textWidth = activeItem.firstChild.getBoundingClientRect().width;
      setUnderlineStyle({
        width: textWidth,
        left: activeItem.offsetLeft + (activeItem.offsetWidth - textWidth) / 2
      });
    }
  }, [activeIndex]);

  const handleHover = (index) => {
    const item = itemRefs.current[index];
    const textWidth = item.firstChild.getBoundingClientRect().width;
    setUnderlineStyle({
      width: textWidth,
      left: item.offsetLeft + (item.offsetWidth - textWidth) / 2
    });
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    const activeItem = itemRefs.current[activeIndex];
    if (activeItem) {
      const textWidth = activeItem.firstChild.getBoundingClientRect().width;
      setUnderlineStyle({
        width: textWidth,
        left: activeItem.offsetLeft + (activeItem.offsetWidth - textWidth) / 2
      });
    }
    setHoveredIndex(null);
  };

  const navTexts = translations[lang]?.navigation || {};
  const navigationItems = useMemo(() => [
    { path: '/', label: navTexts.home || 'Home' },
    { path: '/products', label: navTexts.products || 'Products' },
    { path: '/categories', label: navTexts.categories || 'Categories' },
    { path: '/about', label: navTexts.about || 'About' }
  ], [navTexts]);

  return (
    <div className={`relative ${isMobile ? 'flex flex-col space-y-4 w-full' : 'flex items-center gap-4'}`}>
      {/* Sliding underline */}
      {!isMobile && (
        <div 
          className={`absolute bottom-0 h-0.5 transition-all duration-300 ease-out`}
          style={{
            width: `${underlineStyle.width}px`,
            left: `${underlineStyle.left}px`,
            backgroundColor: isDark 
              ? (hoveredIndex !== null || location.pathname === navigationItems[activeIndex].path)
                ? 'rgb(255, 255, 255)' // white
                : 'rgb(156, 163, 175)' // gray-400
              : (hoveredIndex !== null || location.pathname === navigationItems[activeIndex].path)
                ? 'rgb(97, 97, 97)' // black
                : 'rgb(107, 114, 128)' // gray-500
          }}
        />
      )}

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        {navigationItems.map((item, index) => {
          const isCurrentPath = location.pathname === item.path;
          const isHovered = hoveredIndex === index;
          
          return (
            <NavLink 
              key={item.path}
              ref={el => itemRefs.current[index] = el}
              onMouseEnter={() => !isMobile && handleHover(index)}
              onMouseLeave={() => !isMobile && handleLeave()}
              to={item.path} 
              className={`
                relative py-2 px-1 transition-all duration-300
                ${isDark 
                  ? isCurrentPath || isHovered ? 'text-white' : 'text-gray-400'
                  : isCurrentPath || isHovered ? 'text-black' : 'text-gray-500'
                }
              `}
              onClick={() => setActiveIndex(index)}
            >
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Search Bar - Updated default color */}
      <div className="relative ml-8">
        <div className="relative flex items-center group">
          <input
            type="text"
            placeholder={navTexts.searchPlaceholder || 'Search products...'}
            className={`w-48 pl-10 pr-4 py-2 text-sm rounded-full
              ${isDark 
                ? 'bg-transparent text-gray-200 placeholder:text-gray-100/90 hover:text-white focus:text-white' 
                : 'bg-transparent text-gray-700 placeholder:text-gray-900/90 hover:text-black focus:text-black'
              } 
              opacity-70 hover:opacity-100 focus:opacity-100
              outline-none border-0 transition-colors duration-300`}
          />
          <div className="absolute left-3 text-gray-400 pointer-events-none">
            <SearchIcon isDark={isDark} />
          </div>
        </div>
      </div>
    </div>
  );
}

NavLinks.propTypes = {
  totalItems: PropTypes.number.isRequired,
  wishlistCount: PropTypes.number,
  isMobile: PropTypes.bool,
  lang: PropTypes.oneOf(['id', 'en']).isRequired,
  isDark: PropTypes.bool.isRequired
};

LanguageIcon.propTypes = {
  isDark: PropTypes.bool.isRequired
};

SearchIcon.propTypes = {
  isDark: PropTypes.bool.isRequired
};

HeartIcon.propTypes = {
  isDark: PropTypes.bool.isRequired,
  count: PropTypes.number
};

CartIcon.propTypes = {
  isDark: PropTypes.bool.isRequired,
  count: PropTypes.number
};
