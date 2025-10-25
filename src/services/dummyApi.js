import { API } from '../utils/constants';

// Add translation function for products
const translateProduct = (product, lang) => {
  if (lang === 'id') {
    return {
      ...product,
      title: product.title
        .replace('Smartphone', 'Ponsel Pintar')
        .replace('Laptop', 'Laptop')
        .replace('Watch', 'Jam Tangan')
        .replace('Camera', 'Kamera'),
      description: product.description
        .replace('Features', 'Fitur')
        .replace('battery', 'baterai')
        .replace('display', 'layar')
        .replace('camera', 'kamera')
        .replace('memory', 'memori')
        .replace('Brand', 'Merek')
        .replace('Price', 'Harga')
        .replace('Available', 'Tersedia')
    }
  }
  return product;
};

export const fetchProducts = async (limit = 20, skip = 0, lang = 'en') => {
  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError('Server response was not JSON');
    }

    const data = await response.json();
    
    if (!data || !Array.isArray(data.products)) {
      throw new Error('Invalid data format from server');
    }

    return {
      ...data,
      products: data.products.map(product => translateProduct(product, lang))
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to load products. Please try again later.');
  }
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PRODUCT_DETAIL(id)}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PRODUCT_CATEGORY(category)}`);
  if (!response.ok) throw new Error('Failed to fetch category products');
  return response.json();
};

export const searchProducts = async (query) => {
  const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.PRODUCT_SEARCH}?q=${query}`);
  if (!response.ok) throw new Error('Failed to search products');
  return response.json();
};
