/**
 * TutorView component - Vue détaillée d'un tuteur
 * Design harmonisé avec le composant Home
 */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendarAlt,
  faUser,
  faStar,
  faMapMarkerAlt,
  faGraduationCap,
  faBook,
  faComments,
  faCheckCircle,
  faClock,
  faEnvelope,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Image de fond (à remplacer par votre propre image)
 */
import backgroundImage from "../images/tutor-bg.jpg";

const imageAltText =
  "Tuteur étudiant en pleine session, ambiance de travail";

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
  blueLight: "#e6f3ff",
  greenLight: "#e6f7e6",
};

const TutorView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Simulation de chargement des données tuteur
    setTimeout(() => {
      const mockTutors = [
        {
          id: 1,
          name: "Sophie Martin",
          subjects: ["Mathématiques", "Physique"],
          levels: ["Collège", "Lycée"],
          distance: "1.2 km",
          rating: 4.8,
          reviewsCount: 12,
          price: "15 000 FCFA/h",
          description:
            "Étudiante en Master de Physique à l'université de Technologie, je propose un accompagnement personnalisé pour aider vos enfants à surmonter leurs difficultés en sciences.",
          detailedBio:
            "Passionnée par l'enseignement depuis plusieurs années, j'utilise une méthode basée sur la compréhension des concepts fondamentaux plutôt que sur le simple apprentissage par cœur. Mon objectif est de redonner confiance à l'élève face aux matières scientifiques.",
          image: "https://randomuser.me/api/portraits/women/1.jpg",
          verified: true,
          availability: ["Lundi soir", "Mercredi après-midi", "Samedi matin"],
          reviews: [
            {
              id: 1,
              author: "Marie L.",
              rating: 5,
              comment:
                "Sophie est très patiente et explique très bien. Mon fils a progressé de 3 points en maths.",
              date: "12/02/2026",
            },
            {
              id: 2,
              author: "Jean P.",
              rating: 4,
              comment: "Excellente tuteure, ponctuelle et sérieuse.",
              date: "05/01/2026",
            },
          ],
        },
      ];

      const foundTutor = mockTutors.find((t) => t.id === parseInt(id)) || mockTutors[0];
      setTutor(foundTutor);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <section
        id="tutor-loading"
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
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "clamp(1rem, 5vw, 3rem)",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.backgroundLight,
              backdropFilter: "blur(10px)",
              borderRadius: "clamp(20px, 4vw, 40px)",
              padding: "clamp(2rem, 4vw, 3rem)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "clamp(3rem, 8vw, 4rem)",
                height: "clamp(3rem, 8vw, 4rem)",
                border: `4px solid ${COLORS.primary}`,
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="tutor-view"
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
          {/* Bouton retour */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "none",
              border: "none",
              color: COLORS.secondary,
              fontWeight: "600",
              fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
              cursor: "pointer",
              transition: "color 0.2s ease",
              marginBottom: "clamp(1.5rem, 3vh, 2rem)",
            }}
            onMouseEnter={(e) => (e.target.style.color = COLORS.primary)}
            onMouseLeave={(e) => (e.target.style.color = COLORS.secondary)}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Retour à la recherche
          </button>

          {/* Grille principale */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {/* Colonne gauche - Infos principales et onglets */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vh, 2rem)" }}>
              {/* Carte de présentation */}
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(20px, 3vw, 30px)",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "clamp(1rem, 2vw, 1.5rem)",
                    alignItems: "flex-start",
                  }}
                >
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    style={{
                      width: "clamp(5rem, 12vw, 6rem)",
                      height: "clamp(5rem, 12vw, 6rem)",
                      borderRadius: "clamp(12px, 2vw, 16px)",
                      objectFit: "cover",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      border: `3px solid ${COLORS.white}`,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <h1
                        style={{
                          fontSize: "clamp(1.5rem, 4vw, 2rem)",
                          fontWeight: "700",
                          color: COLORS.textDark,
                          marginBottom: "0.2rem",
                        }}
                      >
                        {tutor.name}
                      </h1>
                      {tutor.verified && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{ color: COLORS.primary, fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }}
                          title="Profil vérifié"
                        />
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                        color: COLORS.secondary,
                        fontWeight: "500",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Tuteur Étudiant
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "clamp(0.8rem, 2vw, 1.5rem)",
                        fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                        color: COLORS.textLight,
                        marginBottom: "1rem",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <FontAwesomeIcon icon={faStar} style={{ color: COLORS.yellow }} />
                        <strong>{tutor.rating}</strong> ({tutor.reviewsCount} avis)
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: COLORS.danger }} />
                        {tutor.distance}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {tutor.subjects.map((subject) => (
                        <span
                          key={subject}
                          style={{
                            fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                            backgroundColor: COLORS.stepBackground,
                            color: COLORS.secondary,
                            padding: "0.2rem 0.6rem",
                            borderRadius: "20px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Onglets */}
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(20px, 3vw, 30px)",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    borderBottom: `1px solid ${COLORS.grayBorder}`,
                  }}
                >
                  {["overview", "reviews", "availability"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        flex: 1,
                        padding: "clamp(0.8rem, 2vw, 1rem)",
                        background: "none",
                        border: "none",
                        borderBottom:
                          activeTab === tab
                            ? `3px solid ${COLORS.primary}`
                            : "3px solid transparent",
                        color: activeTab === tab ? COLORS.primary : COLORS.textLight,
                        fontWeight: "700",
                        fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        cursor: "pointer",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (activeTab !== tab) {
                          e.target.style.color = COLORS.textDark;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== tab) {
                          e.target.style.color = COLORS.textLight;
                        }
                      }}
                    >
                      {tab === "overview" && "À propos"}
                      {tab === "reviews" && "Avis Parents"}
                      {tab === "availability" && "Disponibilités"}
                    </button>
                  ))}
                </div>

                <div style={{ padding: "clamp(1.5rem, 3vw, 2rem)" }}>
                  {activeTab === "overview" && (
                    <div>
                      <h3
                        style={{
                          fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                          fontWeight: "700",
                          color: COLORS.textDark,
                          marginBottom: "0.8rem",
                        }}
                      >
                        Présentation
                      </h3>
                      <p
                        style={{
                          fontSize: "clamp(0.9rem, 2vw, 1rem)",
                          color: COLORS.textLight,
                          lineHeight: 1.6,
                          marginBottom: "1.5rem",
                        }}
                      >
                        {tutor.description}
                      </p>
                      <h3
                        style={{
                          fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                          fontWeight: "700",
                          color: COLORS.textDark,
                          marginBottom: "0.8rem",
                        }}
                      >
                        Mon parcours et ma méthode
                      </h3>
                      <p
                        style={{
                          fontSize: "clamp(0.9rem, 2vw, 1rem)",
                          color: COLORS.textLight,
                          lineHeight: 1.6,
                          marginBottom: "1.5rem",
                        }}
                      >
                        {tutor.detailedBio}
                      </p>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            padding: "1rem",
                            backgroundColor: COLORS.grayLight,
                            borderRadius: "clamp(12px, 2vw, 16px)",
                          }}
                        >
                          <h4
                            style={{
                              fontWeight: "700",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginBottom: "0.5rem",
                              color: COLORS.secondary,
                            }}
                          >
                            <FontAwesomeIcon icon={faGraduationCap} />
                            Niveaux enseignés
                          </h4>
                          <p style={{ color: COLORS.textLight }}>{tutor.levels.join(", ")}</p>
                        </div>
                        <div
                          style={{
                            padding: "1rem",
                            backgroundColor: COLORS.grayLight,
                            borderRadius: "clamp(12px, 2vw, 16px)",
                          }}
                        >
                          <h4
                            style={{
                              fontWeight: "700",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginBottom: "0.5rem",
                              color: COLORS.secondary,
                            }}
                          >
                            <FontAwesomeIcon icon={faBook} />
                            Matières
                          </h4>
                          <p style={{ color: COLORS.textLight }}>{tutor.subjects.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      {tutor.reviews.map((review) => (
                        <div
                          key={review.id}
                          style={{
                            padding: "1rem",
                            backgroundColor: COLORS.grayLight,
                            borderRadius: "clamp(12px, 2vw, 16px)",
                            border: `1px solid ${COLORS.grayBorder}`,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "0.5rem",
                            }}
                          >
                            <span style={{ fontWeight: "700", color: COLORS.textDark }}>
                              {review.author}
                            </span>
                            <span style={{ fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)", color: COLORS.textLight }}>
                              {review.date}
                            </span>
                          </div>
                          <div style={{ color: COLORS.yellow, fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", marginBottom: "0.5rem" }}>
                            {"★".repeat(review.rating)}
                          </div>
                          <p
                            style={{
                              fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                              color: COLORS.textLight,
                              fontStyle: "italic",
                            }}
                          >
                            "{review.comment}"
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "availability" && (
                    <div
                      style={{
                        backgroundColor: COLORS.blueLight,
                        padding: "clamp(1.5rem, 3vw, 2rem)",
                        borderRadius: "clamp(16px, 3vw, 24px)",
                        textAlign: "center",
                        border: `1px solid ${COLORS.primary}30`,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", color: COLORS.primary, marginBottom: "1rem" }}
                      />
                      <h4
                        style={{
                          fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                          fontWeight: "700",
                          color: COLORS.textDark,
                          marginBottom: "1rem",
                        }}
                      >
                        Créneaux habituels
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "center",
                          gap: "0.8rem",
                        }}
                      >
                        {tutor.availability.map((slot) => (
                          <span
                            key={slot}
                            style={{
                              padding: "0.5rem 1rem",
                              backgroundColor: COLORS.white,
                              borderRadius: "30px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                              fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                              fontWeight: "600",
                              color: COLORS.textDark,
                            }}
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Colonne droite - Carte de réservation */}
            <div style={{ position: "sticky", top: "clamp(5rem, 10vh, 6rem)" }}>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(20px, 3vw, 30px)",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <p style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", color: COLORS.textLight, marginBottom: "0.3rem" }}>
                    Tarif horaire
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(2rem, 5vw, 2.5rem)",
                      fontWeight: "800",
                      color: COLORS.secondary,
                    }}
                  >
                    {tutor.price}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "clamp(0.8rem, 2vw, 1rem)",
                      backgroundColor: COLORS.primary,
                      color: COLORS.white,
                      border: "none",
                      borderRadius: "clamp(30px, 5vw, 40px)",
                      fontWeight: "700",
                      fontSize: "clamp(1rem, 2vw, 1.2rem)",
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                      boxShadow: "0 10px 20px rgba(52,152,219,0.3)",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#2980b9")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = COLORS.primary)}
                  >
                    Réserver un cours
                  </button>
                  <button
                    style={{
                      width: "100%",
                      padding: "clamp(0.7rem, 1.8vw, 0.9rem)",
                      backgroundColor: "transparent",
                      color: COLORS.secondary,
                      border: `2px solid ${COLORS.secondary}`,
                      borderRadius: "clamp(30px, 5vw, 40px)",
                      fontWeight: "700",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = COLORS.secondary;
                      e.target.style.color = COLORS.white;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = COLORS.secondary;
                    }}
                  >
                    <FontAwesomeIcon icon={faComments} style={{ marginRight: "0.5rem" }} />
                    Contacter {tutor.name.split(" ")[0]}
                  </button>
                </div>
                <div
                  style={{
                    paddingTop: "1.5rem",
                    borderTop: `1px solid ${COLORS.grayBorder}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", color: COLORS.textLight }}>
                    <FontAwesomeIcon icon={faShieldAlt} style={{ color: COLORS.success }} />
                    <span>Paiement sécurisé via EduConnect</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default TutorView;