/**
 * RequestsList component - Liste des demandes de cours déposées par les parents
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt, faBook, faUserGraduate } from "@fortawesome/free-solid-svg-icons";

const RequestsList = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    setRequests(savedProjects);
  }, []);

  const filteredRequests = requests.filter(req => 
    req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#4E567E]">Annonces des Parents</h1>
            <p className="text-gray-500">Trouvez une mission de tutorat proche de chez vous.</p>
          </div>
          <div className="relative w-full md:w-96">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher une matière..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#3498db] shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map(req => (
            <div key={req.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-[#D2F1E4] text-[#4E567E] text-[10px] font-bold uppercase rounded-full">
                  {req.subject || "Multi-matières"}
                </span>
                <span className="text-xs text-gray-400">Il y a 2h</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{req.title}</h3>
              <p className="text-sm text-gray-600 mb-6 line-clamp-3">{req.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FontAwesomeIcon icon={faUserGraduate} className="w-4 text-[#3498db]" />
                  <span>Niveau : {req.level || "Non précisé"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 text-red-400" />
                  <span>{req.address || "À proximité"}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/ProjectView/${req.id}`)}
                className="w-full py-3 bg-[#4E567E] text-white font-bold rounded-xl hover:bg-[#3a4261] transition-all"
              >
                Postuler à l'offre
              </button>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400">Aucune annonce ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsList;