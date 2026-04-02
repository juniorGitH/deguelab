import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { articleService, orderService, tontineService, authService } from "../utils/services";
import { getProductImage, getFallbackImage } from "../utils/productImages";

const CreateTontine = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const articleId = searchParams.get("articleId");

  const [article, setArticle] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [frequency, setFrequency] = useState("Hebdomadaire");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [createdTontine, setCreatedTontine] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }
    if (articleId) {
      loadArticle();
    }
  }, [articleId, navigate]);

  const loadArticle = async () => {
    const data = await articleService.getById(articleId);
    if (data) {
      // Assign image based on category
      data.photo = getProductImage(data.id, data.categorie || 1);
      setName(`Tontine - ${data.nom}`);
    }
    setArticle(data);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const calculatePayments = () => {
    if (!article || !paymentAmount || parseFloat(paymentAmount) <= 0) return null;
    const totalPayments = Math.ceil(article.prix / parseFloat(paymentAmount));
    const daysPerPayment = frequency === "Hebdomadaire" ? 7 : 30;
    const totalDays = totalPayments * daysPerPayment;
    return { totalPayments, totalDays };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (parseFloat(paymentAmount) <= 0) {
      setErrorMessage("Le montant du versement doit être supérieur à 0");
      setIsLoading(false);
      return;
    }

    try {
      // First create the order
      const orderResult = await orderService.createOrder({
        productId: parseInt(articleId),
        totalAmount: article.prix,
        customerPhoneNumber: phone,
        deliveryAddress: address,
        paymentMethod: "Tontine",
        paymentType: "Tontine",
      });

      if (!orderResult.success) {
        throw new Error(orderResult.error);
      }

      // Then create the tontine
      const tontineResult = await tontineService.createTontine(
        orderResult.order,
        parseFloat(paymentAmount),
        frequency,
        name
      );

      if (tontineResult.success) {
        setCreatedTontine(tontineResult.tontine);
        setSuccess(true);
      } else {
        throw new Error(tontineResult.error);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const paymentInfo = calculatePayments();

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tontine créée avec succès !</h2>
            <p className="text-gray-600 mb-6">
              Votre plan de paiement échelonné a été configuré.
            </p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Article:</span>
                  <span className="font-semibold">{article?.nom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Versement:</span>
                  <span className="font-semibold">{formatPrice(paymentAmount)} FCFA / {frequency === "Hebdomadaire" ? "semaine" : "mois"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-semibold">{formatPrice(article?.prix)} FCFA</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
              >
                Voir mes tontines
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-6">
            <h1 className="text-2xl font-bold text-white">📒 Créer une Tontine</h1>
            <p className="text-gray-300">Paiement échelonné selon votre budget</p>
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
                <div className="text-xl font-bold text-gray-900">
                  {formatPrice(article.prix)} FCFA
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">⚠️ {errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Montant par versement (FCFA)
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  required
                  min="1000"
                  step="500"
                  placeholder="Ex: 5000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Fréquence des versements
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFrequency("Hebdomadaire")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      frequency === "Hebdomadaire"
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">📅</div>
                    <div className="font-semibold">Hebdomadaire</div>
                    <div className="text-sm text-gray-500">Chaque semaine</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("Mensuelle")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      frequency === "Mensuelle"
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">🗓️</div>
                    <div className="font-semibold">Mensuelle</div>
                    <div className="text-sm text-gray-500">Chaque mois</div>
                  </button>
                </div>
              </div>

              {/* Payment Summary */}
              {paymentInfo && (
                <div className="bg-purple-50 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-900 mb-3">📊 Résumé du plan</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nombre de versements:</span>
                      <span className="font-semibold">{paymentInfo.totalPayments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durée estimée:</span>
                      <span className="font-semibold">~{paymentInfo.totalDays} jours</span>
                    </div>
                    <div className="flex justify-between text-purple-700 font-semibold">
                      <span>Total à payer:</span>
                      <span>{formatPrice(article?.prix)} FCFA</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Numéro de téléphone
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
                  rows={2}
                  placeholder="Votre adresse complète..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !paymentInfo}
                className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création...
                  </span>
                ) : (
                  "Créer ma Tontine"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTontine;
