/**
 * Dashboard component - Tableau de bord Parent / Tuteur
 * Design harmonisé avec le composant Home
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faUserGraduate,
  faCreditCard,
  faStar,
  faClock,
  faPlus,
  faBookOpen,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Image de fond (à remplacer par votre propre image)
 */
import backgroundImage from "../images/dashboard-bg.jpg"; // Assurez-vous que le chemin est correct

const imageAltText =
  "Tableau de bord avec aperçu des sessions et statistiques";

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
  dangerLight: "#fdedec",
  grayLight: "#f8f9fa",
  grayBorder: "#e0e0e0",
  white: "#ffffff",
  yellow: "#f1c40f",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) {
      navigate("/");
      return;
    }

    const user = JSON.parse(savedUser);
    setCurrentUser(user);

    // Simulation de données selon le rôle
    const mockSessions = [
      {
        id: 1,
        topic: "Mathématiques - Algèbre",
        date: "2026-02-22",
        time: "14:00",
        partner:
          user.userType === "tutor" ? "Élève: Lucas" : "Tuteur: Sophie",
        status: "confirmed",
      },
      {
        id: 2,
        topic: "Physique - Optique",
        date: "2026-02-24",
        time: "16:30",
        partner:
          user.userType === "tutor" ? "Élève: Emma" : "Tuteur: Sophie",
        status: "pending",
      },
    ];
    setSessions(mockSessions);
  }, [navigate]);

  if (!currentUser) return null;

  const isTutor = currentUser.userType === "tutor";

  return (
    <section
      id="dashboard"
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
      {/* Image de fond avec overlay (comme dans Home) */}
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
          {/* En-tête du dashboard */}
          <div
            style={{
              marginBottom: "clamp(2rem, 4vh, 3rem)",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                fontWeight: "700",
                color: COLORS.textDark,
                marginBottom: "0.3rem",
              }}
            >
              Tableau de Bord {isTutor ? "Tuteur" : "Parent"}
            </h1>
            <p
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                color: COLORS.textLight,
              }}
            >
              Bienvenue, {currentUser.name}. Gérez vos sessions de tutorat ici.
            </p>
          </div>

          {/* Grille des statistiques */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "clamp(1rem, 2vw, 1.5rem)",
              marginBottom: "clamp(2rem, 4vh, 3rem)",
            }}
          >
            {[
              {
                icon: faCalendarCheck,
                color: COLORS.primary,
                label: "Sessions à venir",
                value: "3",
              },
              {
                icon: isTutor ? faUserGraduate : faBookOpen,
                color: COLORS.success,
                label: isTutor ? "Élèves suivis" : "Matières suivies",
                value: "2",
              },
              {
                icon: isTutor ? faWallet : faCreditCard,
                color: COLORS.secondary,
                label: isTutor ? "Gains du mois" : "Abonnement",
                value: isTutor ? "82 000 FCFA" : "Premium",
              },
              {
                icon: faStar,
                color: COLORS.yellow,
                label: "Note moyenne",
                value: "4.9",
              },
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(16px, 3vw, 24px)",
                  padding: "clamp(1.2rem, 2vw, 1.5rem)",
                  textAlign: "center",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.03)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <FontAwesomeIcon
                  icon={stat.icon}
                  style={{
                    color: stat.color,
                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    marginBottom: "0.5rem",
                  }}
                />
                <p
                  style={{
                    fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                    color: COLORS.textLight,
                    marginBottom: "0.3rem",
                    fontWeight: "500",
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    fontWeight: "700",
                    color: COLORS.textDark,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Section des sessions (avec onglets) */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(5px)",
              borderRadius: "clamp(20px, 4vw, 30px)",
              overflow: "hidden",
              marginBottom: "clamp(2rem, 4vh, 3rem)",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            {/* Navigation par onglets */}
            <div
              style={{
                display: "flex",
                borderBottom: `1px solid ${COLORS.grayBorder}`,
              }}
            >
              {["upcoming", "history"].map((tab) => (
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
                    transition: "all 0.2s ease",
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
                  {tab === "upcoming" ? "Prochaines Sessions" : "Historique"}
                </button>
              ))}
            </div>

            {/* Liste des sessions */}
            <div style={{ padding: "clamp(1.5rem, 3vw, 2rem)" }}>
              {sessions.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {sessions.map((session) => (
                    <div
                      key={session.id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "clamp(1rem, 2vw, 1.2rem)",
                        backgroundColor: COLORS.grayLight,
                        borderRadius: "clamp(12px, 2vw, 16px)",
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f0f0f0")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = COLORS.grayLight)
                      }
                    >
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <div
                          style={{
                            width: "clamp(2.5rem, 6vw, 3rem)",
                            height: "clamp(2.5rem, 6vw, 3rem)",
                            backgroundColor: COLORS.stepBackground,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: COLORS.secondary,
                            fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                          }}
                        >
                          <FontAwesomeIcon icon={faClock} />
                        </div>
                        <div>
                          <h4
                            style={{
                              fontSize: "clamp(1rem, 2vw, 1.1rem)",
                              fontWeight: "700",
                              color: COLORS.textDark,
                              marginBottom: "0.2rem",
                            }}
                          >
                            {session.topic}
                          </h4>
                          <p
                            style={{
                              fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                              color: COLORS.textLight,
                            }}
                          >
                            {session.partner} • {session.date} à {session.time}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          flexWrap: "wrap",
                          marginTop: "0.5rem",
                        }}
                      >
                        <button
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: COLORS.white,
                            border: `1px solid ${COLORS.grayBorder}`,
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                            color: COLORS.textMedium,
                            cursor: "pointer",
                            transition: "background 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#f0f0f0")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = COLORS.white)
                          }
                        >
                          Modifier
                        </button>
                        {!isTutor && session.status === "confirmed" && (
                          <button
                            onClick={() =>
                              navigate(`/TutorTracking/${session.id}`)
                            }
                            style={{
                              padding: "0.5rem 1rem",
                              backgroundColor: COLORS.success,
                              border: "none",
                              borderRadius: "8px",
                              fontWeight: "600",
                              fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                              color: COLORS.white,
                              cursor: "pointer",
                              transition: "background 0.2s ease",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.backgroundColor = "#27ae60")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.backgroundColor = COLORS.success)
                            }
                          >
                            Suivre l'arrivée
                          </button>
                        )}
                        <button
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: COLORS.primary,
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "600",
                            fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                            color: COLORS.white,
                            cursor: "pointer",
                            transition: "background 0.2s ease",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = "#2980b9")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = COLORS.primary)
                          }
                        >
                          Rejoindre
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  <p style={{ color: COLORS.textLight }}>
                    Aucune session prévue.
                  </p>
                  {!isTutor && (
                    <button
                      onClick={() => navigate("/Portfolio")}
                      style={{
                        marginTop: "1rem",
                        padding: "0.5rem 1.5rem",
                        backgroundColor: COLORS.primary,
                        color: COLORS.white,
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "700",
                        cursor: "pointer",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#2980b9")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = COLORS.primary)
                      }
                    >
                      Trouver un tuteur
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions rapides */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "clamp(1rem, 2vw, 1.5rem)",
            }}
          >
            {/* Carte violette */}
            <div
              style={{
                backgroundColor: COLORS.secondary,
                borderRadius: "clamp(20px, 4vw, 30px)",
                padding: "clamp(1.5rem, 3vw, 2rem)",
                color: COLORS.white,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                  }}
                >
                  Besoin d'un nouveau cours ?
                </h3>
                <p
                  style={{
                    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                    opacity: 0.9,
                    marginBottom: "1.5rem",
                  }}
                >
                  Parcourez nos tuteurs disponibles immédiatement dans votre
                  ville.
                </p>
                <button
                  onClick={() => navigate("/Portfolio")}
                  style={{
                    padding: "0.7rem 1.5rem",
                    backgroundColor: COLORS.stepBackground,
                    color: COLORS.secondary,
                    border: "none",
                    borderRadius: "clamp(20px, 3vw, 30px)",
                    fontWeight: "700",
                    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#3a4261")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = COLORS.secondary)
                  }
                >
                  Rechercher un tuteur
                </button>
              </div>
            </div>

            {/* Carte avec bordure pointillée */}
            <div
              onClick={() => navigate("/ScheduleMentoring")}
              style={{
                backgroundColor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(5px)",
                borderRadius: "clamp(20px, 4vw, 30px)",
                padding: "clamp(1.5rem, 3vw, 2rem)",
                border: `2px dashed ${COLORS.grayBorder}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS.primary)}
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = COLORS.grayBorder)
              }
            >
              <div
                style={{
                  width: "clamp(2.5rem, 6vw, 3rem)",
                  height: "clamp(2.5rem, 6vw, 3rem)",
                  backgroundColor: COLORS.grayLight,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: COLORS.textLight,
                  fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                  marginBottom: "1rem",
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <h3
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                  fontWeight: "700",
                  color: COLORS.textDark,
                  marginBottom: "0.3rem",
                }}
              >
                Planifier une session
              </h3>
              <p
                style={{
                  fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
                  color: COLORS.textLight,
                }}
              >
                Ajoutez manuellement un créneau avec votre tuteur habituel.
              </p>
            </div>
          </div>
        </div>

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

export default Dashboard;