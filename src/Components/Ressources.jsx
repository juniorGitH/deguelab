/**
 * Ressources component - Centre de Réussite & Orientation
 * Design harmonisé avec le composant Home
 */
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileSignature,
  faGraduationCap,
  faCompass,
  faFileInvoiceDollar,
  faSearch,
  faDownload,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Image de fond (à remplacer par votre propre image)
 */
import backgroundImage from "../images/study-resources.jpg"; // Assurez-vous que le chemin est correct

const imageAltText =
  "Étudiants consultant des documents et livres, symbolisant l'accès aux ressources éducatives";

const Ressources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const resources = [
    {
      id: 1,
      title: "Annales Corrigées : Brevet Maths 2025",
      description:
        "Le sujet officiel et son corrigé détaillé par nos meilleurs tuteurs.",
      category: "exams",
      type: "Annales",
      icon: faGraduationCap,
      premium: false,
    },
    {
      id: 2,
      title: "Guide Complet Parcoursup 2026",
      description:
        "Toutes les étapes et dates clés pour réussir son orientation post-bac.",
      category: "orientation",
      type: "Guide",
      icon: faCompass,
      premium: true,
    },
    {
      id: 3,
      title: "Modèle : Bilan de Progression Mensuel",
      description:
        "Le document que nos tuteurs utilisent pour vous rendre compte des progrès.",
      category: "tracking",
      type: "Outil",
      icon: faFileSignature,
      premium: false,
    },
    {
      id: 4,
      title: "Guide Crédit d'Impôt : -50% sur vos cours",
      description:
        "Comment bénéficier de la réduction d'impôt pour le soutien scolaire à domicile.",
      category: "admin",
      type: "Infos",
      icon: faFileInvoiceDollar,
      premium: false,
    },
    {
      id: 5,
      title: "Sujets de Philo : Annales Bac 2025",
      description:
        "Préparez l'épreuve de philosophie avec les sujets tombés l'an dernier.",
      category: "exams",
      type: "Annales",
      icon: faGraduationCap,
      premium: false,
    },
  ];

  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || res.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Couleurs par catégorie pour les filtres
  const categoryColors = {
    exams: "#3498db",
    orientation: "#9b59b6",
    tracking: "#2ecc71",
    admin: "#f39c12",
  };

  return (
    <section
      id="ressources"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
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
            Centre de Réussite & Orientation
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
            L'essentiel pour préparer les examens et l'avenir de vos enfants.
          </p>
        </div>

        {/* Filtres spécialisés - 4 catégories */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "clamp(1rem, 2vw, 1.5rem)",
            marginBottom: "clamp(2rem, 4vh, 3rem)",
          }}
        >
          {[
            { id: "exams", label: "Examens", sub: "Annales & Corrigés", icon: faGraduationCap },
            { id: "orientation", label: "Orientation", sub: "Parcoursup & Filières", icon: faCompass },
            { id: "tracking", label: "Suivi", sub: "Bilans & Progrès", icon: faFileSignature },
            { id: "admin", label: "Aides", sub: "Crédit d'impôt & Tarifs", icon: faFileInvoiceDollar },
          ].map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(10px)",
                borderRadius: "clamp(16px, 3vw, 24px)",
                padding: "clamp(1.2rem, 3vw, 1.8rem)",
                boxShadow:
                  activeCategory === cat.id
                    ? `0 15px 30px rgba(${parseInt(
                        categoryColors[cat.id].slice(1, 3),
                        16
                      )}, ${parseInt(
                        categoryColors[cat.id].slice(3, 5),
                        16
                      )}, ${parseInt(
                        categoryColors[cat.id].slice(5, 7),
                        16
                      )}, 0.2)`
                    : "0 5px 15px rgba(0,0,0,0.05)",
                border:
                  activeCategory === cat.id
                    ? `3px solid ${categoryColors[cat.id]}`
                    : "3px solid transparent",
                cursor: "pointer",
                transition: "all 0.3s ease",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(0,0,0,0.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat.id) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 5px 15px rgba(0,0,0,0.05)";
                }
              }}
            >
              <div
                style={{
                  width: "clamp(2.5rem, 6vw, 3.5rem)",
                  height: "clamp(2.5rem, 6vw, 3.5rem)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto clamp(0.8rem, 2vw, 1rem)",
                  backgroundColor: `${categoryColors[cat.id]}20`,
                  color: categoryColors[cat.id],
                }}
              >
                <FontAwesomeIcon
                  icon={cat.icon}
                  style={{ fontSize: "clamp(1.2rem, 3vw, 1.6rem)" }}
                />
              </div>
              <h3
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                  fontWeight: "700",
                  color: "#2c3e50",
                  marginBottom: "0.2rem",
                }}
              >
                {cat.label}
              </h3>
              <p
                style={{
                  fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                  color: "#7f8c8d",
                }}
              >
                {cat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Barre de recherche */}
        <div
          style={{
            position: "relative",
            marginBottom: "clamp(2rem, 4vh, 3rem)",
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              position: "absolute",
              left: "clamp(1.2rem, 3vw, 1.8rem)",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#b0bec5",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              zIndex: 4,
            }}
          />
          <input
            type="text"
            placeholder="Rechercher par sujet, année, matière..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "clamp(0.8rem, 2vw, 1rem) clamp(1rem, 3vw, 1.5rem) clamp(0.8rem, 2vw, 1rem) clamp(3rem, 5vw, 4rem)",
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(52, 152, 219, 0.2)",
              borderRadius: "clamp(30px, 5vw, 50px)",
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: "#2c3e50",
              outline: "none",
              transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#3498db";
              e.target.style.boxShadow = "0 5px 20px rgba(52,152,219,0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(52, 152, 219, 0.2)";
              e.target.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
            }}
          />
        </div>

        {/* Liste des ressources */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(1.5rem, 3vw, 2rem)",
          }}
        >
          {filteredResources.map((res) => (
            <div
              key={res.id}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(10px)",
                borderRadius: "clamp(20px, 4vw, 30px)",
                padding: "clamp(1.5rem, 3vw, 2rem)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "row",
                gap: "clamp(1rem, 2vw, 1.5rem)",
                alignItems: "flex-start",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div
                style={{
                  width: "clamp(3rem, 8vw, 4rem)",
                  height: "clamp(3rem, 8vw, 4rem)",
                  borderRadius: "16px",
                  backgroundColor: "#f8f9fa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4E567E",
                  fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                  transition: "background-color 0.3s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#D2F1E4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }}
              >
                <FontAwesomeIcon icon={res.icon} />
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.3rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#3498db",
                    }}
                  >
                    {res.type}
                  </span>
                  {res.premium && (
                    <span
                      style={{
                        backgroundColor: "#fff9e6",
                        color: "#f39c12",
                        fontSize: "clamp(0.5rem, 1.2vw, 0.6rem)",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "20px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.2rem",
                      }}
                    >
                      <FontAwesomeIcon icon={faStar} /> Premium
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                    fontWeight: "700",
                    color: "#2c3e50",
                    marginBottom: "0.5rem",
                    lineHeight: "1.3",
                  }}
                >
                  {res.title}
                </h3>

                <p
                  style={{
                    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                    color: "#5d6d7e",
                    lineHeight: "1.5",
                    marginBottom: "1rem",
                  }}
                >
                  {res.description}
                </p>

                <button
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "#4E567E",
                    fontWeight: "700",
                    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                    cursor: "pointer",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#3498db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#4E567E";
                  }}
                >
                  <FontAwesomeIcon icon={faDownload} />
                  Télécharger maintenant
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredResources.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "clamp(2rem, 8vh, 4rem)",
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(10px)",
              borderRadius: "clamp(20px, 4vw, 30px)",
              border: "2px dashed rgba(52, 152, 219, 0.3)",
              marginTop: "2rem",
            }}
          >
            <p style={{ color: "#7f8c8d", fontSize: "clamp(1rem, 2vw, 1.2rem)" }}>
              Aucun document trouvé pour cette recherche.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchTerm("");
              }}
              style={{
                marginTop: "1rem",
                background: "none",
                border: "none",
                color: "#3498db",
                fontWeight: "700",
                textDecoration: "underline",
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                cursor: "pointer",
              }}
            >
              Voir toutes les ressources
            </button>
          </div>
        )}

        {/* Optionnel : flèche de scroll comme dans Home */}
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

export default Ressources;