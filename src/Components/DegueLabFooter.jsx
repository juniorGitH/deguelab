/**
 * Degue Lab - Footer
 */

import React from "react";
import { Link } from "react-router-dom";
import { openWhatsAppWithLocation } from "../utils/whatsappOrder";

const DegueLabFooter = () => {
  const handleOrderClick = async (event) => {
    event.preventDefault();
    await openWhatsAppWithLocation("Bonjour Degue Lab! Je veux commander.");
  };

  return (
    <footer className="bg-stone-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black mb-4 tracking-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
              DEGUE LAB
            </h3>
            <p className="text-stone-300 mb-4 text-sm sm:text-base max-w-sm mx-auto md:mx-0">
              L&apos;excellence du degué, du yaourt et des recettes artisanales premium.
            </p>
            <a
              href="https://wa.me/22893733150"
              onClick={handleOrderClick}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-5 rounded-full transition-all duration-300 text-sm sm:text-base"
            >
              WhatsApp
            </a>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              Liens Rapides
            </h3>
            <ul className="space-y-2 text-stone-300 text-sm sm:text-base">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors duration-300">
                  Nos Variétés
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-300">
                  À Propos
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/22893733150"
                  onClick={handleOrderClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-300"
                >
                  Commander
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              Contact
            </h3>
            <ul className="space-y-3 text-stone-300 text-sm sm:text-base">
              <li>
                <a href="https://wa.me/22893733150" onClick={handleOrderClick} className="hover:text-white transition-colors duration-300">
                  +228 93 73 31 50
                </a>
              </li>
              <li>Tous les jours: 9h - 23h</li>
              <li>Lomé, Togo</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-6 sm:pt-8 text-center text-stone-400">
          <p className="text-sm">© 2026 Degue Lab - Tous droits réservés</p>
          <p className="mt-1">Développé par Emmanuel AMELA</p>
        </div>
      </div>
    </footer>
  );
};

export default DegueLabFooter;
