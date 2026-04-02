/**
 * Portfolio component - Catalogue de Tuteurs avec réception de filtres
 * Design harmonisé avec le composant Home
 */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

/**
 * Image de fond (à remplacer par votre propre image)
 */
import backgroundImage from "../images/portfolio-bg.jpg";

const imageAltText =
  "Étudiants travaillant ensemble, symbolisant la mise en relation avec des tuteurs";

// Constantes de style harmonisées
const COLORS = {
  primary: "#3498db",
  secondary: "#4E567E",
  textDark: "#2c3e50",
  textMedium: "#34495e",
  textLight: "#5d6d7e",
  backgroundLight: "rgba(255, 255, 255, 0.92)",
  stepBackground: "#D2F1E4",
  success: "#2ecc71",
  danger: "#e74c3c",
  grayLight: "#f8f9fa",
  grayBorder: "#e0e0e0",
  white: "#ffffff",
  yellow: "#f39c12",
};

// Liste des tuteurs (inchangée)
const tutorList = [
  {
    id: 1,
    name: "Sophie Martin",
    subjects: ["Mathématiques", "Physique"],
    levels: ["Collège", "Lycée"],
    distance: "1.2 km",
    rating: 4.8,
    reviews: 12,
    description:
      "Étudiante en Master de Physique, passionnée par la transmission des savoirs scientifiques.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Thomas Bernard",
    subjects: ["Français", "Histoire-Géo"],
    levels: ["Primaire", "Collège"],
    distance: "0.5 km",
    rating: 4.9,
    reviews: 8,
    description:
      "Spécialiste de la littérature, j'aide vos enfants à progresser en rédaction et méthodologie.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Léa Petit",
    subjects: ["Anglais", "Espagnol"],
    levels: ["Primaire", "Collège", "Lycée"],
    distance: "2.4 km",
    rating: 4.7,
    reviews: 15,
    description:
      "Bilingue avec une expérience de 2 ans en tutorat linguistique.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Lucas Simon",
    subjects: ["Mathématiques", "SVT"],
    levels: ["Collège"],
    distance: "1.8 km",
    rating: 4.6,
    reviews: 5,
    description:
      "Pédagogue et patient, j'accompagne les élèves en difficulté pour redonner confiance.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const Portfolio = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterLevel, setFilterLevel] = useState("");

  // Récupérer les filtres de l'assistant au montage
  useEffect(() => {
    if (location.state?.filters) {
      const { subject, level } = location.state.filters;
      if (subject) setFilterSubject(subject);

      // Conversion du niveau interne (middle -> Collège, etc.)
      if (level === "primary") setFilterLevel("Primaire");
      if (level === "middle") setFilterLevel("Collège");
      if (level === "high") setFilterLevel("Lycée");
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location]);

  const filteredTutors = tutorList.filter((tutor) => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subjects.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesSubject =
      filterSubject === "" || tutor.subjects.includes(filterSubject);
    const matchesLevel =
      filterLevel === "" || tutor.levels.includes(filterLevel);
    return matchesSearch && matchesSubject && matchesLevel;
  });

  return (
    <section
      id="portfolio"
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
      {/* Image de fond avec overlay */}
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
        />
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
        {/* Carte principale floutée */}
        <div
          style={{
            backgroundColor: COLORS.backgroundLight,
            backdropFilter: "blur(10px)",
            borderRadius: "clamp(20px, 4vw, 40px)",
            padding: "clamp(2rem, 4vw, 3rem)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {/* En-tête */}
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                fontWeight: "700",
                color: COLORS.textDark,
                marginBottom: "0.3rem",
              }}
            >
              {location.state?.filters
                ? "Résultats de votre recherche"
                : "Nos Tuteurs à Proximité"}
            </h1>
            <p
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                color: COLORS.textLight,
              }}
            >
              {location.state?.filters
                ? `Tuteurs disponibles en ${filterSubject} pour le niveau ${filterLevel}`
                : "Trouvez le tuteur idéal pour accompagner votre enfant dans sa réussite scolaire."}
            </p>
          </div>

          {/* Barre de filtres */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "1rem",
              marginBottom: "clamp(2rem, 4vh, 3rem)",
              padding: "clamp(1rem, 2vw, 1.5rem)",
              backgroundColor: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(5px)",
              borderRadius: "clamp(12px, 2vw, 16px)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <input
              type="text"
              placeholder="Rechercher par nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 2,
                padding: "clamp(0.6rem, 1.5vw, 0.8rem)",
                borderRadius: "clamp(8px, 1.5vw, 10px)",
                border: `2px solid ${COLORS.grayBorder}`,
                fontSize: "clamp(0.8rem, 2vw, 1rem)",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
              onBlur={(e) => (e.target.style.borderColor = COLORS.grayBorder)}
            />
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              style={{
                flex: 1,
                padding: "clamp(0.6rem, 1.5vw, 0.8rem)",
                borderRadius: "clamp(8px, 1.5vw, 10px)",
                border: `2px solid ${COLORS.grayBorder}`,
                backgroundColor: COLORS.white,
                fontSize: "clamp(0.8rem, 2vw, 1rem)",
                outline: "none",
              }}
            >
              <option value="">Toutes les matières</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Physique">Physique</option>
              <option value="Français">Français</option>
              <option value="Anglais">Anglais</option>
            </select>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              style={{
                flex: 1,
                padding: "clamp(0.6rem, 1.5vw, 0.8rem)",
                borderRadius: "clamp(8px, 1.5vw, 10px)",
                border: `2px solid ${COLORS.grayBorder}`,
                backgroundColor: COLORS.white,
                fontSize: "clamp(0.8rem, 2vw, 1rem)",
                outline: "none",
              }}
            >
              <option value="">Tous les niveaux</option>
              <option value="Primaire">Primaire</option>
              <option value="Collège">Collège</option>
              <option value="Lycée">Lycée</option>
            </select>
            {(filterSubject || filterLevel || searchTerm) && (
              <button
                onClick={() => {
                  setFilterSubject("");
                  setFilterLevel("");
                  setSearchTerm("");
                  navigate("/Portfolio", { replace: true, state: {} });
                }}
                style={{
                  padding: "clamp(0.5rem, 1.5vw, 0.7rem) clamp(1rem, 2vw, 1.5rem)",
                  background: "none",
                  border: "none",
                  color: COLORS.danger,
                  fontWeight: "700",
                  fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#c0392b")}
                onMouseLeave={(e) => (e.target.style.color = COLORS.danger)}
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* Grille des tuteurs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "clamp(1rem, 2vw, 1.5rem)",
            }}
          >
            {filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(16px, 3vw, 24px)",
                  padding: "clamp(1.2rem, 2vw, 1.5rem)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/ProjectView/${tutor.id}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 30px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.05)";
                }}
              >
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    style={{
                      width: "clamp(3rem, 8vw, 3.5rem)",
                      height: "clamp(3rem, 8vw, 3.5rem)",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: `2px solid ${COLORS.stepBackground}`,
                    }}
                  />
                  <div>
                    <h3
                      style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                        fontWeight: "700",
                        color: COLORS.textDark,
                        marginBottom: "0.2rem",
                      }}
                    >
                      {tutor.name}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ color: COLORS.yellow, fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>
                        {"★".repeat(Math.floor(tutor.rating))}
                      </span>
                      <span
                        style={{
                          fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                          color: COLORS.textLight,
                        }}
                      >
                        ({tutor.reviews} avis)
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.2rem" }}>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)", color: COLORS.primary }}
                      />
                      <span
                        style={{
                          fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                          color: COLORS.textLight,
                        }}
                      >
                        {tutor.distance}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.3rem",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {tutor.subjects.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                          backgroundColor: COLORS.stepBackground,
                          color: COLORS.secondary,
                          padding: "0.2rem 0.6rem",
                          borderRadius: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                      color: COLORS.primary,
                      fontWeight: "600",
                    }}
                  >
                    Niveaux : {tutor.levels.join(", ")}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                    color: COLORS.textLight,
                    lineHeight: 1.4,
                    margin: "0 0 1.2rem 0",
                    flexGrow: 1,
                  }}
                >
                  {tutor.description}
                </p>

                <button
                  style={{
                    width: "100%",
                    padding: "clamp(0.5rem, 1.5vw, 0.7rem)",
                    backgroundColor: COLORS.secondary,
                    color: COLORS.white,
                    border: "none",
                    borderRadius: "clamp(8px, 1.5vw, 10px)",
                    fontWeight: "700",
                    fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#3a4261")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = COLORS.secondary)}
                >
                  Voir le profil
                </button>
              </div>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredTutors.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem" }}>
              <p style={{ color: COLORS.textLight }}>
                Aucun tuteur ne correspond exactement à ces critères.
              </p>
              <button
                onClick={() => {
                  setFilterSubject("");
                  setFilterLevel("");
                  setSearchTerm("");
                  navigate("/Portfolio", { replace: true, state: {} });
                }}
                style={{
                  marginTop: "1rem",
                  color: COLORS.primary,
                  fontWeight: "700",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Voir tous les profils
              </button>
            </div>
          )}
        </div>

        {/* Flèche de scroll (optionnelle) */}
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

export default Portfolio;