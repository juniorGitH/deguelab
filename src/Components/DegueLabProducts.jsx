/**
 * Degue Lab - Page Produits
 */

import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { openWhatsAppWithLocation } from "../utils/whatsappOrder";
import { degueCategories, degueProducts } from "../utils/degueProducts";

const DegueLabProducts = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState("all");

  const products = degueProducts;
  const categories = degueCategories;

  React.useEffect(() => {
    const isValidCategory = categories.some((cat) => cat.id === initialCategory);
    setActiveCategory(isValidCategory ? initialCategory : "all");
  }, [initialCategory]);

  const filteredProducts = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  const handleBuy = async (product) => {
    const message = `Bonjour! Je souhaite acheter:\n\n${product.name}\nPrix: ${product.price}\n\n${product.description}`;
    await openWhatsAppWithLocation(message);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 sm:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 text-stone-900 leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
            NOS VARIÉTÉS
          </h1>
          <p className="text-base sm:text-xl text-stone-600 max-w-3xl mx-auto">
            Une sélection premium de degué, sounochie et yaourt artisanal, avec options fruits et protéines.
          </p>
        </div>

        <div className="mb-8 sm:mb-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                  activeCategory === cat.id
                    ? "bg-stone-900 text-white shadow-md"
                    : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 shadow-sm"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-44 sm:h-52">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-stone-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {product.name}
                </h3>
                <p className="text-stone-600 text-sm mb-4 min-h-16 sm:h-16">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl sm:text-2xl font-black text-stone-900">{product.price}</span>
                </div>
                <button
                  onClick={() => handleBuy(product)}
                  className="w-full bg-stone-900 text-white font-semibold py-3 px-4 sm:px-6 rounded-full hover:bg-stone-800 transform hover:scale-[1.02] transition-all duration-300 shadow-md text-sm sm:text-base"
                >
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DegueLabProducts;
