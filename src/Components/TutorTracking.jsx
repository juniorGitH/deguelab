/**
 * TutorTracking component - Suivi en temps réel avec simulation de mouvement sur Google Maps
 * Design harmonisé avec le composant Home
 */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faWalking,
  faClock,
  faMapMarkerAlt,
  faPhone,
  faMessage,
  faShieldAlt,
  faLocationArrow,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Image de fond (à remplacer par votre propre image)
 */
import backgroundImage from "../images/tracking-bg.jpg"; // Assurez-vous que le chemin est correct

const imageAltText =
  "Carte de suivi en temps réel avec position du tuteur";

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
  mapBackground: "#e5e3df",
};

const TutorTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eta, setEta] = useState(8); // Temps estimé en minutes
  const [progress, setProgress] = useState(0); // Progression du trajet en %
  const [tutorPos, setTutorPos] = useState({ top: 70, left: 20 }); // Position initiale sur la carte

  // Simulation du mouvement fluide du tuteur vers le domicile (centre de la carte)
  useEffect(() => {
    const targetPos = { top: 50, left: 50 };
    const startPos = { top: 70, left: 20 };

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 0.5;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setEta(0);
          return 100;
        }

        // Calculer la nouvelle position
        const currentTop = startPos.top + (targetPos.top - startPos.top) * (nextProgress / 100);
        const currentLeft = startPos.left + (targetPos.left - startPos.left) * (nextProgress / 100);

        setTutorPos({ top: currentTop, left: currentLeft });
        setEta(Math.max(1, Math.round(8 * (1 - nextProgress / 100))));

        return nextProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="tutor-tracking"
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
          {/* Barre de navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "clamp(1.5rem, 3vh, 2rem)",
            }}
          >
            <button
              onClick={() => navigate(-1)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "none",
                border: "none",
                color: COLORS.secondary,
                fontWeight: "700",
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                cursor: "pointer",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = COLORS.primary)}
              onMouseLeave={(e) => (e.target.style.color = COLORS.secondary)}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Retour
            </button>
            <div
              style={{
                backgroundColor: COLORS.stepBackground,
                color: COLORS.secondary,
                padding: "0.3rem 1rem",
                borderRadius: "30px",
                fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                animation: "pulse 2s infinite",
              }}
            >
              Suivi en direct
            </div>
          </div>

          {/* Grille principale */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {/* Colonne gauche - Carte */}
            <div
              style={{
                position: "relative",
                height: "clamp(400px, 60vh, 600px)",
                backgroundColor: COLORS.mapBackground,
                borderRadius: "clamp(30px, 5vw, 50px)",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                border: "8px solid white",
              }}
            >
              {/* Iframe Google Maps (fond réaliste) */}
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src="https://maps.google.com/maps?width=100%25&height=600&hl=fr&q=Lomé,Togo+(EduConnect)&t=m&z=14&ie=UTF8&iwloc=B&output=embed"
                style={{
                  filter: "contrast(1.1) brightness(0.9)",
                  pointerEvents: "none",
                }}
                title="Google Map Tracking"
              />

              {/* SVG pour la ligne de trajet */}
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                <line
                  x1="20%"
                  y1="70%"
                  x2="50%"
                  y2="50%"
                  stroke={COLORS.primary}
                  strokeWidth="4"
                  strokeDasharray="8,8"
                  style={{ opacity: 0.4 }}
                />
              </svg>

              {/* Marker destination (domicile) */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: COLORS.danger,
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                }}
              >
                <div style={{ position: "relative" }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <div
                    style={{
                      position: "absolute",
                      top: "-2.5rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "white",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(0,0,0,0.05)",
                      fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
                      fontWeight: "800",
                      color: COLORS.textDark,
                      whiteSpace: "nowrap",
                    }}
                  >
                    VOTRE DOMICILE
                  </div>
                </div>
              </div>

              {/* Marker tuteur (mobile) */}
              <div
                style={{
                  position: "absolute",
                  top: `${tutorPos.top}%`,
                  left: `${tutorPos.left}%`,
                  transition: "all 1s ease-linear",
                }}
              >
                <div style={{ position: "relative" }}>
                  {/* Aura de mouvement */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: COLORS.primary,
                      borderRadius: "50%",
                      transform: "scale(2.5)",
                      opacity: 0.2,
                      animation: "ping 1s infinite",
                    }}
                  ></div>

                  <div
                    style={{
                      width: "clamp(2.5rem, 6vw, 3rem)",
                      height: "clamp(2.5rem, 6vw, 3rem)",
                      backgroundColor: COLORS.primary,
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                      border: "2px solid white",
                      transform: "rotate(-45deg)",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ transform: "rotate(45deg)" }}>
                      <FontAwesomeIcon icon={faLocationArrow} style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)" }} />
                    </div>
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "-3rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: COLORS.secondary,
                      color: "white",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "12px",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                      fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
                      fontWeight: "700",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      border: `1px solid ${COLORS.primary}`,
                    }}
                  >
                    <img
                      src="https://randomuser.me/api/portraits/women/1.jpg"
                      style={{
                        width: "clamp(0.8rem, 2vw, 1rem)",
                        height: "clamp(0.8rem, 2vw, 1rem)",
                        borderRadius: "50%",
                      }}
                      alt="mini"
                    />
                    Sophie est en route
                  </div>
                </div>
              </div>

              {/* Boutons de contrôle de la carte */}
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <button
                  style={{
                    width: "clamp(2rem, 5vw, 2.5rem)",
                    height: "clamp(2rem, 5vw, 2.5rem)",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    color: COLORS.textMedium,
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
                >
                  +
                </button>
                <button
                  style={{
                    width: "clamp(2rem, 5vw, 2.5rem)",
                    height: "clamp(2rem, 5vw, 2.5rem)",
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    color: COLORS.textMedium,
                    border: "none",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
                >
                  -
                </button>
              </div>

              {/* Bannière ETA flottante */}
              <div
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "90%",
                  maxWidth: "600px",
                  backgroundColor: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  padding: "clamp(1rem, 2vw, 1.5rem)",
                  borderRadius: "clamp(30px, 5vw, 50px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(1rem, 2vw, 1.5rem)",
                  flexWrap: "wrap",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: "clamp(2.5rem, 6vw, 3rem)",
                      height: "clamp(2.5rem, 6vw, 3rem)",
                      backgroundColor: COLORS.stepBackground,
                      borderRadius: "16px",
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
                    <p
                      style={{
                        fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
                        color: COLORS.textLight,
                        fontWeight: "800",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Arrivée estimée
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                        fontWeight: "900",
                        color: COLORS.textDark,
                      }}
                    >
                      {eta > 0 ? `${eta} min` : "Le tuteur est arrivé !"}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    height: "2rem",
                    width: "1px",
                    backgroundColor: COLORS.grayBorder,
                    display: eta > 0 ? "block" : "none",
                  }}
                ></div>

                {eta > 0 && (
                  <div style={{ display: eta > 0 ? "block" : "none" }}>
                    <p
                      style={{
                        fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
                        color: COLORS.textLight,
                        fontWeight: "800",
                        textTransform: "uppercase",
                      }}
                    >
                      Distance
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
                        fontWeight: "700",
                        color: COLORS.textMedium,
                      }}
                    >
                      1.2 km
                    </p>
                  </div>
                )}

                <button
                  style={{
                    marginLeft: "auto",
                    backgroundColor: COLORS.secondary,
                    color: "white",
                    border: "none",
                    padding: "0.8rem 1.5rem",
                    borderRadius: "clamp(20px, 3vw, 30px)",
                    fontWeight: "700",
                    fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#3a4261")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = COLORS.secondary)}
                >
                  Signaler un problème
                </button>
              </div>
            </div>

            {/* Colonne droite - Infos & actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vh, 2rem)" }}>
              {/* Carte tuteur */}
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(30px, 5vw, 50px)",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "8rem",
                    height: "8rem",
                    backgroundColor: COLORS.stepBackground,
                    borderBottomLeftRadius: "100%",
                    opacity: 0.5,
                    transform: "translate(2rem, -2rem)",
                  }}
                ></div>
                <div style={{ position: "relative", textAlign: "center", marginBottom: "2rem" }}>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img
                      src="https://randomuser.me/api/portraits/women/1.jpg"
                      alt="Tuteur"
                      style={{
                        width: "clamp(4rem, 10vw, 5rem)",
                        height: "clamp(4rem, 10vw, 5rem)",
                        borderRadius: "20px",
                        objectFit: "cover",
                        border: "4px solid white",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-0.5rem",
                        right: "-0.5rem",
                        backgroundColor: "#f1c40f",
                        color: "white",
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "3px solid white",
                        fontSize: "0.8rem",
                      }}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                      fontWeight: "900",
                      color: COLORS.textDark,
                      marginTop: "0.8rem",
                    }}
                  >
                    Sophie Martin
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                      fontWeight: "700",
                      color: COLORS.primary,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Tuteure Certifiée
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    style={{
                      padding: "1rem",
                      backgroundColor: COLORS.primary,
                      color: "white",
                      border: "none",
                      borderRadius: "16px",
                      fontWeight: "700",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.3rem",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                      boxShadow: "0 10px 20px rgba(52,152,219,0.2)",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#2980b9")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = COLORS.primary)}
                  >
                    <FontAwesomeIcon icon={faPhone} style={{ fontSize: "1.2rem" }} />
                    <span style={{ fontSize: "0.6rem", textTransform: "uppercase" }}>Appeler</span>
                  </button>
                  <button
                    style={{
                      padding: "1rem",
                      backgroundColor: "white",
                      color: COLORS.textMedium,
                      border: `2px solid ${COLORS.grayBorder}`,
                      borderRadius: "16px",
                      fontWeight: "700",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.3rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = COLORS.grayLight;
                      e.target.style.borderColor = COLORS.secondary;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "white";
                      e.target.style.borderColor = COLORS.grayBorder;
                    }}
                  >
                    <FontAwesomeIcon icon={faMessage} style={{ fontSize: "1.2rem", color: COLORS.secondary }} />
                    <span style={{ fontSize: "0.6rem", textTransform: "uppercase" }}>Message</span>
                  </button>
                </div>
              </div>

              {/* Carte sécurité */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${COLORS.secondary} 0%, #3a4261 100%)`,
                  borderRadius: "clamp(30px, 5vw, 50px)",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                }}
              >
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  style={{
                    position: "absolute",
                    right: "-1rem",
                    bottom: "-1rem",
                    fontSize: "8rem",
                    opacity: 0.1,
                    transform: "rotate(12deg)",
                  }}
                />
                <div style={{ display: "flex", gap: "1rem", position: "relative" }}>
                  <div
                    style={{
                      width: "clamp(2.5rem, 6vw, 3rem)",
                      height: "clamp(2.5rem, 6vw, 3rem)",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FontAwesomeIcon icon={faShieldAlt} style={{ fontSize: "1.5rem", color: COLORS.stepBackground }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: "700", marginBottom: "0.3rem" }}>
                      Trajet Sécurisé
                    </h4>
                    <p style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
                      Nous suivons le trajet de Sophie en temps réel pour garantir une ponctualité et une sécurité maximale.
                    </p>
                  </div>
                </div>
              </div>

              {/* Détails du rendez-vous */}
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(30px, 5vw, 50px)",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <h4
                  style={{
                    fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                    fontWeight: "800",
                    color: COLORS.textLight,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "1.5rem",
                  }}
                >
                  Détails du rendez-vous
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <div
                      style={{
                        width: "clamp(2rem, 5vw, 2.5rem)",
                        height: "clamp(2rem, 5vw, 2.5rem)",
                        backgroundColor: COLORS.grayLight,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.textLight,
                      }}
                    >
                      <FontAwesomeIcon icon={faWalking} />
                    </div>
                    <div>
                      <p style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)", fontWeight: "700", color: COLORS.textDark }}>
                        Cours à domicile
                      </p>
                      <p style={{ fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)", fontWeight: "700", color: COLORS.textLight, textTransform: "uppercase" }}>
                        Mathématiques 3ème
                      </p>
                    </div>
                  </div>
                  <div style={{ paddingTop: "1rem", borderTop: `1px solid ${COLORS.grayBorder}` }}>
                    <p style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", color: COLORS.textLight, fontWeight: "500" }}>
                      La session commencera dès que Sophie scannera votre code QR d'arrivée.
                    </p>
                  </div>
                </div>
              </div>
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

export default TutorTracking;