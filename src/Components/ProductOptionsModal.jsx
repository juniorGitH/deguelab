/**
 * Degue Lab - Product Options Modal
 * Modal pour sélectionner les options d'un produit
 */

import React, { useState } from "react";

const ProductOptionsModal = ({ product, isOpen, onClose, onAddToCart, mode = "cart" }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  if (!isOpen || !product) return null;

  const handleConfirm = () => {
    if (!selectedOption) return;
    onAddToCart(selectedOption);
    setSelectedOption(null);
    onClose();
  };

  const buttonLabel = mode === "cart" ? "Ajouter au panier" : "Commander sur WhatsApp";

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200 sticky top-0 bg-white">
            <h2 className="text-xl font-black text-stone-900" style={{ fontFamily: "Poppins, sans-serif" }}>
              {product.name}
            </h2>
            <button
              onClick={onClose}
              className="text-stone-600 hover:text-stone-900 p-2 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-stone-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-bold text-stone-900 mb-4 text-lg">Choisir le type de base :</h3>
              <div className="space-y-3">
                {product.options?.map((option) => (
                  <label
                    key={option.name}
                    className="flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200"
                    style={{
                      borderColor: selectedOption === option.name ? "#000" : "#e7e5e4",
                      backgroundColor: selectedOption === option.name ? "#f5f5f0" : "white"
                    }}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={option.name}
                      checked={selectedOption === option.name}
                      onChange={() => setSelectedOption(option.name)}
                      className="w-5 h-5 accent-stone-900"
                    />
                    <span className="ml-4 font-semibold text-stone-900 capitalize">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleConfirm}
                disabled={!selectedOption}
                className={`w-full font-semibold py-3 px-4 rounded-full transform hover:scale-[1.02] transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  mode === "cart"
                    ? "bg-stone-900 text-white hover:bg-stone-800"
                    : "bg-stone-900 text-white hover:bg-stone-800"
                }`}
              >
                {buttonLabel}
              </button>
              <button
                onClick={onClose}
                className="w-full bg-stone-100 text-stone-900 font-semibold py-3 px-4 rounded-full hover:bg-stone-200 transition-all duration-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOptionsModal;
