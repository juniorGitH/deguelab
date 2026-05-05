/**
 * Degue Lab - Cart Context
 * Gestion de l'état du panier
 */

import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const savedCart = localStorage.getItem("deguelab_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Erreur chargement du panier:", e);
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("deguelab_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedOption = null) => {
    setCartItems((prevItems) => {
      // Pour les produits avec options, créer une clé unique basée sur le produit + option
      const itemKey = selectedOption ? `${product.id}-${selectedOption}` : product.id;
      const existingItem = prevItems.find((item) => item.cartKey === itemKey);

      if (existingItem) {
        return prevItems.map((item) =>
          item.cartKey === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, { ...product, quantity, selectedOption, cartKey: itemKey }];
    });

    const optionLabel = selectedOption ? ` (${selectedOption})` : "";
    showSuccessNotification(`${product.name}${optionLabel} ajouté au panier!`);
  };

  const removeFromCart = (cartKey) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartKey !== cartKey)
    );
  };

  const updateQuantity = (cartKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartKey);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartKey === cartKey ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        showNotification,
        notificationMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans CartProvider");
  }
  return context;
};
