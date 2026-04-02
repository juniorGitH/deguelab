/**
 * Degue Lab - Page d'accueil
 */

import { Link } from "react-router-dom";
import { openWhatsAppWithLocation } from "../utils/whatsappOrder";
import { degueProducts } from "../utils/degueProducts";

const DegueLabHome = () => {
  const heroImage =
    "https://images.unsplash.com/photo-1483918793747-5adbf82956c4?auto=format&fit=crop&w=1800&q=80";

  const products = degueProducts;

  const handleBuy = async (product) => {
    const message = `Bonjour! Je souhaite acheter: ${product.name} (${product.price})`;
    await openWhatsAppWithLocation(message);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <section
        className="relative overflow-hidden text-white py-16 sm:py-20 lg:py-24 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(20,20,20,0.62), rgba(20,20,20,0.62)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 tracking-tight leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
            DEGUE LAB
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8 max-w-3xl mx-auto">
            L&apos;expérience premium du degué, sounochie et yaourt artisanal.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base">
            <Link
              to="/products?category=fruits"
              className="bg-white/10 border border-white/30 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
            >
              Mélanges de fruits
            </Link>
            <Link
              to="/products?category=protein"
              className="bg-white/10 border border-white/30 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-white/20 transition-colors duration-300"
            >
              Gamme protéinée
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12 max-w-5xl mx-auto">
            {[
              { label: "Basiques", category: "classique" },
              { label: "Protein", category: "protein" },
              { label: "Yaourts", category: "yaourt" }
            ].map((item) => (
              <Link
                to={`/products?category=${item.category}`}
                key={item.label}
                className="bg-white border border-stone-200 text-stone-900 p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 text-center block"
              >
                <div className="text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] text-stone-500 mb-2">CATÉGORIE</div>
                <div className="font-bold text-sm sm:text-base">{item.label}</div>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-12 text-stone-900" style={{ fontFamily: "Poppins, sans-serif" }}>
            NOS VARIÉTÉS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
              >
                <div className="h-48 sm:h-52">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-stone-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {product.name}
                  </h3>
                  <p className="text-stone-600 text-sm mb-4 min-h-12 sm:h-12">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-black text-stone-900">{product.price}</span>
                  </div>
                  <button
                    onClick={() => handleBuy(product)}
                    className="w-full mt-4 bg-stone-900 text-white font-semibold py-3 px-4 sm:px-6 rounded-full hover:bg-stone-800 transform hover:scale-[1.02] transition-all duration-300 shadow-md text-sm sm:text-base"
                  >
                    Acheter via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-8 sm:mb-12" style={{ fontFamily: "Poppins, sans-serif" }}>
            POURQUOI DEGUE LAB ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-sm tracking-[0.2em] text-stone-300 mb-4">QUALITÉ</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">100% Artisanal</h3>
              <p className="text-white/90">Ingrédients premium, préparation soignée et finition élégante.</p>
            </div>
            <div className="text-center">
              <div className="text-sm tracking-[0.2em] text-stone-300 mb-4">SERVICE</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Livraison Express</h3>
              <p className="text-white/90">Commandez sur WhatsApp, recevez rapidement chez vous.</p>
            </div>
            <div className="text-center">
              <div className="text-sm tracking-[0.2em] text-stone-300 mb-4">CONFIANCE</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">Satisfaction Totale</h3>
              <p className="text-white/90">Une expérience premium pensée pour fidéliser chaque client.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DegueLabHome;
