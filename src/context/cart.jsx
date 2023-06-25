import { createContext, useState } from "react";

export const CartContext = createContext();

const initialState = []
const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        return newState
      }

      return [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]
    }

    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload
      return state.filter(item => item.id !== id)
    }

    case 'CLEAR_CART': {
      return initialState
    }
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
