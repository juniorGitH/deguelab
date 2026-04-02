import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { articleService, orderService, paygateService, authService } from "../utils/services";
import { getProductImage, getFallbackImage } from "../utils/productImages";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const articleId = searchParams.get("articleId");
  const amount = searchParams.get("amount");

  const [article, setArticle] = useState(null);
  const [step, setStep] = useState(1); // 1: Details, 2: Processing, 3: Success/Failed
  const [paymentMethod, setPaymentMethod] = useState("TMoney");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  useEffect(() => {
    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  const loadArticle = async () => {
    const data = await articleService.getById(articleId);
    if (data) {
      // Assign image based on category
      data.photo = getProductImage(data.id, data.categorie || 1);
    }
    setArticle(data);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    // Validate phone
    if (!paygateService.isValidPhone(phone)) {
      setErrorMessage("Numéro de téléphone invalide. Format: 8 chiffres");
      setIsLoading(false);
      return;
    }

    setStep(2); // Processing

    try {
      // Create order
      const orderResult = await orderService.createOrder({
        productId: parseInt(articleId),
        totalAmount: parseFloat(amount),
        customerPhoneNumber: paygateService.formatPhone(phone),
        deliveryAddress: address,
        paymentMethod: paymentMethod,
        paymentType: "Cash",
      });

      if (!orderResult.success) {
        throw new Error(orderResult.error);
      }

      // Initiate payment
      const paymentResult = await paygateService.initiatePayment(
        parseFloat(amount),
        orderResult.order.id,
        phone,
        paymentMethod
      );

      if (paymentResult.success) {
        setTrackingCode(orderResult.order.trackingCode);
        setStep(3); // Success
      } else {
        throw new Error(paymentResult.error);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setStep(1); // Back to form
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"}`}>
              1
            </div>
            <div className={`w-20 h-1 ${step >= 2 ? "bg-purple-600" : "bg-gray-200"}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"}`}>
              2
            </div>
            <div className={`w-20 h-1 ${step >= 3 ? "bg-purple-600" : "bg-gray-200"}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"}`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: Details */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
              <h1 className="text-2xl font-bold text-white">Paiement</h1>
              <p className="text-purple-100">Complétez votre achat</p>
            </div>

            <div className="p-6">
              {/* Article Summary */}
              {article && (
                <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center space-x-4">
                  <img
                    src={article.photo}
                    alt={article.nom}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = getFallbackImage(article.categorie || 1);
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{article.nom}</h3>
                    <p className="text-sm text-gray-600">{article.marque}</p>
                  </div>
                  <div className="text-xl font-bold text-purple-600">
                    {formatPrice(amount)} FCFA
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">⚠️ {errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mode de paiement
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("TMoney")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === "TMoney"
                          ? "border-yellow-500 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-2xl mb-1">📱</div>
                      <div className="font-semibold">TMoney</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("Flooz")}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === "Flooz"
                          ? "border-cyan-500 bg-cyan-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-2xl mb-1">💳</div>
                      <div className="font-semibold">Flooz</div>
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Numéro {paymentMethod}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="90 00 00 00"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Adresse de livraison
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={3}
                    placeholder="Votre adresse complète à Lomé..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg"
                >
                  Payer {formatPrice(amount)} FCFA
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Processing */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Traitement en cours...</h2>
            <p className="text-gray-600">
              Veuillez confirmer le paiement sur votre téléphone {paymentMethod}
            </p>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Paiement réussi !</h2>
            <p className="text-gray-600 mb-6">
              Votre commande a été confirmée. Vous recevrez un SMS de confirmation.
            </p>
            
            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Code de suivi</p>
              <p className="text-2xl font-bold text-purple-600">{trackingCode}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate(`/track-order/${trackingCode}`)}
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
              >
                Suivre ma commande
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
