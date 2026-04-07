/**
 * Degue Lab - Section Localisation
 */

import React from "react";

const DegueLabLocation = () => {
  const address = "Hédzranawoé, en face de l'église catholique, près du marché de Hédzranawoé";
  const city = "Lomé, Togo";
  
  // Coordonnées exactes de DegueLab (6°10'41.8"N 1°14'23.7"E)
  const latitude = 6.178275;
  const longitude = 1.239924;
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const embedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  return (
    <section className="py-12 sm:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-12 text-stone-900" 
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          NOUS TROUVER
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Informations de localisation */}
          <div className="text-center lg:text-left">
            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <svg 
                  className="w-8 h-8 text-emerald-600 mr-3" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Notre Adresse
                </h3>
              </div>
              
              <p className="text-stone-700 text-base sm:text-lg mb-2">
                {address}
              </p>
              <p className="text-stone-500 text-sm sm:text-base mb-6">
                {city}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start text-stone-600">
                  <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Ouvert tous les jours : 9h - 23h</span>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start text-stone-600">
                  <svg className="w-5 h-5 mr-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+22893733150" className="hover:text-emerald-600 transition-colors">
                    +228 93 73 31 50
                  </a>
                </div>
              </div>
              
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 text-sm sm:text-base"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Ouvrir dans Google Maps
              </a>
            </div>
          </div>
          
          {/* Carte Google Maps */}
          <div className="h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-lg border border-stone-200">
            <iframe
              title="Localisation DegueLab - Hédzranawoé, Lomé"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DegueLabLocation;
