import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, orderService } from "../utils/services";

const LivreurDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("available");

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== "Livreur") {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setIsLoading(true);
    const [pending, assigned] = await Promise.all([
      orderService.getPendingOrders(),
      orderService.getMyOrders(),
    ]);
    setPendingOrders(pending);
    setMyOrders(assigned);
    setIsLoading(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const handleAcceptOrder = async (orderId) => {
    const result = await orderService.acceptOrder(orderId);
    if (result.success) {
      loadData();
    }
  };

  const handleMarkDelivered = async (orderId) => {
    const result = await orderService.markDelivered(orderId);
    if (result.success) {
      loadData();
    }
  };

  const inProgressOrders = myOrders.filter(o => o.status === "InTransit" || o.status === "InProgress");
  const deliveredOrders = myOrders.filter(o => o.status === "Delivered");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🛵 Espace Livreur
          </h1>
          <p className="text-gray-600">Bonjour {user?.firstName || user?.username}, prêt pour les livraisons ?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Disponibles</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingOrders.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-cyan-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">En cours</p>
                <p className="text-3xl font-bold text-cyan-600">{inProgressOrders.length}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🛵</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Livrées</p>
                <p className="text-3xl font-bold text-green-600">{deliveredOrders.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("available")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === "available"
                    ? "border-b-2 border-cyan-600 text-cyan-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                📦 Disponibles ({pendingOrders.length})
              </button>
              <button
                onClick={() => setActiveTab("inProgress")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === "inProgress"
                    ? "border-b-2 border-cyan-600 text-cyan-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                🛵 En cours ({inProgressOrders.length})
              </button>
              <button
                onClick={() => setActiveTab("delivered")}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === "delivered"
                    ? "border-b-2 border-cyan-600 text-cyan-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                ✅ Livrées ({deliveredOrders.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Available Orders */}
            {activeTab === "available" && (
              <div className="space-y-4">
                {pendingOrders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📭</div>
                    <p>Aucune commande disponible pour le moment</p>
                  </div>
                ) : (
                  pendingOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-xl p-4 hover:border-cyan-300 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-cyan-600 font-semibold">{order.trackingCode}</span>
                        <span className="text-lg font-bold">{formatPrice(order.totalAmount)} FCFA</span>
                      </div>
                      <div className="mb-3">
                        <p className="text-gray-600">📍 {order.deliveryAddress}</p>
                        <p className="text-gray-500 text-sm">📞 {order.customerPhoneNumber}</p>
                      </div>
                      <button
                        onClick={() => handleAcceptOrder(order.id)}
                        className="w-full py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
                      >
                        Accepter cette livraison
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* In Progress Orders */}
            {activeTab === "inProgress" && (
              <div className="space-y-4">
                {inProgressOrders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">🛵</div>
                    <p>Aucune livraison en cours</p>
                  </div>
                ) : (
                  inProgressOrders.map((order) => (
                    <div key={order.id} className="border border-cyan-200 bg-cyan-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-cyan-600 font-semibold">{order.trackingCode}</span>
                        <span className="px-2 py-1 bg-cyan-200 text-cyan-800 text-xs rounded-full font-semibold">
                          En cours
                        </span>
                      </div>
                      <div className="mb-3">
                        <p className="text-gray-700 font-semibold">📍 {order.deliveryAddress}</p>
                        <p className="text-gray-600">📞 {order.customerPhoneNumber}</p>
                        <p className="text-lg font-bold text-gray-900 mt-2">{formatPrice(order.totalAmount)} FCFA</p>
                      </div>
                      <button
                        onClick={() => handleMarkDelivered(order.id)}
                        className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                      >
                        ✅ Marquer comme livré
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Delivered Orders */}
            {activeTab === "delivered" && (
              <div className="space-y-4">
                {deliveredOrders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📭</div>
                    <p>Aucune livraison effectuée</p>
                  </div>
                ) : (
                  deliveredOrders.map((order) => (
                    <div key={order.id} className="border border-green-200 bg-green-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-green-600 font-semibold">{order.trackingCode}</span>
                        <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full font-semibold">
                          ✅ Livré
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600 text-sm">{order.deliveryAddress}</p>
                        <p className="font-bold text-gray-900">{formatPrice(order.totalAmount)} FCFA</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivreurDashboard;
