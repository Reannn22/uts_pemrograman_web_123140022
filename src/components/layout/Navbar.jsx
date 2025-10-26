import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { translations } from "../../utils/translations";
import { useTheme } from "../../context/ThemeContext";
import logoImage from "../../assets/logo/ShoPPie.png";
import heartIcon from "../../assets/icon/heart.svg";
import languagesIcon from "../../assets/icon/languages.svg";
import moonIcon from "../../assets/icon/moon.svg";
import sunIcon from "../../assets/icon/sun.svg";
import searchIcon from "../../assets/icon/search.svg";
import cartIcon from "../../assets/icon/shopping-cart.svg";

function Logo({ isDark }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logoImage}
        alt="ShoPPie Logo"
        className="w-8 h-8 object-contain"
      />
      <span
        className={`text-2xl font-bold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        <span className="text-blue-600">ShoP</span>
        <span className="text-orange-500">Pie</span>
      </span>
    </div>
  );
}

Logo.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

// Update icon components with proper dark mode colors
function ThemeIcon({ isDark }) {
  return (
    <img
      src={isDark ? sunIcon : moonIcon}
      alt="Theme Toggle"
      className={`w-5 h-5 ${isDark ? "invert brightness-100" : ""}`}
    />
  );
}

function LanguageIcon({ isDark }) {
  return (
    <img
      src={languagesIcon}
      alt="Language"
      className={`w-5 h-5 ${isDark ? "invert brightness-100" : ""}`}
    />
  );
}

function SearchIcon({ isDark }) {
  return (
    <img
      src={searchIcon}
      alt="Search"
      className={`w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity ${
        isDark ? "invert brightness-100" : ""
      }`}
    />
  );
}

function HeartIcon({ isDark, count = 0 }) {
  return (
    <div className="relative">
      <img
        src={heartIcon}
        alt="Wishlist"
        className={`w-5 h-5 ${isDark ? "invert brightness-100" : ""}`}
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
        className={`w-5 h-5 ${isDark ? "invert brightness-100" : ""}`}
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
  const [lang, setLang] = useState(localStorage.getItem("lang") || "id");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const navbarRef = useRef(null); // Add new ref for navbar

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update handlers to include URL state
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("lang", newLang);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleThemeChange = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("theme", newTheme ? "dark" : "light");
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlLang = searchParams.get("lang");
    const urlTheme = searchParams.get("theme");

    if (urlLang && ["id", "en"].includes(urlLang)) {
      setLang(urlLang);
      localStorage.setItem("lang", urlLang);
    }

    if (urlTheme && ["dark", "light"].includes(urlTheme)) {
      setIsDark(urlTheme === "dark");
    }
  }, [location.search, setIsDark]); // Added setIsDark to dependency array

  // Memoize navTexts
  const navTexts = useMemo(() => translations[lang]?.navigation || {}, [lang]);

  // Move navigationItems inside component
  const navigationItems = useMemo(
    () => [
      { path: "/", label: navTexts.home || "Home" },
      { path: "/products", label: navTexts.products || "Products" },
      { path: "/contact", label: navTexts.contact || "Contact" },
      { path: "/about", label: navTexts.about || "About" },
    ],
    [navTexts]
  );

  // Get total items
  const totalCartItems = cartState.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalWishlistItems = wishlistState.items.length;

  // Add useEffect for click outside handling
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Shared background style for navbar and mobile menu
  const getBackgroundStyle = (isScrolled, isDark) => {
    return isScrolled
      ? isDark
        ? "bg-gray-900/70 backdrop-blur-md backdrop-saturate-150"
        : "bg-white/70 backdrop-blur-md backdrop-saturate-150"
      : isDark
      ? "bg-gray-900"
      : "bg-white";
  };

  // Add search handler function
  const handleSearch = (value) => {
    setSearchValue(value);
    const params = new URLSearchParams(location.search);
    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    navigate({
      pathname: "/products",
      search: params.toString(),
    });
  };

  // Update the main container and layout
  return (
    <>
      <nav
        ref={navbarRef}
        className={`fixed w-full top-0 left-0 right-0 z-50 ${getBackgroundStyle(
          isScrolled,
          isDark
        )}`}
      >
        <div className="relative container mx-auto px-6">
          {/* Main navbar content */}
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 min-w-[100px] md:min-w-[120px]">
              <Link to="/" className="flex items-center gap-2">
                <Logo isDark={isDark} />
              </Link>
            </div>

            {/* Center Navigation */}
            <div className="hidden lg:flex flex-1 justify-center items-center max-w-[800px]">
              <NavLinks
                isMobile={false}
                lang={lang}
                isDark={isDark}
                setIsDark={setIsDark}
                isScrolled={isScrolled}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                handleSearch={handleSearch}
                searchValue={searchValue}
              />
            </div>

            {/* Right Actions Group */}
            <div className="flex items-center">
              {/* Theme & Language Group */}
              <div className="flex items-center gap-4 mr-4">
                <button
                  onClick={handleThemeChange}
                  className="p-2 transition-opacity hover:opacity-100 opacity-70"
                >
                  <ThemeIcon isDark={isDark} />
                </button>

                <div
                  className={`h-5 w-px ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />

                <button
                  onClick={() =>
                    handleLanguageChange(lang === "id" ? "en" : "id")
                  }
                  className="flex items-center gap-1 text-sm transition-opacity hover:opacity-100 opacity-70"
                >
                  <LanguageIcon isDark={isDark} />
                  <span
                    className={`uppercase ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {lang}
                  </span>
                </button>
              </div>

              {/* Cart & Wishlist Group */}
              <div className="flex items-center gap-4">
                <div
                  className={`h-5 w-px ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                />

                <div className="flex items-center gap-4">
                  <Link
                    to="/wishlist"
                    className="transition-opacity hover:opacity-100 opacity-70"
                  >
                    <HeartIcon isDark={isDark} count={totalWishlistItems} />
                  </Link>

                  <div
                    className={`h-5 w-px ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  />

                  <Link
                    to="/cart"
                    className="transition-opacity hover:opacity-100 opacity-70"
                  >
                    <CartIcon isDark={isDark} count={totalCartItems} />
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 ml-4"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <MenuIcon isOpen={isMenuOpen} />
              </button>
            </div>
          </div>

          {/* Dropdown Menu */}
          {navigationItems.map(
            (item, index) =>
              item.hasDropdown && (
                <div
                  key={item.path}
                  className={`fixed left-0 right-0 z-[100] transition-all duration-300
                  ${
                    isScrolled
                      ? isDark
                        ? "bg-gray-900/70 backdrop-blur-md backdrop-saturate-150 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]"
                        : "bg-white/70 backdrop-blur-md backdrop-saturate-150 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
                      : isDark
                      ? "bg-gray-900 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]"
                      : "bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
                  }`}
                  style={{ top: "64px" }}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {/* Dropdown content here */}
                </div>
              )
          )}
        </div>
      </nav>

      {/* Mobile Menu - Moved outside of nav */}
      {isMenuOpen && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/20 z-40" />
          <div
            ref={menuRef}
            className="lg:hidden fixed left-0 right-0 z-50"
            style={{ top: "64px" }}
          >
            <div
              className={`px-4 py-4 ${getBackgroundStyle(isScrolled, isDark)}`}
            >
              {/* Navigation Links */}
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      block px-4 py-2 transition-colors
                      ${
                        isDark
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-gray-900"
                      }
                    `}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              {/* Updated Mobile Search Bar */}
              <div className="mt-4 px-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => {
                      handleSearch(e.target.value);
                      if (e.target.value.trim()) {
                        setIsMenuOpen(false); // Close menu when searching
                      }
                    }}
                    placeholder={navTexts.searchPlaceholder || "Search products..."}
                    className={`
                      w-full pl-10 pr-4 py-2 text-sm rounded-lg
                      ${
                        isDark
                          ? "text-white bg-transparent border-gray-700"
                          : "text-gray-900 bg-transparent border-gray-200"
                      }
                      border focus:outline-none
                      placeholder:text-gray-400
                    `}
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <SearchIcon isDark={isDark} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function MenuIcon({ isOpen }) {
  return (
    <div className="relative w-6 h-6">
      <span
        className={`absolute h-0.5 w-full bg-gray-600 transform transition-all duration-300 ${
          isOpen ? "rotate-45 top-3" : "rotate-0 top-1"
        }`}
      />
      <span
        className={`absolute h-0.5 w-full bg-gray-600 top-3 transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-0.5 w-full bg-gray-600 transform transition-all duration-300 ${
          isOpen ? "-rotate-45 top-3" : "rotate-0 top-5"
        }`}
      />
    </div>
  );
}

