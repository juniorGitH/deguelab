import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, orderService, tontineService } from "../utils/services";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [tontines, setTontines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== "Admin") {
      navigate("/login");
      return;
    }
    setUser(currentUser);
    loadData();
  }, [navigate]);

  const loadData = async () => {
    setIsLoading(true);
    const [ordersData, tontinesData] = await Promise.all([
      orderService.getAllOrders(),
      tontineService.getAllTontines(),
    ]);
    setOrders(ordersData);
    setTontines(tontinesData);
    setIsLoading(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const getStats = () => {
    const totalRevenue = orders
      .filter(o => o.status === "Delivered")
      .reduce((sum, o) => sum + o.totalAmount, 0);
    
    const cashOrders = orders.filter(o => o.paymentType === "Cash");
    const tontineOrders = orders.filter(o => o.paymentType === "Tontine");
    const pendingOrders = orders.filter(o => 
      o.status === "Pending" || o.status === "Paid" || o.status === "Accepted"
    );

    return { totalRevenue, cashOrders, tontineOrders, pendingOrders };
  };

  const stats = getStats();

  const filteredOrders = () => {
    switch (activeTab) {
      case "pending":
        return orders.filter(o => o.status === "Pending" || o.status === "Paid");
      case "inTransit":
        return orders.filter(o => o.status === "InTransit" || o.status === "InProgress");
      case "delivered":
        return orders.filter(o => o.status === "Delivered");
      default:
        return orders;
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    const result = await orderService.updateStatus(orderId, newStatus);
    if (result.success) {
      loadData();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            🔐 Administration
          </h1>
          <p className="text-gray-600">Gérez votre boutique Dreamer the Prince</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Revenus totaux</p>
                <p className="text-2xl font-bold text-green-600">{formatPrice(stats.totalRevenue)} FCFA</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Commandes totales</p>
                <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Ventes cash</p>
                <p className="text-2xl font-bold text-purple-600">{stats.cashOrders.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💵</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Tontines actives</p>
                <p className="text-2xl font-bold text-orange-600">{tontines.filter(t => t.isActive).length}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📒</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alert for pending orders */}
        {stats.pendingOrders.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-center">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <p className="font-semibold text-yellow-800">
                {stats.pendingOrders.length} commande(s) en attente
              </p>
              <p className="text-sm text-yellow-700">
                Des commandes nécessitent votre attention
              </p>
            </div>
          </div>
        )}

        {/* Orders Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: "all", label: "Toutes", count: orders.length },
                { id: "pending", label: "En attente", count: stats.pendingOrders.length },
                { id: "inTransit", label: "En livraison", count: orders.filter(o => o.status === "InTransit").length },
                { id: "delivered", label: "Livrées", count: orders.filter(o => o.status === "Delivered").length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-semibold transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-purple-600 text-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders().map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-purple-600">{order.trackingCode}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{order.customerPhoneNumber}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{order.deliveryAddress}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold">{formatPrice(order.totalAmount)} FCFA</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.paymentType === "Tontine" ? "bg-gray-100 text-gray-700" : "bg-purple-100 text-purple-700"
                      }`}>
                        {order.paymentType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "InTransit" ? "bg-purple-100 text-purple-700" :
                        order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {order.status === "Paid" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "Accepted")}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            Accepter
                          </button>
                        )}
                        {order.status === "Accepted" && (
                          <button
                            onClick={() => handleUpdateStatus(order.id, "InTransit")}
                            className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                          >
                            Envoyer
                          </button>
                        )}
                        <button
                          onClick={() => navigate(`/track-order/${order.trackingCode}`)}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
                        >
                          Voir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders().length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Aucune commande dans cette catégorie
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
