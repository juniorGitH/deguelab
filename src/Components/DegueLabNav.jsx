/**
 * Degue Lab - Navigation Menu
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { openWhatsAppWithLocation } from "../utils/whatsappOrder";
import { useCart } from "../CartContext";

const DegueLabNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  
  const handleOrderClick = async (event) => {
    event.preventDefault();
    await openWhatsAppWithLocation("Bonjour Degue Lab! Je veux commander.");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-xl sm:text-2xl md:text-3xl font-black text-stone-900 tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
              DEGUE LAB
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-stone-700 hover:text-stone-900 font-semibold transition-colors duration-300">
              Accueil
            </Link>
            <Link to="/products" className="text-stone-700 hover:text-stone-900 font-semibold transition-colors duration-300">
              Nos Variétés
            </Link>
            <Link to="/about" className="text-stone-700 hover:text-stone-900 font-semibold transition-colors duration-300">
              À Propos
            </Link>
            <button onClick={toggleCart} className="relative text-stone-700 hover:text-stone-900 font-semibold transition-colors duration-300 p-2 rounded-lg hover:bg-stone-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <a
              href="https://wa.me/22893733150?text=Bonjour%20Degue%20Lab!"
              onClick={handleOrderClick}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-900 text-white font-semibold py-3 px-6 rounded-full hover:bg-stone-800 transform hover:scale-105 transition-all duration-300 shadow-md"
            >
              WhatsApp
            </a>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleCart}
              className="relative text-stone-700 hover:text-stone-900 transition-colors duration-300 p-2 rounded-lg hover:bg-stone-100"
              aria-label="Ouvrir le panier"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-700 focus:outline-none p-1"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-3 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className="block py-3 px-3 text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-lg font-semibold transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="block py-3 px-3 text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-lg font-semibold transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Nos Variétés
            </Link>
            <Link
              to="/about"
              className="block py-3 px-3 text-stone-700 hover:bg-stone-100 hover:text-stone-900 rounded-lg font-semibold transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              À Propos
            </Link>
            <a
              href="https://wa.me/22893733150?text=Bonjour%20Degue%20Lab!"
              onClick={handleOrderClick}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-stone-900 text-white font-semibold py-3 px-6 rounded-full hover:bg-stone-800 transition-all duration-300 shadow-md w-full"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DegueLabNav;
