/**
 * SubscriptionPage component - Gestion des abonnements
 * Design harmonisé avec le composant Home
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faGraduationCap,
  faUsers,
  faCrown,
  faMapMarkerAlt
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

/**
 * Image de fond (à remplacer par votre propre image)
 */
import backgroundImage from "../images/education-bg.jpg"; // Assurez-vous que le chemin est correct

const imageAltText =
  "Étudiants travaillant ensemble, symbolisant l'entraide scolaire et le tutorat";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: "single",
      title: "Matière Unique",
      price: "32 000 FCFA",
      period: "/mois",
      description:
        "Idéal pour un renforcement ciblé sur une difficulté précise.",
      features: [
        "1 matière au choix",
        "Accès au catalogue tuteurs",
        "Mise en relation directe",
        "Suivi de progression par SMS",
        "Annulation flexible",
      ],
      color: "#4E567E",
      icon: faGraduationCap,
    },
    {
      id: "multi",
      title: "Multi-Matières",
      price: "58 000 FCFA",
      period: "/mois",
      description:
        "Pour un accompagnement complet sur tout le programme.",
      features: [
        "Toutes les matières incluses",
        "Jusqu'à 3 tuteurs différents",
        "Planning partagé",
        "Tableau de bord détaillé",
        "Support prioritaire",
      ],
      color: "#3498db",
      icon: faUsers,
      recommended: true,
    },
    {
      id: "premium",
      title: "Pack Tuteur Dédié",
      price: "85 000 FCFA",
      period: "/mois",
      description:
        "Un tuteur unique qui gère l'ensemble des besoins de l'enfant.",
      features: [
        "1 tuteur expert polyvalent",
        "Coaching méthodologique",
        "Aide aux devoirs quotidienne",
        "Conciergerie éducative",
        "Garantie satisfaction",
      ],
      color: "#9b59b6",
      icon: faCrown,
    },
  ];

  return (
    <section
      id="subscription"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "clamp(1rem, 5vw, 3rem) 0",
      }}
    >
      {/* Image de fond (uniquement en haut, comme dans Home) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(40vh, 50vh, 60vh)",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <img
          src={backgroundImage}
          alt={imageAltText}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            filter: "brightness(0.85)",
          }}
        />
        {/* Overlay dégradé */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background:
              "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.9) 70%)",
            zIndex: 2,
          }}
        ></div>
      </div>

      {/* Contenu principal */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(1rem, 5vw, 3rem)",
          boxSizing: "border-box",
        }}
      >
        {/* Titre principal avec carte floutée */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            borderRadius: "clamp(12px, 2vw, 20px)",
            padding: "clamp(1.5rem, 4vw, 3rem)",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            maxWidth: "800px",
            margin: "0 auto clamp(3rem, 6vh, 5rem)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              marginBottom: "clamp(0.8rem, 2vw, 1.5rem)",
              color: "#2c3e50",
              fontWeight: "700",
              lineHeight: "1.2",
            }}
          >
            Nos Forfaits d'Accompagnement
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              color: "#5d6d7e",
              lineHeight: "1.6",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Choisissez la formule qui correspond le mieux aux besoins de votre
            enfant et trouvez le tuteur idéal à proximité.
          </p>
        </div>

        {/* Grille des forfaits */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
            marginBottom: "clamp(3rem, 8vh, 6rem)",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              style={{
                position: "relative",
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(10px)",
                borderRadius: "clamp(16px, 3vw, 24px)",
                padding: "clamp(1.5rem, 3vw, 2.5rem)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                transform:
                  selectedPlan === plan.id ? "translateY(-8px)" : "none",
                border: selectedPlan === plan.id
                  ? `3px solid ${plan.color}`
                  : "3px solid transparent",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {plan.recommended && (
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(0.8rem, 2vw, 1.2rem)",
                    right: "clamp(0.8rem, 2vw, 1.2rem)",
                    backgroundColor: "#3498db",
                    color: "white",
                    padding: "0.3rem 1rem",
                    borderRadius: "20px",
                    fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Recommandé
                </div>
              )}

              <div
                style={{
                  width: "clamp(3rem, 8vw, 4rem)",
                  height: "clamp(3rem, 8vw, 4rem)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "clamp(1rem, 2vw, 1.5rem)",
                  backgroundColor: `${plan.color}20`,
                  color: plan.color,
                }}
              >
                <FontAwesomeIcon
                  icon={plan.icon}
                  style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)" }}
                />
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                  fontWeight: "700",
                  color: "#2c3e50",
                  marginBottom: "0.5rem",
                }}
              >
                {plan.title}
              </h3>

              <div style={{ display: "flex", alignItems: "baseline", marginBottom: "1rem" }}>
                <span
                  style={{
                    fontSize: "clamp(2rem, 5vw, 2.8rem)",
                    fontWeight: "800",
                    color: "#2c3e50",
                  }}
                >
                  {plan.price}
                </span>
                <span style={{ color: "#7f8c8d", marginLeft: "0.25rem" }}>
                  {plan.period}
                </span>
              </div>

              <p
                style={{
                  color: "#5d6d7e",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  lineHeight: "1.5",
                  marginBottom: "1.5rem",
                }}
              >
                {plan.description}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem 0", flex: 1 }}>
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      marginBottom: "0.8rem",
                    }}
                  >
                    <div
                      style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        borderRadius: "50%",
                        backgroundColor: "#e8f5e9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "0.1rem",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                        style={{ color: "#2ecc71", fontSize: "0.7rem" }}
                      />
                    </div>
                    <span style={{ color: "#34495e", fontSize: "clamp(0.85rem, 1.8vw, 0.95rem)" }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                style={{
                  width: "100%",
                  padding: "clamp(0.8rem, 2vw, 1rem) clamp(1rem, 2.5vw, 1.5rem)",
                  backgroundColor: plan.recommended ? "#3498db" : "transparent",
                  color: plan.recommended ? "white" : "#34495e",
                  border: plan.recommended
                    ? "none"
                    : `2px solid ${plan.color}`,
                  borderRadius: "40px",
                  fontWeight: "700",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  marginTop: "auto",
                }}
                onMouseEnter={(e) => {
                  if (!plan.recommended) {
                    e.target.style.backgroundColor = plan.color;
                    e.target.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.recommended) {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#34495e";
                  }
                }}
              >
                Choisir ce forfait
              </button>
            </div>
          ))}
        </div>

        {/* Bloc "Tuteurs disponibles dans votre quartier" */}
        <div
          style={{
            backgroundColor: "#D2F1E4",
            borderRadius: "clamp(20px, 4vw, 40px)",
            padding: "clamp(2rem, 5vw, 3.5rem)",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div style={{ maxWidth: "600px" }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                fontWeight: "700",
                color: "#4E567E",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
              }}
            >
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              Tuteurs disponibles dans votre quartier
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                color: "#4E567E",
                opacity: 0.9,
                lineHeight: "1.6",
              }}
            >
              Tous nos tuteurs sont des étudiants rigoureusement sélectionnés
              résidant à moins de 5 km de chez vous.
            </p>
          </div>
          <button
            onClick={() => navigate("/Portfolio")}
            style={{
              padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)",
              backgroundColor: "#4E567E",
              color: "white",
              border: "none",
              borderRadius: "40px",
              fontWeight: "700",
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              whiteSpace: "nowrap",
              boxShadow: "0 10px 20px rgba(78, 86, 126, 0.3)",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#3a4261")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4E567E")}
          >
            Voir les tuteurs autour de moi
          </button>
        </div>

        {/* Flèche de scroll (optionnelle, inspirée de Home) */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(1.5rem, 4vh, 2.5rem)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 4,
            animation: "bounce 2s infinite",
          }}
        >
          <a href="#footer" aria-label="Aller en bas de page">
            {/* Vous pouvez réutiliser votre flèche SVG ici */}
            <div
              style={{
                width: "clamp(2rem, 5vw, 3rem)",
                height: "clamp(2rem, 5vw, 3rem)",
                border: "2px solid #4E567E",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4E567E",
                fontSize: "1.5rem",
                opacity: 0.7,
              }}
            >
              ↓
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

SubscriptionPage.propTypes = {
  // Aucune prop requise pour l'instant
};

export default SubscriptionPage;