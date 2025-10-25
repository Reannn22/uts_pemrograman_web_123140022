import { createContext, useContext, useReducer, useEffect, useMemo } from 'react'; // NEW: add useMemo
import PropTypes from 'prop-types';
import { CART } from '../utils/constants'; // NEW: import constants

const CartContext = createContext(null);

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      const items = existingItem
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }];

      return {
        ...state,
        items,
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
    }

    case 'REMOVE_FROM_CART': {
      const items = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items,
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
    }

    case 'UPDATE_QUANTITY': {
      const items = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      return {
        ...state,
        items,
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // NEW: Add memoized calculations
  const cartStats = useMemo(() => ({
    totalItems: state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    uniqueItems: state.items.length
  }), [state.items]);

  useEffect(() => {
    localStorage.setItem(CART.STORAGE_KEY, JSON.stringify({ ...state, ...cartStats }));
  }, [state, cartStats]);

  return (
    <CartContext.Provider value={{ state, dispatch, cartStats }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
