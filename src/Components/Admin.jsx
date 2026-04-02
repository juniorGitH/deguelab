/**
 * Admin component - Page d'administration EduConnect
 * Design harmonisé avec le composant Home
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Image de fond (à remplacer par votre propre image)
 */
import backgroundImage from "../images/admin-bg.jpg";

const imageAltText =
  "Tableau de bord d'administration avec statistiques et gestion des utilisateurs";

// Constantes de style harmonisées - version simple sans auto-référence
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
  purpleLight: "#f3e8ff",
  purpleDark: "#6b21a8",
  redLight: "#fee2e2",
  redDark: "#b91c1c",
  blueLight: "#e6f0ff",
  blueDark: "#3498db", // valeur directe, pas de référence
  greenLight: "#dcfce7",
  greenDark: "#166534",
  yellowLight: "#fef9c3",
  yellowDark: "#854d0e",
};

// Styles réutilisables pour le tableau (définis APRÈS COLORS)
const tableHeaderStyle = {
  padding: "clamp(0.8rem, 2vw, 1rem) clamp(1rem, 2vw, 1.5rem)",
  textAlign: "left",
  fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
  fontWeight: "700",
  color: COLORS.textLight,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tableCellStyle = {
  padding: "clamp(0.8rem, 2vw, 1rem) clamp(1rem, 2vw, 1.5rem)",
  fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
};

const Admin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [resources, setResources] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("analytics");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser || JSON.parse(savedUser).userType !== "admin") {
      navigate("/");
      return;
    }

    setIsLoggedIn(true);
    setResources(JSON.parse(localStorage.getItem("adminResources") || "[]"));
    setSessions(JSON.parse(localStorage.getItem("mentoringSessions") || "[]"));
    setUsers(JSON.parse(localStorage.getItem("users") || "[]"));

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [navigate]);

  if (!isLoggedIn) return null;

  const getRoleBadgeStyle = (role) => {
    let bgColor, color;
    switch (role) {
      case "tutor":
        bgColor = COLORS.purpleLight;
        color = COLORS.purpleDark;
        break;
      case "admin":
        bgColor = COLORS.redLight;
        color = COLORS.redDark;
        break;
      default: // parent / client
        bgColor = COLORS.blueLight;
        color = COLORS.blueDark;
    }
    return {
      display: "inline-block",
      padding: "0.3rem 0.8rem",
      borderRadius: "30px",
      fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)",
      fontWeight: "700",
      textTransform: "uppercase",
      backgroundColor: bgColor,
      color: color,
    };
  };

  const getStatusBadgeStyle = (status) => {
    const isConfirmed = status === "confirmed";
    return {
      display: "inline-block",
      padding: "0.3rem 1rem",
      borderRadius: "30px",
      fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
      fontWeight: "700",
      backgroundColor: isConfirmed ? COLORS.greenLight : COLORS.yellowLight,
      color: isConfirmed ? COLORS.greenDark : COLORS.yellowDark,
    };
  };

  return (
    <section
      id="admin"
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
          <div style={{ marginBottom: "clamp(2rem, 4vh, 3rem)" }}>
            <h1
              style={{
                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                fontWeight: "700",
                color: COLORS.secondary,
                marginBottom: "0.3rem",
              }}
            >
              Panel Administration
            </h1>
            <p
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                color: COLORS.textLight,
              }}
            >
              Supervision globale de la plateforme EduConnect
            </p>
          </div>

          {/* Onglets */}
          <div
            style={{
              display: "flex",
              gap: "clamp(0.5rem, 2vw, 1rem)",
              borderBottom: `2px solid ${COLORS.grayBorder}`,
              marginBottom: "clamp(2rem, 4vh, 3rem)",
              overflowX: "auto",
              whiteSpace: "nowrap",
              paddingBottom: "2px",
            }}
          >
            {[
              { id: "analytics", label: "Analytics" },
              { id: "users", label: `Utilisateurs (${users.length})` },
              { id: "sessions", label: `Sessions (${sessions.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "clamp(0.5rem, 1.5vw, 0.8rem) clamp(1rem, 2vw, 1.5rem)",
                  background: "none",
                  border: "none",
                  borderBottom:
                    activeTab === tab.id
                      ? `3px solid ${COLORS.primary}`
                      : "3px solid transparent",
                  color: activeTab === tab.id ? COLORS.primary : COLORS.textLight,
                  fontWeight: "700",
                  fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = COLORS.textDark;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = COLORS.textLight;
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenu des onglets */}
          {activeTab === "analytics" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "clamp(1rem, 2vw, 1.5rem)",
              }}
            >
              {[
                {
                  label: "Tuteurs Actifs",
                  value: users.filter((u) => u.userType === "tutor").length,
                  color: COLORS.secondary,
                },
                {
                  label: "Parents Inscrits",
                  value: users.filter((u) => u.userType === "client").length,
                  color: COLORS.secondary,
                },
                {
                  label: "Cours programmés",
                  value: sessions.length,
                  color: COLORS.primary,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(5px)",
                    borderRadius: "clamp(16px, 3vw, 24px)",
                    padding: "clamp(1.5rem, 3vw, 2rem)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.03)",
                    border: "1px solid rgba(255,255,255,0.5)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
                      fontWeight: "700",
                      color: COLORS.textLight,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(2rem, 5vw, 3rem)",
                      fontWeight: "800",
                      color: stat.color,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "users" && (
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.8)",
                backdropFilter: "blur(5px)",
                borderRadius: "clamp(20px, 4vw, 30px)",
                overflowX: "auto",
                border: "1px solid rgba(255,255,255,0.5)",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                <thead>
                  <tr style={{ backgroundColor: COLORS.grayLight, borderBottom: `1px solid ${COLORS.grayBorder}` }}>
                    <th style={tableHeaderStyle}>Nom</th>
                    <th style={tableHeaderStyle}>Email</th>
                    <th style={tableHeaderStyle}>Rôle</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom: `1px solid ${COLORS.grayBorder}`,
                        transition: "background-color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.grayLight)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <td style={tableCellStyle}>
                        <span style={{ fontWeight: "700", color: COLORS.textDark }}>{user.name}</span>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={{ color: COLORS.textMedium }}>{user.email}</span>
                      </td>
                      <td style={tableCellStyle}>
                        <span style={getRoleBadgeStyle(user.userType)}>{user.userType}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "sessions" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {sessions.map((session) => (
                <div
                  key={session.id}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(5px)",
                    borderRadius: "clamp(16px, 3vw, 24px)",
                    padding: "clamp(1rem, 2vw, 1.5rem)",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    border: "1px solid rgba(255,255,255,0.5)",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", fontWeight: "700", color: COLORS.textDark, marginBottom: "0.2rem" }}>
                      {session.topic}
                    </h4>
                    <p style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)", color: COLORS.textLight }}>
                      {session.clientName} • {session.dateTime}
                    </p>
                  </div>
                  <span style={getStatusBadgeStyle(session.status)}>{session.status}</span>
                </div>
              ))}
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

export default Admin;