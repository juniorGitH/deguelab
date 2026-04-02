import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { articleService, authService } from "../utils/services";
import { assignImagesToArticles, getFallbackImage } from "../utils/productImages";

const CATEGORY_ID = 1; // Phones

const Telephones = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await articleService.getByCategory(CATEGORY_ID);
      // Assign unique images to each article
      const articlesWithImages = assignImagesToArticles(data, CATEGORY_ID);
      setArticles(articlesWithImages);
      if (data.length === 0) {
        setErrorMessage("Aucun téléphone trouvé.");
      }
    } catch (error) {
      setErrorMessage(`Erreur de connexion à l'API: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayCash = (article) => {
    navigate(`/payment?articleId=${article.id}&amount=${article.prix}`);
  };

  const handleTontine = (article) => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/createtontine?articleId=${article.id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-FR").format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Notre Catalogue de Téléphones
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection de téléphones. Chaque téléphone est neuf et garanti.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Chargement des téléphones...</p>
          </div>
        ) : errorMessage ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">❌ {errorMessage}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl">Aucun téléphone disponible pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={article.photo}
                  alt={`${article.marque} ${article.caracteristique}`}
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    e.target.src = getFallbackImage(CATEGORY_ID);
                  }}
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {article.nom}
                  </h3>
                  <p className="text-purple-600 font-semibold text-lg mb-2">
                    {article.marque}
                  </p>
                  <p className="text-gray-700 mb-4 flex-grow">
                    {article.caracteristique}
                  </p>
                  <div className="text-3xl font-bold text-gray-900 text-right mb-4">
                    {formatPrice(article.prix)} FCFA
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleTontine(article)}
                      className="w-full bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      📒 Tontine
                    </button>
                    <button
                      onClick={() => handlePayCash(article)}
                      className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Payer cash
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Telephones;
