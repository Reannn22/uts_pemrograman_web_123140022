import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const WishlistContext = createContext(null);

const initialState = {
  items: JSON.parse(localStorage.getItem('wishlist') || '[]')
};

function wishlistReducer(state, action) {
  let newState;
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      newState = { items: [...state.items, action.payload] };
      break;
    case 'REMOVE_FROM_WISHLIST':
      newState = { items: state.items.filter(item => item.id !== action.payload) };
      break;
    default:
      return state;
  }
  localStorage.setItem('wishlist', JSON.stringify(newState.items));
  return newState;
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const value = { state, dispatch };
  
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired
};
