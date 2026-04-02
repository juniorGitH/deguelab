import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, articleService } from "../utils/services";
import { assignImagesToArticles, getFallbackImage } from "../utils/productImages";

const ProductAdmin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1); // 1: Phones, 2: Computers, 3: Accessories
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form state
  const [nom, setNom] = useState("");
  const [marque, setMarque] = useState("");
  const [caracteristique, setCaracteristique] = useState("");
  const [prix, setPrix] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== "Admin") {
      navigate("/login");
      return;
    }
    loadArticles();
  }, [activeTab, navigate]);

  const loadArticles = async () => {
    setIsLoading(true);
    const data = await articleService.getByCategory(activeTab);
    // Assign unique images to each article
    const articlesWithImages = assignImagesToArticles(data, activeTab);
    setArticles(articlesWithImages);
    setIsLoading(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  const resetForm = () => {
    setNom("");
    setMarque("");
    setCaracteristique("");
    setPrix("");
    setPhoto("");
    setEditingArticle(null);
    setShowForm(false);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setNom(article.nom);
    setMarque(article.marque);
    setCaracteristique(article.caracteristique);
    setPrix(article.prix.toString());
    setPhoto(article.photo || "");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const articleData = {
      nom,
      marque,
      caracteristique,
      prix: parseFloat(prix),
      photo,
      categorie: activeTab,
    };

    let result;
    if (editingArticle) {
      result = await articleService.update(editingArticle.id, articleData);
    } else {
      result = await articleService.create(articleData);
    }

    if (result.success) {
      setMessage({ type: "success", text: editingArticle ? "Article mis à jour !" : "Article créé !" });
      resetForm();
      loadArticles();
    } else {
      setMessage({ type: "error", text: result.error });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    const result = await articleService.delete(id);
    if (result.success) {
      setMessage({ type: "success", text: "Article supprimé !" });
      loadArticles();
    } else {
      setMessage({ type: "error", text: result.error });
    }
  };

  const tabConfig = {
    1: { name: "Téléphones", color: "purple", icon: "📱" },
    2: { name: "Ordinateurs", color: "blue", icon: "💻" },
    3: { name: "Accessoires", color: "green", icon: "🎧" },
  };

  const currentTab = tabConfig[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">⚙️ Gestion des Produits</h1>
            <p className="text-gray-600">Ajoutez, modifiez ou supprimez des produits</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`px-6 py-2 font-semibold rounded-xl transition-colors ${
              showForm
                ? "bg-gray-200 text-gray-700"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            {showForm ? "Annuler" : "+ Ajouter un produit"}
          </button>
        </div>

        {/* Messages */}
        {message.text && (
          <div className={`mb-6 rounded-xl p-4 ${
            message.type === "success" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
          }`}>
            <p className={message.type === "success" ? "text-green-700" : "text-red-700"}>
              {message.type === "success" ? "✅" : "⚠️"} {message.text}
            </p>
          </div>
        )}

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingArticle ? "Modifier l'article" : "Nouvel article"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="iPhone 15 Pro Max"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Marque</label>
                  <input
                    type="text"
                    value={marque}
                    onChange={(e) => setMarque(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="Apple"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Caractéristiques</label>
                <textarea
                  value={caracteristique}
                  onChange={(e) => setCaracteristique(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                  placeholder="256GB, Titanium Blue, A17 Pro chip..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Prix (FCFA)</label>
                  <input
                    type="number"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    required
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="850000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL de l'image</label>
                  <input
                    type="url"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
                >
                  {editingArticle ? "Mettre à jour" : "Créer l'article"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {Object.entries(tabConfig).map(([id, config]) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(parseInt(id))}
                  className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                    activeTab === parseInt(id)
                      ? `border-b-2 border-${config.color}-600 text-${config.color}-600`
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {config.icon} {config.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Products Grid */}
          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                <p className="mt-2 text-gray-600">Chargement...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-2">{currentTab.icon}</div>
                <p>Aucun {currentTab.name.toLowerCase()} pour le moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <div key={article.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={article.photo}
                      alt={article.nom}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.src = getFallbackImage(activeTab);
                      }}
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{article.nom}</h3>
                      <p className="text-sm text-gray-600 mb-2">{article.marque}</p>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{article.caracteristique}</p>
                      <p className="text-lg font-bold text-purple-600 mb-3">{formatPrice(article.prix)} FCFA</p>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(article)}
                          className="flex-1 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="flex-1 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
