/**
 * RequestDetail component - Vue détaillée d'une annonce parent pour les tuteurs
 */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMapMarkerAlt, faCalendarAlt, faClock, faUser } from "@fortawesome/free-solid-svg-icons";

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const found = savedProjects.find(p => p.id === parseInt(id));
    setRequest(found);
  }, [id]);

  if (!request) return <div className="pt-24 text-center">Annonce non trouvée</div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-[#4E567E] font-bold">
          <FontAwesomeIcon icon={faArrowLeft} /> Retour aux annonces
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="flex justify-between items-start mb-8">
            <div>
              <span className="px-4 py-1 bg-[#D2F1E4] text-[#4E567E] text-xs font-bold uppercase rounded-full">
                {request.subject}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-4">{request.title}</h1>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#3498db]">{request.budget} FCFA/h</p>
              <p className="text-xs text-gray-400">Budget proposé</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 pb-10 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#3498db]">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Élève</p>
                <p className="text-sm font-bold">{request.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-400">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Lieu</p>
                <p className="text-sm font-bold">{request.type === 'home' ? 'À domicile' : 'En ligne'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Fréquence</p>
                <p className="text-sm font-bold">1 session / semaine</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#4E567E]">Description du besoin</h3>
            <p className="text-gray-600 leading-relaxed">{request.description}</p>
          </div>

          <div className="mt-12 p-8 bg-gray-50 rounded-3xl border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-2">Prêt à aider cet élève ?</h4>
            <p className="text-sm text-gray-500 mb-6">En postulant, le parent recevra votre profil et pourra vous contacter pour un premier échange.</p>
            <button className="w-full py-4 bg-[#4E567E] text-white font-bold rounded-2xl hover:bg-[#3a4261] transition-all">
              Proposer mes services de tuteur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;