/**
 * ClientProfile component - Gestion du profil Parent / Tuteur
 * Design harmonisé avec le composant Home
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faMapMarkerAlt,
  faBook,
  faGraduationCap,
  faLock,
  faSignOutAlt,
  faTrashAlt,
  faCalendarCheck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Image de fond (à remplacer par votre propre image)
 */
import backgroundImage from "../images/profile-bg.jpg"; // Assurez-vous que le chemin est correct

const imageAltText =
  "Étudiant travaillant sur un ordinateur, symbolisant la gestion de profil et le suivi personnalisé";

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
};

const ClientProfile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    level: "", // Pour parents (niveau de l'enfant)
    subjects: "", // Pour tuteurs
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) {
      navigate("/");
      return;
    }

    const user = JSON.parse(savedUser);
    setCurrentUser(user);

    // Charger les données étendues du profil (simulation)
    const userProfile = JSON.parse(
      localStorage.getItem(`userProfile_${user.id}`) || "{}"
    );

    setProfileData({
      name: user.name || "",
      email: user.email || "",
      phone: userProfile.phone || "",
      address: userProfile.address || "",
      city: userProfile.city || "Lomé",
      level: userProfile.level || "Collège",
      subjects: userProfile.subjects || "",
      bio: userProfile.bio || "",
    });
  }, [navigate]);

  const handleSaveProfile = () => {
    const updatedUser = { ...currentUser, name: profileData.name, email: profileData.email };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem(`userProfile_${currentUser.id}`, JSON.stringify(profileData));
    setCurrentUser(updatedUser);
    setIsEditing(false);
    alert("Profil mis à jour !");
  };

  const isTutor = currentUser?.userType === "tutor" || currentUser?.userType === "admin";

  if (!currentUser) return null;

  return (
    <section
      id="client-profile"
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {/* Colonne gauche - Identité & Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vh, 2rem)" }}>
              {/* Carte d'identité */}
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(20px, 3vw, 30px)",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  textAlign: "center",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <div
                  style={{
                    width: "clamp(5rem, 12vw, 6rem)",
                    height: "clamp(5rem, 12vw, 6rem)",
                    backgroundColor: COLORS.stepBackground,
                    color: COLORS.secondary,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "clamp(2rem, 5vw, 2.5rem)",
                    fontWeight: "bold",
                    margin: "0 auto 1rem",
                  }}
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <h2
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    fontWeight: "700",
                    color: COLORS.textDark,
                    marginBottom: "0.5rem",
                  }}
                >
                  {currentUser.name}
                </h2>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.3rem 1rem",
                    borderRadius: "30px",
                    fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    backgroundColor: isTutor ? "#f3e8ff" : "#e6f0ff",
                    color: isTutor ? "#6b21a8" : COLORS.primary,
                  }}
                >
                  {isTutor ? "Tuteur Certifié" : "Parent"}
                </span>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginTop: "2rem",
                    paddingTop: "2rem",
                    borderTop: `1px solid ${COLORS.grayBorder}`,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(1.5rem, 4vw, 2rem)",
                        fontWeight: "700",
                        color: COLORS.secondary,
                      }}
                    >
                      {isTutor ? "12" : "4"}
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                        color: COLORS.textLight,
                        fontWeight: "700",
                        textTransform: "uppercase",
                      }}
                    >
                      Sessions
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "clamp(1.5rem, 4vw, 2rem)",
                        fontWeight: "700",
                        color: COLORS.secondary,
                      }}
                    >
                      4.9
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                        color: COLORS.textLight,
                        fontWeight: "700",
                        textTransform: "uppercase",
                      }}
                    >
                      Note
                    </p>
                  </div>
                </div>
              </div>

              {/* Bouton de déconnexion */}
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(20px, 3vw, 30px)",
                  padding: "1rem",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <button
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                    navigate("/");
                  }}
                  style={{
                    width: "100%",
                    padding: "clamp(0.8rem, 2vw, 1rem)",
                    backgroundColor: "transparent",
                    color: COLORS.danger,
                    border: `2px solid ${COLORS.danger}`,
                    borderRadius: "clamp(30px, 5vw, 40px)",
                    fontWeight: "700",
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = COLORS.danger;
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = COLORS.danger;
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Déconnexion
                </button>
              </div>
            </div>

            {/* Colonne droite - Formulaires */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vh, 2rem)" }}>
              {/* Informations générales */}
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(20px, 3vw, 30px)",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "clamp(1.5rem, 3vh, 2rem)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                      fontWeight: "700",
                      color: COLORS.secondary,
                    }}
                  >
                    Informations du Profil
                  </h3>
                  <button
                    onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                    style={{
                      padding: "0.5rem 1.5rem",
                      backgroundColor: isEditing ? COLORS.success : COLORS.secondary,
                      color: "white",
                      border: "none",
                      borderRadius: "clamp(20px, 3vw, 30px)",
                      fontWeight: "700",
                      fontSize: "clamp(0.8rem, 1.8vw, 0.9rem)",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (isEditing) {
                        e.target.style.backgroundColor = "#27ae60";
                      } else {
                        e.target.style.backgroundColor = "#3a4261";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (isEditing) {
                        e.target.style.backgroundColor = COLORS.success;
                      } else {
                        e.target.style.backgroundColor = COLORS.secondary;
                      }
                    }}
                  >
                    {isEditing ? "Enregistrer" : "Modifier"}
                  </button>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "clamp(1rem, 2vw, 1.5rem)",
                  }}
                >
                  {/* Nom */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <label style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", fontWeight: "700", color: COLORS.textMedium }}>
                      Nom complet
                    </label>
                    <div style={{ position: "relative" }}>
                      <FontAwesomeIcon
                        icon={faUser}
                        style={{
                          position: "absolute",
                          left: "1rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#b0bec5",
                        }}
                      />
                      <input
                        type="text"
                        value={profileData.name}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem 0.8rem 2.5rem",
                          backgroundColor: COLORS.grayLight,
                          border: `2px solid ${COLORS.grayBorder}`,
                          borderRadius: "clamp(16px, 2vw, 24px)",
                          fontSize: "clamp(0.9rem, 2vw, 1rem)",
                          color: COLORS.textDark,
                          outline: "none",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                          opacity: isEditing ? 1 : 0.6,
                        }}
                        onFocus={(e) => {
                          if (isEditing) {
                            e.target.style.borderColor = COLORS.primary;
                            e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
                          }
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = COLORS.grayBorder;
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <label style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", fontWeight: "700", color: COLORS.textMedium }}>
                      Email
                    </label>
                    <div style={{ position: "relative" }}>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{
                          position: "absolute",
                          left: "1rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#b0bec5",
                        }}
                      />
                      <input
                        type="email"
                        value={profileData.email}
                        disabled={!isEditing}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem 0.8rem 2.5rem",
                          backgroundColor: COLORS.grayLight,
                          border: `2px solid ${COLORS.grayBorder}`,
                          borderRadius: "clamp(16px, 2vw, 24px)",
                          fontSize: "clamp(0.9rem, 2vw, 1rem)",
                          color: COLORS.textDark,
                          outline: "none",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                          opacity: isEditing ? 1 : 0.6,
                        }}
                        onFocus={(e) => {
                          if (isEditing) {
                            e.target.style.borderColor = COLORS.primary;
                            e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
                          }
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = COLORS.grayBorder;
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Adresse */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <label style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", fontWeight: "700", color: COLORS.textMedium }}>
                      Adresse (proximité)
                    </label>
                    <div style={{ position: "relative" }}>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        style={{
                          position: "absolute",
                          left: "1rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#b0bec5",
                        }}
                      />
                      <input
                        type="text"
                        value={profileData.address}
                        disabled={!isEditing}
                        placeholder="Votre adresse pour trouver des tuteurs proches"
                        onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem 0.8rem 2.5rem",
                          backgroundColor: COLORS.grayLight,
                          border: `2px solid ${COLORS.grayBorder}`,
                          borderRadius: "clamp(16px, 2vw, 24px)",
                          fontSize: "clamp(0.9rem, 2vw, 1rem)",
                          color: COLORS.textDark,
                          outline: "none",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                          opacity: isEditing ? 1 : 0.6,
                        }}
                        onFocus={(e) => {
                          if (isEditing) {
                            e.target.style.borderColor = COLORS.primary;
                            e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
                          }
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = COLORS.grayBorder;
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  {/* Niveau / Matières */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <label style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", fontWeight: "700", color: COLORS.textMedium }}>
                      {isTutor ? "Matières" : "Niveau de l'élève"}
                    </label>
                    <div style={{ position: "relative" }}>
                      <FontAwesomeIcon
                        icon={isTutor ? faBook : faGraduationCap}
                        style={{
                          position: "absolute",
                          left: "1rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#b0bec5",
                        }}
                      />
                      <input
                        type="text"
                        value={isTutor ? profileData.subjects : profileData.level}
                        disabled={!isEditing}
                        onChange={(e) =>
                          isTutor
                            ? setProfileData({ ...profileData, subjects: e.target.value })
                            : setProfileData({ ...profileData, level: e.target.value })
                        }
                        style={{
                          width: "100%",
                          padding: "0.8rem 1rem 0.8rem 2.5rem",
                          backgroundColor: COLORS.grayLight,
                          border: `2px solid ${COLORS.grayBorder}`,
                          borderRadius: "clamp(16px, 2vw, 24px)",
                          fontSize: "clamp(0.9rem, 2vw, 1rem)",
                          color: COLORS.textDark,
                          outline: "none",
                          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                          opacity: isEditing ? 1 : 0.6,
                        }}
                        onFocus={(e) => {
                          if (isEditing) {
                            e.target.style.borderColor = COLORS.primary;
                            e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
                          }
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = COLORS.grayBorder;
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sécurité */}
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(20px, 3vw, 30px)",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(255,255,255,0.5)",
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                    fontWeight: "700",
                    color: COLORS.secondary,
                    marginBottom: "clamp(1.5rem, 3vh, 2rem)",
                  }}
                >
                  Sécurité
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "clamp(1rem, 2vw, 1.5rem)",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <label style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", fontWeight: "700", color: COLORS.textMedium }}>
                      Nouveau mot de passe
                    </label>
                    <input
                      type="password"
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        backgroundColor: COLORS.grayLight,
                        border: `2px solid ${COLORS.grayBorder}`,
                        borderRadius: "clamp(16px, 2vw, 24px)",
                        fontSize: "clamp(0.9rem, 2vw, 1rem)",
                        color: COLORS.textDark,
                        outline: "none",
                        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = COLORS.primary;
                        e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}20`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = COLORS.grayBorder;
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <button
                      style={{
                        width: "100%",
                        padding: "0.8rem 1rem",
                        backgroundColor: COLORS.grayLight,
                        color: COLORS.textMedium,
                        border: `2px solid ${COLORS.grayBorder}`,
                        borderRadius: "clamp(16px, 2vw, 24px)",
                        fontWeight: "700",
                        fontSize: "clamp(0.9rem, 2vw, 1rem)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = COLORS.grayBorder;
                        e.target.style.color = COLORS.textDark;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = COLORS.grayLight;
                        e.target.style.color = COLORS.textMedium;
                      }}
                    >
                      Mettre à jour le mot de passe
                    </button>
                  </div>
                </div>
              </div>

              {/* Zone de danger */}
              <div
                style={{
                  backgroundColor: COLORS.dangerLight,
                  backdropFilter: "blur(5px)",
                  borderRadius: "clamp(20px, 3vw, 30px)",
                  padding: "clamp(1.5rem, 3vw, 2rem)",
                  border: `2px solid ${COLORS.danger}30`,
                }}
              >
                <h3
                  style={{
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                    fontWeight: "700",
                    color: COLORS.danger,
                    marginBottom: "0.5rem",
                  }}
                >
                  Zone de danger
                </h3>
                <p
                  style={{
                    fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                    color: COLORS.danger,
                    marginBottom: "1.5rem",
                  }}
                >
                  La suppression de votre compte est définitive et effacera toutes vos données de session.
                </p>
                <button
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.8rem 2rem",
                    backgroundColor: COLORS.danger,
                    color: "white",
                    border: "none",
                    borderRadius: "clamp(30px, 5vw, 40px)",
                    fontWeight: "700",
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#c0392b";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = COLORS.danger;
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                  Supprimer mon compte
                </button>
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

export default ClientProfile;