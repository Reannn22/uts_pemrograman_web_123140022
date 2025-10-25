import { API_ENDPOINTS } from '../utils/constants';

export const fetchProducts = async (limit = 20, skip = 0) => {
  const response = await fetch(`${API_ENDPOINTS.PRODUCTS}?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_ENDPOINTS.PRODUCT_DETAIL(id)}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${API_ENDPOINTS.PRODUCTS_CATEGORY(category)}`);
  if (!response.ok) throw new Error('Failed to fetch category products');
  return response.json();
};

export const searchProducts = async (query) => {
  const response = await fetch(`${API_ENDPOINTS.PRODUCTS_SEARCH(query)}`);
  if (!response.ok) throw new Error('Failed to search products');
  return response.json();
};
