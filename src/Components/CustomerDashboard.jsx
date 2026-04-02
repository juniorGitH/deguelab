import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, tontineService, orderService } from "../utils/services";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tontines, setTontines] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setIsLoading(true);
    const [tontinesData, ordersData] = await Promise.all([
      tontineService.getMyTontines(),
      orderService.getMyOrders(),
    ]);
    setTontines(tontinesData);
    setOrders(ordersData);
    setIsLoading(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-orange-500";
    return "bg-purple-500";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {user?.firstName || user?.username} 👋
          </h1>
          <p className="text-gray-600">Bienvenue sur votre tableau de bord</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tontines actives</p>
                <p className="text-3xl font-bold text-purple-600">{tontines.filter(t => t.isActive).length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📒</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Commandes</p>
                <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tontines terminées</p>
                <p className="text-3xl font-bold text-green-600">{tontines.filter(t => t.isComplete).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tontines Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📒 Mes Tontines</h2>
          
          {tontines.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">📒</div>
              <p className="text-gray-600 mb-4">Vous n'avez pas encore de tontine.</p>
              <button
                onClick={() => navigate("/telephones")}
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Découvrir nos produits
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tontines.map((tontine) => {
                const progress = (tontine.amountPaid / tontine.totalAmount) * 100;
                const remaining = tontineService.calculateRemaining(tontine);

                return (
                  <div key={tontine.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 truncate">{tontine.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tontine.isComplete
                          ? "bg-green-100 text-green-700"
                          : tontine.isActive
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {tontine.isComplete ? "Terminé" : tontine.isActive ? "Actif" : "Inactif"}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{formatPrice(tontine.amountPaid)} FCFA</span>
                        <span>{formatPrice(tontine.totalAmount)} FCFA</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getProgressColor(progress)} transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-center text-sm text-gray-500 mt-1">{Math.round(progress)}%</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Versement:</span>
                        <span className="font-semibold">{formatPrice(tontine.paymentAmount)} FCFA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Fréquence:</span>
                        <span>{tontine.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Restant:</span>
                        <span className="font-semibold text-purple-600">
                          {remaining.paymentsLeft} versement(s)
                        </span>
                      </div>
                    </div>

                    {!tontine.isComplete && (
                      <button className="w-full mt-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                        Effectuer un versement
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📦 Commandes récentes</h2>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-4xl mb-4">📦</div>
              <p className="text-gray-600">Aucune commande pour le moment.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Montant</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-purple-600">{order.trackingCode}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(order.purchaseDate).toLocaleDateString("fr-FR")}
                        </td>
                        <td className="px-6 py-4 font-semibold">{formatPrice(order.totalAmount)} FCFA</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Delivered" ? "bg-green-100 text-green-700" :
                            order.status === "InTransit" ? "bg-purple-100 text-purple-700" :
                            order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                            "bg-blue-100 text-blue-700"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => navigate(`/track-order/${order.trackingCode}`)}
                            className="text-purple-600 hover:text-purple-800 font-semibold"
                          >
                            Suivre
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
