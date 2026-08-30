import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'woodiq_cart_v1';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading cart from storage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [cart]);

  const isInCart = (identifier) => {
    if (!identifier) return false;
    return cart.some(
      (item) => item.id === identifier || item.name === identifier
    );
  };

  const addToCart = (game) => {
    if (!game) return;
    setCart((prev) => {
      if (prev.some((item) => item.id === game.id || item.name === game.name)) {
        return prev;
      }
      return [...prev, game];
    });
  };

  const removeFromCart = (identifier) => {
    if (!identifier) return;
    setCart((prev) =>
      prev.filter((item) => item.id !== identifier && item.name !== identifier)
    );
  };

  const toggleCart = (game) => {
    if (!game) return;
    if (isInCart(game.id || game.name)) {
      removeFromCart(game.id || game.name);
    } else {
      addToCart(game);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Подсчет эффективного количества игр для аренды (Дженга считается за 2 игры)
  const effectiveRentalGamesCount = cart.reduce((total, item) => {
    return total + (item.isMegaJenga ? 2 : 1);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.length,
        effectiveRentalGamesCount,
        isInCart,
        addToCart,
        removeFromCart,
        toggleCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
