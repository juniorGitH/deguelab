/**
 * Degue Lab - Cart Drawer
 * Panier qui s'ouvre sur le côté
 */

import React from "react";
import { useCart } from "../CartContext";
import { openWhatsAppWithLocation } from "../utils/whatsappOrder";

const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const handleOrderFromCart = async () => {
    if (cartItems.length === 0) return;

    const items = cartItems
      .map((item) => `${item.name} (x${item.quantity}) - ${item.price}`)
      .join("\n");

    const total = calculateTotal().toFixed(2);
    const message = `Bonjour! Je souhaite commander:\n\n${items}\n\nTotal: ${total} XOF`;

    await openWhatsAppWithLocation(message);
    clearCart();
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-stone-200 sticky top-0 bg-white">
            <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              PANIER
            </h1>
            <button
              onClick={closeCart}
              className="text-stone-600 hover:text-stone-900 p-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-stone-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <p className="text-lg text-stone-600">Votre panier est vide</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.cartKey}
                    className="bg-stone-50 rounded-2xl p-4 border border-stone-200 hover:border-stone-300 transition-colors"
                  >
                    <div className="flex gap-3 mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-stone-900 break-words text-sm">
                          {item.name}
                          {item.selectedOption && <span className="text-emerald-600 font-semibold"> ({item.selectedOption})</span>}
                        </h3>
                        <p className="text-stone-500 text-xs break-words">{item.description}</p>
                        <p className="font-bold text-stone-900 mt-1">{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-stone-200 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                          className="px-2 py-1 text-stone-600 hover:text-stone-900 text-sm"
                        >
                          −
                        </button>
                        <span className="px-2 py-1 font-semibold text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                          className="px-2 py-1 text-stone-600 hover:text-stone-900 text-sm"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="text-red-600 hover:text-red-700 font-semibold text-xs"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-stone-200 p-4 sm:p-6 bg-white sticky bottom-0">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm text-stone-600">
                  <span>Sous-total</span>
                  <span className="font-semibold">{calculateTotal().toFixed(2)} XOF</span>
                </div>
                <div className="flex justify-between text-sm text-stone-600 pb-3 border-b border-stone-200">
                  <span>Livraison</span>
                  <span className="font-semibold">Gratuite</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-stone-900">
                  <span>Total</span>
                  <span>{calculateTotal().toFixed(2)} XOF</span>
                </div>
              </div>

              <button
                onClick={handleOrderFromCart}
                className="w-full bg-stone-900 text-white font-semibold py-3 px-4 rounded-full hover:bg-stone-800 transform hover:scale-[1.02] transition-all duration-300 shadow-md mb-2 text-sm"
              >
                Commander sur WhatsApp
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-full hover:bg-red-200 transition-all duration-300 text-sm"
              >
                Vider le panier
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
