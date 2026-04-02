/**
 * Degue Lab - Page À Propos
 */

import React from "react";
import { openWhatsAppWithLocation } from "../utils/whatsappOrder";

const DegueLabAbout = () => {
  const handleContactClick = async (event) => {
    event.preventDefault();
    await openWhatsAppWithLocation("Bonjour Degue Lab! Je veux en savoir plus.");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <section
        className="relative overflow-hidden text-white py-14 sm:py-20 px-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(25,25,25,0.58), rgba(25,25,25,0.58)), url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tight leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
            À PROPOS DE DEGUE LAB
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto">
            Une marque premium dédiée au degué et au yaourt de qualité.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-12 text-stone-900" style={{ fontFamily: "Poppins, sans-serif" }}>
            NOS VALEURS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-stone-50 rounded-3xl p-5 sm:p-8 text-center border border-stone-200">
              <div className="text-xs tracking-[0.2em] text-stone-500 mb-4">QUALITÉ</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-stone-900">Sélection Premium</h3>
              <p className="text-stone-600">Ingrédients contrôlés et recettes maîtrisées.</p>
            </div>
            <div className="bg-stone-50 rounded-3xl p-5 sm:p-8 text-center border border-stone-200">
              <div className="text-xs tracking-[0.2em] text-stone-500 mb-4">INNOVATION</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-stone-900">Mélanges Signature</h3>
              <p className="text-stone-600">Fruits, textures et options protéinées pensées pour la performance.</p>
            </div>
            <div className="bg-stone-50 rounded-3xl p-5 sm:p-8 text-center border border-stone-200">
              <div className="text-xs tracking-[0.2em] text-stone-500 mb-4">SERVICE</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-stone-900">Relation Directe</h3>
              <p className="text-stone-600">Commande WhatsApp simple, rapide et personnalisée.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 bg-stone-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
            Rejoignez l&apos;expérience Degue Lab
          </h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8">Commandez maintenant via WhatsApp.</p>
          <a
            href="https://wa.me/22893733150?text=Bonjour%20Degue%20Lab!%20Je%20veux%20en%20savoir%20plus"
            onClick={handleContactClick}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-700 text-white font-semibold py-3 sm:py-4 px-7 sm:px-12 rounded-full text-base sm:text-xl hover:bg-emerald-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            Contacter sur WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default DegueLabAbout;
