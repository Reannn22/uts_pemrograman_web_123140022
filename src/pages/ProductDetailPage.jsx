import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import useFetch from '../hooks/useFetch';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import chevronLeft from '../assets/icon/chevron-left.svg';
import chevronRight from '../assets/icon/chevron-right.svg';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { isDark } = useTheme();
  const { dispatch } = useCart();
  const { data: product, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = useCallback(() => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });
  }, [dispatch, product, quantity]);

  const navigateImage = (direction) => {
    if (direction === 'prev') {
      setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    } else {
      setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <div className={`min-h-screen py-8 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-w-16 aspect-h-12 rounded-lg overflow-hidden group">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
              
              {/* Navigation Arrows - Only show if more than one image */}
              {product.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Previous button - Only show if not first image */}
                  {selectedImage > 0 && (
                    <button
                      onClick={() => navigateImage('prev')}
                      className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    >
                      <img src={chevronLeft} alt="Previous" className="w-6 h-6 invert" />
                    </button>
                  )}
                  
                  <div className="flex-grow" />
                  
                  {/* Next button - Only show if not last image */}
                  {selectedImage < product.images.length - 1 && (
                    <button
                      onClick={() => navigateImage('next')}
                      className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    >
                      <img src={chevronRight} alt="Next" className="w-6 h-6 invert" />
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                    selectedImage === index 
                      ? 'ring-2 ring-blue-500' 
                      : 'hover:opacity-75'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-lg text-gray-500 mt-2">{product.brand}</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold">
                ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-xl text-gray-500 line-through">${product.price}</span>
                  <span className="text-green-500">-{product.discountPercentage}%</span>
                </>
              )}
            </div>

            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm">({product.rating} / 5)</span>
              </div>
              <p className="mt-2">Stock: {product.stock} units</p>
            </div>

            <p className="text-lg leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className={`px-4 py-2 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className={`px-4 py-2 ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
