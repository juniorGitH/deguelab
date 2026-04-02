import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contentService } from "../utils/services";
import { getFallbackImage, phoneImages, computerImages, accessoryImages } from "../utils/productImages";

const Home = () => {
  const [content, setContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Category images from our image library
  const categoryImages = {
    phones: phoneImages[0],
    computers: computerImages[0],
    accessories: accessoryImages[0],
    hero: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=80"
  };

  useEffect(() => {
    const loadContent = async () => {
      const data = await contentService.getContent();
      setContent(data);
      setIsLoading(false);
    };
    loadContent();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {isLoading ? (
              <>
                {/* Skeleton Loader */}
                <div className="space-y-6 lg:space-y-8 animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg w-3/4"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                    <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="h-12 w-32 bg-purple-200 rounded-lg"></div>
                    <div className="h-12 w-32 bg-blue-200 rounded-lg"></div>
                  </div>
                </div>
                <div className="relative h-80 lg:h-[450px] bg-gray-200 rounded-3xl animate-pulse"></div>
              </>
            ) : (
              <>
                {/* Content */}
                <div className="space-y-6 lg:space-y-8">
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                    {content?.home?.title || "Dreamer the Prince"}
                  </h1>
                  <div className="space-y-4">
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 leading-relaxed">
                      {content?.home?.description || "Votre boutique de confiance au Togo pour téléphones, ordinateurs et accessoires."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/telephones"
                      className="inline-flex items-center justify-center px-8 py-3.5 text-base sm:text-lg font-semibold text-purple-600 bg-transparent border-2 border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      Nos Téléphones
                    </Link>
                    <Link
                      to="/ordinateurs"
                      className="inline-flex items-center justify-center px-8 py-3.5 text-base sm:text-lg font-semibold text-blue-600 bg-transparent border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                    >
                      Nos Ordinateurs
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-80 lg:h-[450px] mt-8 lg:mt-0 flex items-center justify-center">
                  <img
                    src={categoryImages.hero}
                    alt="Téléphone"
                    className="rounded-3xl shadow-2xl object-cover w-full h-full"
                    onError={(e) => {
                      e.target.src = getFallbackImage(1);
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-20">
            Nos Catégories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Téléphones */}
            <div className="space-y-4 transform hover:scale-105 transition-transform duration-300">
              <Link to="/telephones">
                <img
                  src={categoryImages.phones}
                  alt="Téléphones"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.target.src = getFallbackImage(1);
                  }}
                />
              </Link>
              <h3 className="text-2xl font-bold">Téléphones</h3>
              <p className="text-gray-600">Les derniers modèles de smartphones.</p>
            </div>

            {/* Ordinateurs */}
            <div className="space-y-4 transform hover:scale-105 transition-transform duration-300">
              <Link to="/ordinateurs">
                <img
                  src={categoryImages.computers}
                  alt="Ordinateurs"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.target.src = getFallbackImage(2);
                  }}
                />
              </Link>
              <h3 className="text-2xl font-bold">Ordinateurs & Écrans</h3>
              <p className="text-gray-600">Des PC puissants pour le travail et le jeu.</p>
            </div>

            {/* Accessoires */}
            <div className="space-y-4 transform hover:scale-105 transition-transform duration-300">
              <Link to="/accessoires">
                <img
                  src={categoryImages.accessories}
                  alt="Accessoires"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.target.src = getFallbackImage(3);
                  }}
                />
              </Link>
              <h3 className="text-2xl font-bold">Casques & Accessoires</h3>
              <p className="text-gray-600">Accessoires de qualité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Contactez-nous
              </h3>
              <p className="text-gray-700 mb-4">
                Passez nous voir à notre siège à Lomé ou appelez-nous.
              </p>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <a href="tel:22891557698" className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                    +228 91 55 76 98
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/22891557698"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Social Media */}
            <div className="text-left md:text-right">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Suivez notre actualité
              </h3>
              <div className="flex gap-4 justify-start md:justify-end mt-6 flex-wrap">
                {/* Facebook */}
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* TikTok */}
                <a href="#" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-gray-600 pt-8 border-t border-gray-200">
            <a href="#" className="hover:text-purple-600 transition-colors">Politique de confidentialité</a>
            <span>© 2025 Emmanuel AMELA</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
