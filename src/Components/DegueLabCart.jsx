/**
 * Degue Lab - Page Panier
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../CartContext";
import { openWhatsAppWithLocation } from "../utils/whatsappOrder";

const DegueLabCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

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
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-10 sm:py-12 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1
              className="text-3xl sm:text-5xl font-black mb-4 text-stone-900"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              PANIER
            </h1>

            <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 mt-8">
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

              <p className="text-lg text-stone-600 mb-6">
                Votre panier est vide
              </p>

              <button
                onClick={() => navigate("/products")}
                className="inline-block bg-stone-900 text-white font-semibold py-3 px-8 rounded-full hover:bg-stone-800 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Continuer les achats
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-12 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-3xl sm:text-5xl font-black mb-8 text-stone-900"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          PANIER
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 border-b border-stone-200 last:border-b-0"
                >
                  <div className="flex gap-4 flex-1 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-2xl flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-stone-900 break-words text-lg">
                        {item.name}
                      </h3>
                      <p className="text-stone-500 text-sm">{item.description}</p>
                      <p className="font-bold text-stone-900 mt-2">{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-stone-200 rounded-full">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-2 text-stone-600 hover:text-stone-900"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-2 text-stone-600 hover:text-stone-900"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 text-stone-600 hover:text-stone-900 font-semibold transition-colors"
            >
              ← Continuer les achats
            </button>
          </div>

          {/* Résumé */}
          <div className="h-fit">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8">
              <h2
                className="text-xl font-bold text-stone-900 mb-6"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Résumé
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Sous-total</span>
                  <span className="font-semibold">
                    {calculateTotal().toFixed(2)} XOF
                  </span>
                </div>
                <div className="flex justify-between text-stone-600 pb-4 border-b border-stone-200">
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
                className="w-full bg-stone-900 text-white font-semibold py-3 px-4 rounded-full hover:bg-stone-800 transform hover:scale-[1.02] transition-all duration-300 shadow-md mb-3"
              >
                Commander sur WhatsApp
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-red-100 text-red-600 font-semibold py-3 px-4 rounded-full hover:bg-red-200 transition-all duration-300"
              >
                Vider le panier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DegueLabCart;
