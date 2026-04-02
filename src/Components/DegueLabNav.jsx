/**
 * Degue Lab - Navigation Menu
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { openWhatsAppWithLocation } from "../utils/whatsappOrder";

const DegueLabNav = () => {
  const [isOpen, setIsOpen] = useState(false);
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

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-stone-700 focus:outline-none p-1" aria-label="Ouvrir le menu">
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
