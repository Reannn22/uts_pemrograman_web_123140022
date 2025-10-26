import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext(null);

// Get initial state from localStorage with proper error handling
const getInitialState = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    const parsedCart = savedCart ? JSON.parse(savedCart) : [];
    return {
      items: Array.isArray(parsedCart) ? parsedCart : []
    };
  } catch (error) {
    console.error('Error loading cart:', error);
    return { items: [] };
  }
};

function cartReducer(state, action) {
  let newState;

  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        newState = {
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        newState = {
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
      break;
    }

    case 'REMOVE_FROM_CART':
      newState = {
        items: state.items.filter(item => item.id !== action.payload)
      };
      break;

    case 'UPDATE_QUANTITY':
      newState = {
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
      break;

    case 'CLEAR_CART':
      newState = { items: [] };
      break;

    default:
      return state;
  }

  // Save to localStorage after every change
  localStorage.setItem('cart', JSON.stringify(newState.items));
  return newState;
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};
