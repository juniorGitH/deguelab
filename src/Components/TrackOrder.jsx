import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { orderService } from "../utils/services";

const TrackOrder = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [trackingCode, setTrackingCode] = useState(code || "");
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (code) {
      loadOrder(code);
    }
  }, [code]);

  const loadOrder = async (trackCode) => {
    setIsLoading(true);
    setErrorMessage("");
    const data = await orderService.getByTrackingCode(trackCode);
    if (data) {
      setOrder(data);
    } else {
      setErrorMessage("Commande non trouvée. Vérifiez le code de suivi.");
    }
    setIsLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      navigate(`/track-order/${trackingCode}`);
      loadOrder(trackingCode);
    }
  };

  const getStatusInfo = (status) => {
    const statuses = {
      PendingPayment: { label: "En attente de paiement", color: "yellow", step: 0 },
      Paid: { label: "Payé", color: "blue", step: 1 },
      Pending: { label: "En préparation", color: "blue", step: 1 },
      Accepted: { label: "Accepté", color: "blue", step: 2 },
      InTransit: { label: "En livraison", color: "purple", step: 3 },
      InProgress: { label: "En cours", color: "purple", step: 3 },
      Delivered: { label: "Livré", color: "green", step: 4 },
      Cancelled: { label: "Annulé", color: "red", step: -1 },
    };
    return statuses[status] || { label: status, color: "gray", step: 0 };
  };

  const steps = [
    { label: "Commande reçue", icon: "📦" },
    { label: "Préparation", icon: "⚙️" },
    { label: "Prise en charge", icon: "🏪" },
    { label: "En livraison", icon: "🛵" },
    { label: "Livré", icon: "✅" },
  ];

  const statusInfo = order ? getStatusInfo(order.status) : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">📍 Suivi de commande</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Entrez votre code de suivi..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              Rechercher
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-gray-400">Recherche de votre commande...</p>
          </div>
        ) : errorMessage ? (
          <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-6 text-center">
            <p className="text-red-300">❌ {errorMessage}</p>
          </div>
        ) : order ? (
          <>
            {/* Status Card */}
            <div className="bg-gray-800 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-gray-400 text-sm">Code de suivi</p>
                  <p className="text-2xl font-bold text-purple-400">{order.trackingCode}</p>
                </div>
                <div className={`px-4 py-2 rounded-full font-semibold ${
                  statusInfo.color === "green" ? "bg-green-500/20 text-green-400" :
                  statusInfo.color === "purple" ? "bg-purple-500/20 text-purple-400" :
                  statusInfo.color === "blue" ? "bg-blue-500/20 text-blue-400" :
                  statusInfo.color === "yellow" ? "bg-yellow-500/20 text-yellow-400" :
                  statusInfo.color === "red" ? "bg-red-500/20 text-red-400" :
                  "bg-gray-500/20 text-gray-400"
                }`}>
                  {statusInfo.label}
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                <div className="flex justify-between mb-2">
                  {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 ${
                        index <= statusInfo.step
                          ? "bg-purple-600"
                          : "bg-gray-700"
                      }`}>
                        {step.icon}
                      </div>
                      <p className={`text-xs text-center ${
                        index <= statusInfo.step ? "text-white" : "text-gray-500"
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Progress Line */}
                <div className="absolute top-6 left-6 right-6 h-1 bg-gray-700 -z-10">
                  <div
                    className="h-full bg-purple-600 transition-all duration-500"
                    style={{ width: `${(statusInfo.step / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-400">📦 Détails</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Montant:</span>
                    <span className="font-semibold">{new Intl.NumberFormat("fr-FR").format(order.totalAmount)} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Paiement:</span>
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type:</span>
                    <span>{order.paymentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date:</span>
                    <span>{new Date(order.purchaseDate).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-400">📍 Livraison</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400 block mb-1">Adresse:</span>
                    <span>{order.deliveryAddress}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">Téléphone:</span>
                    <span>{order.customerPhoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            {statusInfo.step >= 3 && statusInfo.step < 4 && (
              <div className="mt-6 bg-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-purple-400">🗺️ Suivi en temps réel</h3>
                <div className="bg-gray-700 rounded-xl h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🛵</div>
                    <p className="text-gray-400">Votre livreur est en route...</p>
                    <p className="text-sm text-gray-500">Carte disponible prochainement</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-300 mb-2">Suivez votre commande</h2>
            <p className="text-gray-500">Entrez votre code de suivi ci-dessus pour voir l'état de votre commande.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
