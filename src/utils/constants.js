export const API = {
  BASE_URL: 'https://dummyjson.com',
  ENDPOINTS: {
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (id) => `/products/${id}`,
    PRODUCT_SEARCH: '/products/search',
    PRODUCT_CATEGORY: (category) => `/products/category/${category}`,
  }
};

export const PAGINATION = {
  ITEMS_PER_PAGE: 20,
  INITIAL_PAGE: 1
};

export const CART = {
  STORAGE_KEY: 'shopping_cart',
  MAX_QUANTITY: 10
};