function NavLinks({
  isMobile = false,
  lang,
  isDark,
  onMenuClose,
  isScrolled,
  isDropdownOpen,
  setIsDropdownOpen,
  handleSearch,
  searchValue,
}) {
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const itemRefs = useRef([]); // Add this line
  const location = useLocation();

  // Memoize navTexts
  const navTexts = useMemo(() => translations[lang]?.navigation || {}, [lang]);

  // Move navigationItems inside component scope
  const navigationItems = useMemo(
    () => [
      { path: "/", label: navTexts.home || "Home" },
      { path: "/products", label: navTexts.products || "Products" },
      { path: "/contact", label: navTexts.contact || "Contact" },
      { path: "/about", label: navTexts.about || "About" },
    ],
    [navTexts]
  );

  // Function to get active index based on current path
  const getActiveIndex = (path) => {
    if (path.startsWith("/products") || path.includes("search=")) return 1;
    if (path.startsWith("/contact")) return 2;
    if (path.startsWith("/about")) return 3;
    return path === "/" ? 0 : -1;
  };

  // Get current active index
  const activeIndex = getActiveIndex(location.pathname + location.search);

  // Update underline on path change
  useEffect(() => {
    const newActiveIndex = getActiveIndex(location.pathname + location.search);
    if (newActiveIndex !== -1 && itemRefs.current[newActiveIndex]) {
      const activeItem = itemRefs.current[newActiveIndex];
      const textWidth = activeItem.firstChild.getBoundingClientRect().width;
      setUnderlineStyle({
        width: textWidth,
        left: activeItem.offsetLeft + (activeItem.offsetWidth - textWidth) / 2,
      });
    }
  }, [location.pathname, location.search]);

  // Handle search with preserved underline
  const handleSearchInternal = (e) => {
    const value = e.target.value;
    handleSearch(value);
  };

  const handleHover = (index) => {
    const item = itemRefs.current[index];
    if (item) {
      const textWidth = item.firstChild.getBoundingClientRect().width;
      setUnderlineStyle({
        width: textWidth,
        left: item.offsetLeft + (item.offsetWidth - textWidth) / 2,
      });
      setHoveredIndex(index);
    }
  };

  const handleLeave = () => {
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const activeItem = itemRefs.current[activeIndex];
      const textWidth = activeItem.firstChild.getBoundingClientRect().width;
      setUnderlineStyle({
        width: textWidth,
        left: activeItem.offsetLeft + (activeItem.offsetWidth - textWidth) / 2,
      });
    }
    setHoveredIndex(null);
  };

  return (
    <div
      className={`relative ${
        isMobile ? "flex flex-col space-y-4 w-full" : "flex items-center gap-4"
      }`}
    >
      {/* Tetap pertahankan underline dengan warna yang sama */}
      {!isMobile && (
        <div
          className={`absolute bottom-0 h-0.5 transition-all duration-300 ease-out ${
            isDark ? "bg-white" : "bg-gray-900"
          }`}
          style={{
            width: `${underlineStyle.width}px`,
            left: `${underlineStyle.left}px`,
          }}
        />
      )}

      {/* Navigation Links dengan perilaku hover yang diperbarui */}
      <div className="flex items-center space-x-8">
        {navigationItems.map((item, index) => {
          const isActive = index === activeIndex;
          const isHovered = hoveredIndex === index;

          return (
            <NavLink
              key={item.path}
              ref={(el) => (itemRefs.current[index] = el)}
              onMouseEnter={() => !isMobile && handleHover(index)}
              onMouseLeave={() => !isMobile && handleLeave()}
              to={item.path}
              className={`
                relative py-2 px-1 transition-colors duration-300
                ${
                  isDark
                    ? isHovered
                      ? "text-white"
                      : isActive
                      ? hoveredIndex === null
                        ? "text-white"
                        : "text-gray-400"
                      : "text-gray-400"
                    : isHovered
                    ? "text-gray-900"
                    : isActive
                    ? hoveredIndex === null
                      ? "text-gray-900"
                      : "text-gray-500"
                    : "text-gray-500"
                }
              `}
            >
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Search Bar dengan background transparan */}
      <div className="relative ml-8">
        <div className="relative flex items-center group">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchInternal}
            placeholder={navTexts.searchPlaceholder || "Search products..."}
            className={`
              w-48 pl-10 pr-4 py-2 text-sm rounded-full
              ${isDark
                ? "text-white bg-transparent"
                : "text-gray-900 bg-transparent"
              } 
              transition-colors duration-300
              focus:outline-none
              placeholder:text-gray-400
              hover:placeholder:text-gray-400
              focus:placeholder:text-gray-400
            `}
          />
          <div className="absolute left-3 pointer-events-none">
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
  lang: PropTypes.oneOf(["id", "en"]).isRequired,
  isDark: PropTypes.bool.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  setIsDropdownOpen: PropTypes.func.isRequired,
};

LanguageIcon.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

SearchIcon.propTypes = {
  isDark: PropTypes.bool.isRequired,
};

HeartIcon.propTypes = {
  isDark: PropTypes.bool.isRequired,
  count: PropTypes.number,
};

CartIcon.propTypes = {
  isDark: PropTypes.bool.isRequired,
  count: PropTypes.number,
};
