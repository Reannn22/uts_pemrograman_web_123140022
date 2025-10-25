import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/product/ProductCard';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { state } = useWishlist();
  const { isDark } = useTheme();

  if (state.items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Your wishlist is empty
        </h2>
        <Link to="/products" className="btn btn-primary mt-4 px-8">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full py-8 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">My Wishlist ({state.items.length})</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {state.items.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
