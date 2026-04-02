/**
 * NewProject component - Transformé en Déposer une demande de cours
 * Version responsive adaptée au marketplace
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBook, 
  faUserGraduate, 
  faCalendarAlt, 
  faDollarSign, 
  faInfoCircle,
  faMapMarkerAlt,
  faBullseye
} from "@fortawesome/free-solid-svg-icons";

const PostRequest = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [requestData, setRequestData] = useState({
    title: "",
    subject: "",
    level: "",
    budget: "",
    frequency: "once",
    description: "",
    address: "",
    type: "home"
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      navigate('/');
      return;
    }
    const user = JSON.parse(savedUser);
    setCurrentUser(user);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newRequest = {
      id: Date.now(),
      clientId: currentUser.id,
      clientName: currentUser.name,
      ...requestData,
      status: "open",
      createdAt: new Date().toISOString()
    };

    // Sauvegarde simulée (dans projects pour garder la compatibilité avec le reste du code existant)
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    localStorage.setItem('projects', JSON.stringify([...existingProjects, newProjectAdapt(newRequest)]));

    alert("Votre annonce a été publiée avec succès ! Les tuteurs correspondants seront notifiés.");
    navigate('/Dashboard');
  };

  // Petite fonction de conversion pour garder la compatibilité avec le Dashboard existant
  const newProjectAdapt = (req) => ({
    ...req,
    priority: "medium",
    deadline: new Date(Date.now() + 604800000).toISOString(), // 1 semaine par défaut
    tasks: [{ id: 1, title: "Analyse du besoin", status: "pending" }]
  });

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-[#4E567E] mb-2">Déposer une annonce</h1>
            <p className="text-gray-500">Décrivez votre besoin pour que nos tuteurs puissent vous proposer leurs services.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Titre de votre demande *</label>
              <input 
                type="text" 
                placeholder="Ex: Aide aux devoirs et méthodologie 6ème"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3498db]"
                value={requestData.title}
                onChange={(e) => setRequestData({...requestData, title: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Matière *</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faBook} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3498db] appearance-none"
                    value={requestData.subject}
                    onChange={(e) => setRequestData({...requestData, subject: e.target.value})}
                    required
                  >
                    <option value="">Sélectionner</option>
                    <option value="Mathématiques">Mathématiques</option>
                    <option value="Français">Français</option>
                    <option value="Anglais">Anglais</option>
                    <option value="Physique">Physique</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Niveau *</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faUserGraduate} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3498db] appearance-none"
                    value={requestData.level}
                    onChange={(e) => setRequestData({...requestData, level: e.target.value})}
                    required
                  >
                    <option value="">Sélectionner</option>
                    <option value="Primaire">Primaire</option>
                    <option value="Collège">Collège</option>
                    <option value="Lycée">Lycée</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Budget max. (FCFA/h)</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faDollarSign} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="number" 
                    placeholder="Ex: 5000"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3498db]"
                    value={requestData.budget}
                    onChange={(e) => setRequestData({...requestData, budget: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Lieu *</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3498db] appearance-none"
                    value={requestData.type}
                    onChange={(e) => setRequestData({...requestData, type: e.target.value})}
                  >
                    <option value="home">À domicile</option>
                    <option value="online">En ligne</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Détails de votre besoin *</label>
              <div className="relative">
                <textarea 
                  placeholder="Décrivez les chapitres à aborder, le caractère de l'enfant, vos attentes..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3498db] min-h-[120px]"
                  value={requestData.description}
                  onChange={(e) => setRequestData({...requestData, description: e.target.value})}
                  required
                ></textarea>
              </div>
            </div>

            <div className="bg-[#eefaff] p-4 rounded-2xl flex gap-4 items-start border border-blue-50">
              <FontAwesomeIcon icon={faInfoCircle} className="text-[#3498db] mt-1" />
              <p className="text-sm text-gray-600 leading-relaxed">
                Votre annonce sera visible par tous les tuteurs certifiés de votre zone. Ils pourront vous contacter directement via la messagerie.
              </p>
            </div>

            <div className="pt-6 flex flex-col gap-4">
              <button 
                type="submit" 
                className="w-full py-4 bg-[#4E567E] text-white rounded-2xl font-bold text-lg hover:bg-[#3a4261] transition-all shadow-lg"
              >
                Publier l'annonce
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/Dashboard')}
                className="w-full py-2 text-gray-500 font-medium hover:text-gray-700"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostRequest;