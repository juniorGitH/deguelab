/**
 * ScheduleMentoring component - Assistant de Réservation par étapes
 * Design harmonisé avec le composant Home
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Image de fond (à remplacer par votre propre image)
 */
import backgroundImage from "../images/schedule-bg.jpg"; // Assurez-vous que le chemin est correct

const imageAltText =
  "Élève étudiant avec un tuteur, symbolisant l'accompagnement personnalisé";

const ScheduleMentoring = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    level: "",
    grade: "",
    subject: "",
    objective: "",
    type: "home",
  });

  const levels = [
    { id: "primary", label: "Primaire", icon: "🎒" },
    { id: "middle", label: "Collège", icon: "🏫" },
    { id: "high", label: "Lycée", icon: "🎓" },
  ];

  const grades = {
    primary: ["CP", "CE1", "CE2", "CM1", "CM2"],
    middle: ["6ème", "5ème", "4ème", "3ème"],
    high: ["Seconde", "1ère", "Terminale"],
  };

  const subjects = [
    "Mathématiques",
    "Français",
    "Anglais",
    "Physique-Chimie",
    "SVT",
    "Histoire-Géo",
  ];

  const objectives = [
    {
      id: "homework",
      label: "Aide aux devoirs",
      desc: "Suivi quotidien et méthodologie",
    },
    {
      id: "exam",
      label: "Préparation examen",
      desc: "Brevet, Bac, Concours",
    },
    {
      id: "refresh",
      label: "Remise à niveau",
      desc: "Combler des lacunes spécifiques",
    },
    {
      id: "excellence",
      label: "Perfectionnement",
      desc: "Viser l'excellence",
    },
  ];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field !== "objective") nextStep(); // Avance auto sauf pour le dernier choix
  };

  // Indicateur d'étape (inline styles)
  const renderStepIndicator = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "clamp(0.3rem, 1vw, 0.5rem)",
        marginBottom: "clamp(2rem, 5vh, 3rem)",
      }}
    >
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            height: "clamp(0.3rem, 1vh, 0.5rem)",
            borderRadius: "20px",
            transition: "all 0.5s ease",
            width: step >= i ? "clamp(2rem, 8vw, 3rem)" : "clamp(0.8rem, 3vw, 1rem)",
            backgroundColor: step >= i ? "#3498db" : "#e0e0e0",
          }}
        ></div>
      ))}
    </div>
  );

  return (
    <section
      id="schedule-mentoring"
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
          maxWidth: "900px",
          margin: "0 auto",
          padding: "clamp(1rem, 5vw, 3rem)",
          boxSizing: "border-box",
        }}
      >
        {renderStepIndicator()}

        {/* Carte principale floutée */}
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(10px)",
            borderRadius: "clamp(30px, 5vw, 60px)",
            padding: "clamp(2rem, 5vw, 4rem)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            minHeight: "clamp(400px, 60vh, 600px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ÉTAPE 1 : NIVEAU */}
          {step === 1 && (
            <div
              style={{
                animation: "fadeIn 0.5s ease-out",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                  fontWeight: "700",
                  color: "#4E567E",
                  textAlign: "center",
                  marginBottom: "clamp(0.5rem, 1vh, 1rem)",
                }}
              >
                Quel est le niveau de l'élève ?
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                  color: "#7f8c8d",
                  textAlign: "center",
                  marginBottom: "clamp(2rem, 4vh, 3rem)",
                }}
              >
                Sélectionnez la catégorie principale.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "clamp(1rem, 2vw, 2rem)",
                  flex: 1,
                }}
              >
                {levels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleSelect("level", l.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "clamp(1.5rem, 3vw, 2.5rem)",
                      backgroundColor: "#f8f9fa",
                      border: "2px solid transparent",
                      borderRadius: "clamp(20px, 3vw, 30px)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      fontSize: "clamp(0.9rem, 2vw, 1rem)",
                      fontWeight: "600",
                      color: "#2c3e50",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                      e.currentTarget.style.borderColor = "#3498db";
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(52,152,219,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(2.5rem, 6vw, 4rem)",
                        marginBottom: "clamp(0.8rem, 2vw, 1.5rem)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      {l.icon}
                    </span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ÉTAPE 2 : CLASSE */}
          {step === 2 && (
            <div
              style={{
                animation: "fadeIn 0.5s ease-out",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                onClick={prevStep}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)",
                  fontWeight: "700",
                  color: "#b0bec5",
                  marginBottom: "clamp(1rem, 2vh, 1.5rem)",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4E567E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#b0bec5")}
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Retour
              </button>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                  fontWeight: "700",
                  color: "#4E567E",
                  textAlign: "center",
                  marginBottom: "clamp(0.5rem, 1vh, 1rem)",
                }}
              >
                En quelle classe est-il ?
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                  color: "#7f8c8d",
                  textAlign: "center",
                  marginBottom: "clamp(2rem, 4vh, 3rem)",
                }}
              >
                Précisez l'année scolaire pour un tuteur adapté.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "clamp(0.8rem, 1.5vw, 1.2rem)",
                  flex: 1,
                }}
              >
                {grades[formData.level].map((g) => (
                  <button
                    key={g}
                    onClick={() => handleSelect("grade", g)}
                    style={{
                      padding: "clamp(1rem, 2vw, 1.5rem)",
                      backgroundColor: "#f8f9fa",
                      border: "2px solid transparent",
                      borderRadius: "clamp(16px, 2vw, 24px)",
                      fontWeight: "600",
                      color: "#2c3e50",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                      e.currentTarget.style.borderColor = "#3498db";
                      e.currentTarget.style.color = "#3498db";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.color = "#2c3e50";
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ÉTAPE 3 : MATIÈRE */}
          {step === 3 && (
            <div
              style={{
                animation: "fadeIn 0.5s ease-out",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                onClick={prevStep}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)",
                  fontWeight: "700",
                  color: "#b0bec5",
                  marginBottom: "clamp(1rem, 2vh, 1.5rem)",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4E567E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#b0bec5")}
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Retour
              </button>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                  fontWeight: "700",
                  color: "#4E567E",
                  textAlign: "center",
                  marginBottom: "clamp(0.5rem, 1vh, 1rem)",
                }}
              >
                Quelle matière souhaitez-vous ?
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                  color: "#7f8c8d",
                  textAlign: "center",
                  marginBottom: "clamp(2rem, 4vh, 3rem)",
                }}
              >
                Choisissez la discipline principale à renforcer.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "clamp(0.8rem, 1.5vw, 1.2rem)",
                  flex: 1,
                }}
              >
                {subjects.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSelect("subject", s)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "clamp(1rem, 2vw, 1.5rem)",
                      backgroundColor: "#f8f9fa",
                      border: "2px solid transparent",
                      borderRadius: "clamp(16px, 2vw, 24px)",
                      fontWeight: "600",
                      color: "#2c3e50",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                      e.currentTarget.style.borderColor = "#3498db";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                      e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    {s}
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      style={{ color: "#b0bec5", fontSize: "0.8rem" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ÉTAPE 4 : OBJECTIF */}
          {step === 4 && (
            <div
              style={{
                animation: "fadeIn 0.5s ease-out",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                onClick={prevStep}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)",
                  fontWeight: "700",
                  color: "#b0bec5",
                  marginBottom: "clamp(1rem, 2vh, 1.5rem)",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4E567E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#b0bec5")}
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Retour
              </button>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                  fontWeight: "700",
                  color: "#4E567E",
                  textAlign: "center",
                  marginBottom: "clamp(0.5rem, 1vh, 1rem)",
                }}
              >
                Quel est l'objectif principal ?
              </h2>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                  color: "#7f8c8d",
                  textAlign: "center",
                  marginBottom: "clamp(2rem, 4vh, 3rem)",
                }}
              >
                Dernière étape pour trouver le profil parfait.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(0.8rem, 1.5vh, 1.2rem)",
                  flex: 1,
                  marginBottom: "clamp(1.5rem, 3vh, 2rem)",
                }}
              >
                {objectives.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => setFormData({ ...formData, objective: o.id })}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(1rem, 2vw, 1.5rem)",
                      padding: "clamp(1rem, 2vw, 1.5rem)",
                      backgroundColor:
                        formData.objective === o.id ? "#eefaff" : "#f8f9fa",
                      border:
                        formData.objective === o.id
                          ? "2px solid #3498db"
                          : "2px solid transparent",
                      borderRadius: "clamp(20px, 3vw, 30px)",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      if (formData.objective !== o.id) {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                        e.currentTarget.style.borderColor = "#d0d0d0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (formData.objective !== o.id) {
                        e.currentTarget.style.backgroundColor = "#f8f9fa";
                        e.currentTarget.style.borderColor = "transparent";
                      }
                    }}
                  >
                    <div
                      style={{
                        width: "clamp(1.2rem, 3vw, 1.5rem)",
                        height: "clamp(1.2rem, 3vw, 1.5rem)",
                        borderRadius: "50%",
                        border:
                          formData.objective === o.id
                            ? "2px solid #3498db"
                            : "2px solid #b0bec5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:
                          formData.objective === o.id ? "#3498db" : "transparent",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {formData.objective === o.id && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{ color: "white", fontSize: "0.7rem" }}
                        />
                      )}
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "700",
                          color: "#2c3e50",
                          fontSize: "clamp(1rem, 2vw, 1.1rem)",
                        }}
                      >
                        {o.label}
                      </p>
                      <p
                        style={{
                          fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)",
                          color: "#7f8c8d",
                        }}
                      >
                        {o.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <button
                disabled={!formData.objective}
                onClick={() =>
                  navigate("/Portfolio", { state: { filters: formData } })
                }
                style={{
                  width: "100%",
                  padding: "clamp(1rem, 2vw, 1.5rem)",
                  backgroundColor: "#4E567E",
                  color: "white",
                  border: "none",
                  borderRadius: "clamp(30px, 5vw, 50px)",
                  fontWeight: "700",
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  cursor: formData.objective ? "pointer" : "not-allowed",
                  opacity: formData.objective ? 1 : 0.5,
                  transition: "background-color 0.2s ease",
                  boxShadow: "0 10px 25px rgba(78, 86, 126, 0.3)",
                }}
                onMouseEnter={(e) => {
                  if (formData.objective)
                    e.currentTarget.style.backgroundColor = "#3a4261";
                }}
                onMouseLeave={(e) => {
                  if (formData.objective)
                    e.currentTarget.style.backgroundColor = "#4E567E";
                }}
              >
                Trouver mon tuteur idéal
              </button>
            </div>
          )}
        </div>

        {/* Pied de page avec garanties */}
        <div
          style={{
            marginTop: "clamp(2rem, 4vh, 3rem)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(0.5rem, 1.5vw, 1rem)",
            color: "#95a5a6",
            fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)",
            fontWeight: "500",
            flexWrap: "wrap",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: "#2ecc71", fontSize: "0.8rem" }}
            />
            Inscription gratuite
          </span>
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "#b0bec5",
            }}
          ></span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: "#2ecc71", fontSize: "0.8rem" }}
            />
            Tuteurs vérifiés
          </span>
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: "#b0bec5",
            }}
          ></span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              style={{ color: "#2ecc71", fontSize: "0.8rem" }}
            />
            Sans engagement
          </span>
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

export default ScheduleMentoring;