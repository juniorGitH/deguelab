/**
 * Header component - Version EduConnect Finale avec Espace Réussite
 * Design harmonisé avec le composant Home (styles inline)
 */
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

// Constantes de style harmonisées
const COLORS = {
  primary: "#3498db",
  secondary: "#4E567E",
  textDark: "#2c3e50",
  textMedium: "#34495e",
  textLight: "#5d6d7e",
  backgroundLight: "rgba(255, 255, 255, 0.95)",
  stepBackground: "#D2F1E4",
  white: "#ffffff",
  grayLight: "#f8f9fa",
  grayBorder: "#f1f1f1",
  overlay: "rgba(0, 0, 0, 0.5)",
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    name: "",
    userType: "parent",
  });
  const [currentUser, setCurrentUser] = useState(null);

  const profileMenuRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Fermer le menu profil si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === authData.email && u.password === authData.password
      );
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        setShowAuthModal(false);
        navigate(user.userType === "admin" ? "/Admin" : "/Dashboard");
      } else {
        alert("Identifiants incorrects.");
      }
    } else {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const newUser = {
        id: Date.now(),
        ...authData,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));
      setCurrentUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setShowAuthModal(false);
      navigate(newUser.userType === "admin" ? "/Admin" : "/Dashboard");
    }
  };

  const navLinkStyle = (isActive) => ({
    color: isActive ? COLORS.primary : COLORS.secondary,
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "clamp(0.7rem, 1.8vw, 0.85rem)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "color 0.2s ease",
  });

  // Styles communs pour les boutons
  const buttonBaseStyle = {
    border: "none",
    cursor: "pointer",
    fontWeight: "700",
    transition: "all 0.2s ease",
  };

  const loginButtonStyle = {
    ...buttonBaseStyle,
    background: "none",
    color: COLORS.secondary,
    fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
    textTransform: "uppercase",
  };

  const signupButtonStyle = {
    ...buttonBaseStyle,
    background: COLORS.primary,
    color: COLORS.white,
    padding: "clamp(0.5rem, 1.5vw, 0.7rem) clamp(1rem, 2.5vw, 1.5rem)",
    borderRadius: "clamp(10px, 2vw, 12px)",
    fontSize: "clamp(0.7rem, 1.8vw, 0.8rem)",
    textTransform: "uppercase",
  };

  const profileButtonStyle = {
    ...buttonBaseStyle,
    width: "clamp(2.2rem, 5vw, 2.5rem)",
    height: "clamp(2.2rem, 5vw, 2.5rem)",
    borderRadius: "50%",
    background: COLORS.stepBackground,
    color: COLORS.secondary,
    fontWeight: "800",
    fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const hamburgerBarStyle = (index, isOpen) => ({
    width: "25px",
    height: "3px",
    background: COLORS.secondary,
    transition: "transform 0.3s ease, opacity 0.3s ease",
    transform: isOpen
      ? index === 0
        ? "translateY(8px) rotate(45deg)"
        : index === 2
        ? "translateY(-8px) rotate(-45deg)"
        : "none"
      : "none",
    opacity: isOpen && index === 1 ? 0 : 1,
  });

  return (
    <>
      {/* Header principal */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(60px, 8vh, 70px)",
          background: COLORS.backgroundLight,
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(1rem, 5%, 3rem)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
          zIndex: 1000,
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/">
            <img
              src={logo}
              alt="EduConnect"
              style={{ height: "clamp(28px, 5vw, 35px)" }}
            />
          </Link>
        </div>

        {/* Navigation desktop */}
        {!isMobile && (
          <nav
            style={{
              display: "flex",
              gap: "clamp(1rem, 2.5vw, 1.8rem)",
            }}
          >
            <Link to="/" style={navLinkStyle(location.pathname === "/")}>
              Accueil
            </Link>
            <Link
              to="/ScheduleMentoring"
              style={navLinkStyle(location.pathname === "/ScheduleMentoring")}
            >
              Trouver un tuteur
            </Link>
            <Link to="/Portfolio" style={navLinkStyle(location.pathname === "/Portfolio")}>
              Le Catalogue
            </Link>
            <Link to="/Mentoring" style={navLinkStyle(location.pathname === "/Mentoring")}>
              Abonnements
            </Link>
            <Link to="/Ressources" style={navLinkStyle(location.pathname === "/Ressources")}>
              Espace Réussite
            </Link>
          </nav>
        )}

        {/* Actions droite (connexion / profil / hamburger) */}
        <div
          style={{
            display: "flex",
            gap: "clamp(0.8rem, 2vw, 1.2rem)",
            alignItems: "center",
          }}
        >
          {currentUser ? (
            <div style={{ position: "relative" }} ref={profileMenuRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={profileButtonStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#c5e3d6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = COLORS.stepBackground;
                }}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </button>
              {showProfileMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "clamp(2.5rem, 6vh, 3rem)",
                    right: 0,
                    background: COLORS.white,
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    width: "180px",
                    padding: "0.5rem",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 1001,
                  }}
                >
                  {[
                    { label: "Tableau de bord", path: "/Dashboard" },
                    { label: "Mon Profil", path: "/ClientProfile" },
                  ].map((item) => (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setShowProfileMenu(false);
                      }}
                      style={{
                        textAlign: "left",
                        padding: "0.8rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "8px",
                        fontWeight: "600",
                        color: COLORS.secondary,
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = COLORS.grayLight;
                        e.currentTarget.style.color = COLORS.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "none";
                        e.currentTarget.style.color = COLORS.secondary;
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      localStorage.removeItem("currentUser");
                      setCurrentUser(null);
                      setShowProfileMenu(false);
                      navigate("/");
                    }}
                    style={{
                      textAlign: "left",
                      padding: "0.8rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "8px",
                      fontWeight: "600",
                      color: "#e74c3c",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#fdedec";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "none";
                    }}
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "clamp(0.5rem, 1.5vw, 1rem)" }}>
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setIsLoginMode(true);
                }}
                style={loginButtonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.secondary)}
              >
                Connexion
              </button>
              {!isMobile && (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsLoginMode(false);
                  }}
                  style={signupButtonStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#2980b9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = COLORS.primary;
                  }}
                >
                  S'inscrire
                </button>
              )}
            </div>
          )}

          {/* Hamburger mobile */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                ...buttonBaseStyle,
                background: "none",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                padding: "5px",
              }}
            >
              <div style={hamburgerBarStyle(0, isMenuOpen)}></div>
              <div style={hamburgerBarStyle(1, isMenuOpen)}></div>
              <div style={hamburgerBarStyle(2, isMenuOpen)}></div>
            </button>
          )}
        </div>
      </header>

      {/* Menu mobile */}
      {isMobile && isMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: COLORS.overlay,
            zIndex: 999,
          }}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            style={{
              position: "absolute",
              top: "clamp(60px, 8vh, 70px)",
              left: 0,
              right: 0,
              background: COLORS.white,
              padding: "clamp(1rem, 3vh, 2rem)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(1rem, 2vh, 1.5rem)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {[
              { to: "/", label: "Accueil" },
              { to: "/Portfolio", label: "Tuteurs" },
              { to: "/Mentoring", label: "Abonnements" },
              { to: "/Ressources", label: "Espace Réussite" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  textDecoration: "none",
                  color: COLORS.secondary,
                  fontWeight: "700",
                  textTransform: "uppercase",
                  fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)",
                  padding: "0.5rem 0",
                }}
              >
                {link.label}
              </Link>
            ))}
            {!currentUser && (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setIsLoginMode(false);
                  setIsMenuOpen(false);
                }}
                style={{
                  ...signupButtonStyle,
                  width: "100%",
                  marginTop: "0.5rem",
                }}
              >
                S'inscrire
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal authentification */}
      {showAuthModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            padding: "1rem",
          }}
          onClick={() => setShowAuthModal(false)}
        >
          <div
            style={{
              background: COLORS.white,
              padding: "clamp(1.5rem, 4vw, 2.5rem)",
              borderRadius: "clamp(20px, 4vw, 30px)",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: COLORS.secondary,
                  fontSize: "clamp(1.2rem, 4vw, 1.5rem)",
                }}
              >
                {isLoginMode ? "Connexion" : "Création de compte"}
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                style={{
                  ...buttonBaseStyle,
                  background: "none",
                  fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
                  color: COLORS.textLight,
                  padding: "0.5rem",
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAuth}>
              {!isLoginMode && (
                <div style={{ marginBottom: "1rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
                      fontWeight: "700",
                      color: COLORS.textLight,
                      marginBottom: "0.3rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={authData.name}
                    onChange={(e) =>
                      setAuthData({ ...authData, name: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "clamp(0.6rem, 1.5vw, 0.8rem)",
                      border: `2px solid ${COLORS.grayBorder}`,
                      borderRadius: "clamp(8px, 2vw, 10px)",
                      outline: "none",
                      fontSize: "clamp(0.8rem, 2vw, 1rem)",
                      transition: "border-color 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                    onBlur={(e) =>
                      (e.target.style.borderColor = COLORS.grayBorder)
                    }
                  />
                </div>
              )}

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
                    fontWeight: "700",
                    color: COLORS.textLight,
                    marginBottom: "0.3rem",
                    textTransform: "uppercase",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={authData.email}
                  onChange={(e) =>
                    setAuthData({ ...authData, email: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "clamp(0.6rem, 1.5vw, 0.8rem)",
                    border: `2px solid ${COLORS.grayBorder}`,
                    borderRadius: "clamp(8px, 2vw, 10px)",
                    outline: "none",
                    fontSize: "clamp(0.8rem, 2vw, 1rem)",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                  onBlur={(e) => (e.target.style.borderColor = COLORS.grayBorder)}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
                    fontWeight: "700",
                    color: COLORS.textLight,
                    marginBottom: "0.3rem",
                    textTransform: "uppercase",
                  }}
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={authData.password}
                  onChange={(e) =>
                    setAuthData({ ...authData, password: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "clamp(0.6rem, 1.5vw, 0.8rem)",
                    border: `2px solid ${COLORS.grayBorder}`,
                    borderRadius: "clamp(8px, 2vw, 10px)",
                    outline: "none",
                    fontSize: "clamp(0.8rem, 2vw, 1rem)",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = COLORS.primary)}
                  onBlur={(e) => (e.target.style.borderColor = COLORS.grayBorder)}
                />
              </div>

              {!isLoginMode && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "clamp(0.6rem, 1.8vw, 0.7rem)",
                      fontWeight: "700",
                      color: COLORS.textLight,
                      marginBottom: "0.3rem",
                      textTransform: "uppercase",
                    }}
                  >
                    Type de compte
                  </label>
                  <select
                    value={authData.userType}
                    onChange={(e) =>
                      setAuthData({ ...authData, userType: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "clamp(0.6rem, 1.5vw, 0.8rem)",
                      border: `2px solid ${COLORS.grayBorder}`,
                      borderRadius: "clamp(8px, 2vw, 10px)",
                      outline: "none",
                      fontSize: "clamp(0.8rem, 2vw, 1rem)",
                      background: COLORS.white,
                    }}
                  >
                    <option value="parent">Parent</option>
                    <option value="tutor">Tuteur</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "clamp(0.8rem, 2vw, 1rem)",
                  background: COLORS.secondary,
                  color: COLORS.white,
                  border: "none",
                  borderRadius: "clamp(10px, 2vw, 12px)",
                  fontWeight: "700",
                  fontSize: "clamp(0.8rem, 2vw, 1rem)",
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                  marginTop: "1rem",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#3a4261")}
                onMouseLeave={(e) => (e.target.style.background = COLORS.secondary)}
              >
                {isLoginMode ? "Se connecter" : "Rejoindre EduConnect"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;