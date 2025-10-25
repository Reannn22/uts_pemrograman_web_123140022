import { createContext, useContext, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext(null);

const initialState = {
  items: []
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
      return { ...state, items };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const cartStats = useMemo(() => ({
    totalItems: state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    totalWithTax: state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.1
  }), [state.items]);

  const value = useMemo(() => ({
    state,
    dispatch,
    ...cartStats
  }), [state, cartStats]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Add type validation for context value
CartContext.displayName = 'CartContext';
CartContext.propTypes = {
  state: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired
    })).isRequired
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
