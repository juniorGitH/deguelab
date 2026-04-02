import React, { useState, useEffect } from "react";
import { contentService } from "../utils/services";

const APropos = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      const data = await contentService.getContent();
      setContent(data?.aPropos);
      setIsLoading(false);
    };
    loadContent();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            À Propos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez qui nous sommes et notre mission
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src={content?.image || "/images/about-us.jpg"}
                alt="À propos de Dreamer the Prince"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-2xl"></div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {content?.title || "Dreamer the Prince Boutique"}
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  {content?.content || `
                    Dreamer the Prince est votre destination de confiance pour l'électronique au Togo.
                    
                    Fondée avec la vision de rendre la technologie accessible à tous, notre boutique propose 
                    une large gamme de téléphones, ordinateurs et accessoires de qualité.
                  `}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Produits Garantis</h4>
                    <p className="text-sm text-gray-600">Tous nos produits sont neufs et garantis</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">💳</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Paiement Flexible</h4>
                    <p className="text-sm text-gray-600">TMoney, Flooz et système Tontine</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🚚</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Livraison Rapide</h4>
                    <p className="text-sm text-gray-600">Partout au Togo avec suivi en temps réel</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Support Client</h4>
                    <p className="text-sm text-gray-600">Service réactif et professionnel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">5000+</div>
            <p className="text-gray-600">Clients satisfaits</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">10000+</div>
            <p className="text-gray-600">Produits livrés</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">15+</div>
            <p className="text-gray-600">Villes desservies</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APropos;
