import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useMemo, useCallback } from "react"; // NEW: Add hooks
import { translations } from "../../utils/translations";

export default function ProductCard({
  product,
  onAddToCart,
  lang = "id",
  isDark = false,
  onQuickView = undefined,
}) {
  const { dispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const isWishlisted = wishlistState.items.some(
    (item) => item.id === product.id
  );

  // NEW: Calculate discount price with useMemo
  const discountedPrice = useMemo(() => {
    return product.discountPercentage
      ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
      : product.price;
  }, [product.price, product.discountPercentage]);

  // NEW: Memoize add to cart handler
  const handleAddToCart = useCallback(() => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }, [dispatch, product]);

  const toggleWishlist = useCallback(
    (e) => {
      e.preventDefault();
      if (isWishlisted) {
        wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
      } else {
        wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: product });
      }
    },
    [isWishlisted, product, wishlistDispatch]
  );

  const productTexts = translations[lang].products || {};

  return (
    <div
      className={`w-full flex flex-col rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
        isDark ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="relative">
        <button
          onClick={toggleWishlist}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-colors
            ${
              isDark
                ? isWishlisted
                  ? "bg-gray-700 text-red-500"
                  : "bg-gray-700/50 hover:bg-gray-700 text-gray-300"
                : isWishlisted
                ? "bg-gray-100 text-red-500"
                : "bg-gray-100/50 hover:bg-gray-100 text-gray-600"
            }`}
        >
          <svg
            className="w-5 h-5"
            fill={isWishlisted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      <div className="flex flex-col p-4 flex-1">
        <h3
          className={`text-lg font-semibold line-clamp-1 mb-2 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {product.title}
        </h3>

        <div className="min-h-[4.5rem]">
          <p
            className={`text-sm line-clamp-3 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-4 space-y-3">
          <div className="flex items-baseline gap-2">
            <span className={isDark ? "text-gray-300" : "text-gray-600"}>
              ${discountedPrice}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${product.price}
              </span>
            )}
          </div>

          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span
              className={`text-sm ml-1 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {product.rating}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            className={`w-full py-2 rounded-lg transition-colors ${
              isDark
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {translations[lang]?.buttons?.addToCart || "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Update PropTypes
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string,
    rating: PropTypes.number,
    discountPercentage: PropTypes.number,
    category: PropTypes.string,
    brand: PropTypes.string,
    stock: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  lang: PropTypes.oneOf(["id", "en"]),
  isDark: PropTypes.bool,
  onQuickView: PropTypes.func,
};
