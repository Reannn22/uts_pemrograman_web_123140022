import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Link,
  useSearchParams,
} from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import ProductCard from "../components/product/ProductCard";
import ErrorMessage from "../components/common/ErrorMessage";
import { translations } from "../utils/translations";

const categories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "sunglasses",
];

export default function ProductsPage() {
  const ITEMS_PER_PAGE = 20;
  const navigate = useNavigate();
  const location = useLocation();
  const { sortType } = useParams();
  const [params] = useSearchParams();
  const category = params.get("category");
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const lang = searchParams.get("lang") || localStorage.getItem("lang") || "id";
  const { isDark } = useTheme();
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { dispatch } = useCart();
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${
      (currentPage - 1) * ITEMS_PER_PAGE
    }`
  );

  // Memoize pageTexts
  const pageTexts = useMemo(
    () => translations[lang]?.productPage || {},
    [lang]
  );

  // Update sortOptions with proper memoization
  const sortOptions = useMemo(
    () => [
      { value: "", label: pageTexts.sortBy, path: "/products" },
      {
        value: "price-low",
        label: pageTexts.priceLowHigh,
        path: "/products/sort/price-low",
      },
      {
        value: "price-high",
        label: pageTexts.priceHighLow,
        path: "/products/sort/price-high",
      },
      {
        value: "rating",
        label: pageTexts.rating,
        path: "/products/sort/rating",
      },
    ],
    [pageTexts]
  );

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Get values from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSort = params.get("sort");
    const urlSearch = params.get("search");

    if (sortType) {
      const option = sortOptions.find((opt) => opt.value === sortType);
      if (option) setSortBy(option.value);
    } else if (urlSort) {
      setSortBy(urlSort);
    }

    if (urlSearch) setSearchTerm(urlSearch);
  }, [location.search, sortType, sortOptions]); // Include location.search in dependencies

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (sortBy) params.set("sort", sortBy);
    else params.delete("sort");

    if (searchTerm) params.set("search", searchTerm);
    else params.delete("search");

    navigate(`${location.pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchTerm, navigate, location.pathname]);

  // Memoize filtered products
  const { filteredProducts, stats } = useMemo(() => {
    if (!data?.products) {
      return {
        filteredProducts: [],
        stats: { totalProducts: 0, averagePrice: 0, averageRating: 0 },
      };
    }

    let filtered = data.products;

    // Apply category filter
    if (category) {
      filtered = filtered.filter(
        (product) => product.category === category.toLowerCase()
      );
    }

    // Apply search filter
    if (debouncedSearch) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Apply sort
    if (sortBy === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    // Calculate stats
    const stats = {
      totalProducts: filtered.length,
      averagePrice:
        filtered.reduce((sum, p) => sum + p.price, 0) / filtered.length || 0,
      averageRating:
        filtered.reduce((sum, p) => sum + p.rating, 0) / filtered.length || 0,
    };

    return { filteredProducts: filtered, stats };
  }, [data, debouncedSearch, sortBy, category]); // Add category to dependencies

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAddToCart = useCallback(
    (product) => {
      dispatch({ type: "ADD_TO_CART", payload: product });
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (newPage) => {
      searchParams.set("page", newPage.toString());
      navigate(`${location.pathname}?${searchParams.toString()}`);
    },
    [navigate, location.pathname, searchParams]
  );

  const handleSortChange = useCallback(
    (option) => {
      setSortBy(option.value);
      setIsDropdownOpen(false);

      // Build new URL
      const newPath = option.value
        ? `/products/sort/${option.value}`
        : "/products";

      // Preserve search params
      const params = new URLSearchParams(location.search);
      params.delete("sort"); // Remove sort from query params since it's in path
      const queryString = params.toString();

      navigate(queryString ? `${newPath}?${queryString}` : newPath);
    },
    [navigate, location.search]
  );

  // Update totalPages calculation with ITEMS_PER_PAGE in deps
  const totalPages = useMemo(() => {
    return data?.total ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;
  }, [data?.total, ITEMS_PER_PAGE]);

  // Update loading skeleton
  if (loading) {
    return (
      <div
        className={`min-h-screen w-full py-8 ${
          isDark ? "bg-gray-900" : "bg-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Search and Sort Skeleton */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <div
              className={`h-12 rounded-lg animate-pulse ${
                isDark ? "bg-gray-800" : "bg-gray-700"
              }`}
            />
            <div
              className={`h-12 rounded-lg animate-pulse ${
                isDark ? "bg-gray-800" : "bg-gray-700"
              }`}
            />
          </div>

          {/* Stats Skeleton */}
          <div
            className={`mb-6 p-4 rounded-lg animate-pulse ${
              isDark ? "bg-gray-800" : "bg-gray-700"
            }`}
          >
            <div className="h-4 w-2/3 rounded bg-gray-600" />
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <div
                key={i}
                className={`rounded-lg overflow-hidden ${
                  isDark ? "bg-gray-800" : "bg-gray-700"
                }`}
              >
                <div className="h-48 bg-gray-600 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-600 rounded w-3/4" />
                  <div className="h-4 bg-gray-600 rounded w-1/2" />
                  <div className="h-8 bg-gray-600 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} />;

  // Add translation for category names
  const getCategoryLabel = (category, translations, lang) => {
    return (
      translations[lang]?.categories[category] ||
      category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  return (
    <div
      className={`min-h-screen w-full py-2 sm:py-4 md:py-8 ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-4">
        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 md:gap-6">
          {/* Categories Sidebar dengan scroll tanpa scrollbar */}
          <div className="w-full md:w-64 md:flex-shrink-0">
            <div
              className={`
              ${isDark ? "bg-gray-800" : "bg-white"}
              border ${isDark ? "border-gray-700" : "border-gray-200"}
              rounded-lg p-2 sm:p-3 md:p-4
              md:sticky md:top-24
            `}
            >
              <h2
                className={`text-base md:text-lg font-semibold mb-2 sm:mb-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Categories
              </h2>
              {/* Kategori dengan hidden scrollbar */}
              <div
                className="
                flex md:flex-col gap-1.5 sm:gap-2 
                overflow-x-auto md:overflow-y-auto md:max-h-[calc(100vh-200px)]
                pb-1 sm:pb-2 md:pb-0 
                scrollbar-hide
                -mx-2 px-2 md:mx-0 md:px-0
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
              "
              >
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/products?category=${category}`}
                    className={`
                      whitespace-nowrap flex-shrink-0 md:flex-shrink
                      px-3 py-2 rounded-lg text-sm
                      ${
                        searchParams.get("category") === category
                          ? isDark
                            ? "bg-gray-700 text-white"
                            : "bg-gray-200 text-gray-900"
                          : isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-600 hover:bg-gray-200"
                      }
                    `}
                  >
                    {getCategoryLabel(category, translations, lang)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search and Sort */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
              <input
                ref={searchInputRef}
                type="search"
                placeholder={pageTexts.searchPlaceholder}
                className={`w-full p-2.5 md:p-3 rounded-lg border text-sm md:text-base ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                }`}
                value={searchTerm}
                onChange={handleSearch}
              />

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full p-3 rounded-lg border text-left flex justify-between items-center ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-200 text-gray-900"
                  }`}
                >
                  {sortOptions.find((option) => option.value === sortBy)
                    ?.label || pageTexts.sortBy}
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div
                    className={`absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-hidden ${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option)}
                        className={`w-full px-4 py-3 text-left hover:bg-opacity-10 transition-colors ${
                          isDark
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-200 hover:bg-gray-600"
                        } ${sortBy === option.value ? "bg-blue-500/10" : ""}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Stats Bar */}
            <div
              className={`mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 rounded-lg ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <p
                className={`text-xs sm:text-sm truncate ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {pageTexts.foundProducts} {stats.totalProducts} |
                {pageTexts.averagePrice}: ${stats.averagePrice.toFixed(2)} |
                {pageTexts.averageRating}: {stats.averageRating.toFixed(1)}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isDark={isDark}
                  lang={lang}
                />
              ))}
            </div>

            {/* Pagination with updated light mode colors */}
            <div className="mt-4 sm:mt-6 md:mt-8">
              <div className="flex justify-center items-center gap-1 sm:gap-1.5 md:gap-2">
                {/* Previous button - only show if not on first page */}
                {currentPage > 1 && (
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`min-w-[4rem] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                      rounded-lg transition-colors whitespace-nowrap ${
                        isDark
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {pageTexts.pagination.previous}
                  </button>
                )}

                {/* Page numbers */}
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 text-xs sm:text-sm rounded-lg 
                      transition-colors ${
                        currentPage === idx + 1
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : isDark
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`min-w-[4rem] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm 
                    rounded-lg transition-colors whitespace-nowrap ${
                      isDark
                        ? "bg-gray-800 text-gray-300 disabled:bg-gray-700 hover:bg-gray-700"
                        : "bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
                    } disabled:cursor-not-allowed`}
                >
                  {pageTexts.pagination.next}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
