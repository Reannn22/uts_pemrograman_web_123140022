import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import ProductCard from '../components/product/ProductCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function WishlistPage() {
  const { state } = useWishlist();
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`min-h-screen w-full py-8 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className={`h-8 w-48 mb-8 rounded animate-pulse ${
            isDark ? 'bg-gray-800' : 'bg-gray-200'
          }`} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`rounded-lg overflow-hidden animate-pulse ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <div className={`h-48 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <div className="p-4 space-y-3">
                  <div className={`h-4 w-3/4 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  <div className={`h-4 w-1/2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  <div className={`h-8 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
