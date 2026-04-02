/**
 * Home component
 *
 * Section d'accueil avec image de fond, nom, titre et appels à l'action.
 * Design épuré, responsive, avec overlay dégradé et étapes rapides.
 */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Assets
import arrowSvg from "../images/down-arrow.svg";
import image from "../images/jr2.jpg";

// Constantes de style
const COLORS = {
  primary: "#3498db",
  secondary: "#4E567E",
  textDark: "#2c3e50",
  textMedium: "#34495e",
  textLight: "#5d6d7e",
  backgroundLight: "rgba(255, 255, 255, 0.92)",
  stepBackground: "#D2F1E4",
};

const IMAGE_ALT_TEXT =
  "Graduate software engineer in a professional setting, representing research, innovation, and advanced computing";

const Home = ({ name, title }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Arrière-plan avec image et overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(50vh, 65vh, 70vh)",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={IMAGE_ALT_TEXT}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            filter: "brightness(0.85)",
          }}
        />
        {/* Dégradé pour fondre avec le contenu */}
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

      {/* Contenu principal centré */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "clamp(1rem, 5vw, 3rem)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Carte de présentation (floutée) */}
        <div
          style={{
            backgroundColor: COLORS.backgroundLight,
            borderRadius: "clamp(12px, 2vw, 20px)",
            padding: "clamp(1.5rem, 4vw, 3rem)",
            boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            maxWidth: "800px",
            width: "100%",
            marginTop: "clamp(30vh, 40vh, 45vh)",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
              marginBottom: "clamp(0.8rem, 2vw, 1.5rem)",
              color: COLORS.textDark,
              fontWeight: "700",
              lineHeight: "1.2",
            }}
          >
            {name}
          </h1>

          <h2
            style={{
              fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
              color: COLORS.textMedium,
              fontWeight: "400",
              marginBottom: "clamp(1rem, 2vw, 1.8rem)",
              lineHeight: "1.3",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
              color: COLORS.textLight,
              lineHeight: "1.6",
              maxWidth: "600px",
              margin: "0 auto clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            Trouvez les meilleurs tuteurs étudiants à proximité pour vos enfants.
            Un accompagnement personnalisé du primaire au lycée.
          </p>

          {/* Boutons d'action */}
          <div
            style={{
              display: "flex",
              gap: "clamp(0.8rem, 2vw, 1.5rem)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/ScheduleMentoring"
              style={{
                display: "inline-block",
                padding:
                  "clamp(0.7rem, 1.5vw, 0.9rem) clamp(1.2rem, 2.5vw, 1.8rem)",
                backgroundColor: COLORS.primary,
                color: "white",
                textDecoration: "none",
                borderRadius: "clamp(25px, 3vw, 30px)",
                fontWeight: "700",
                transition: "all 0.3s ease",
                border: `2px solid ${COLORS.primary}`,
                fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
                whiteSpace: "nowrap",
                boxShadow: "0 10px 20px rgba(52, 152, 219, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#2980b9";
                e.target.style.borderColor = "#2980b9";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = COLORS.primary;
                e.target.style.borderColor = COLORS.primary;
              }}
            >
              Lancer l'assistant de recherche
            </a>

            <a
              href="/Portfolio"
              style={{
                display: "inline-block",
                padding:
                  "clamp(0.7rem, 1.5vw, 0.9rem) clamp(1.2rem, 2.5vw, 1.8rem)",
                backgroundColor: "transparent",
                color: COLORS.secondary,
                textDecoration: "none",
                borderRadius: "clamp(25px, 3vw, 30px)",
                fontWeight: "700",
                transition: "all 0.3s ease",
                border: `2px solid ${COLORS.secondary}`,
                fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = COLORS.secondary;
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = COLORS.secondary;
              }}
            >
              Voir tous les tuteurs
            </a>
          </div>
        </div>

        {/* Étapes rapides (masquées sur mobile) — placées dans le flux, sous la carte */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(2rem, 8vw, 4rem)",
              marginTop: "clamp(2rem, 4vw, 3rem)",
              paddingBottom: "clamp(2rem, 4vh, 3rem)",
            }}
          >
            {[
              { step: "1", label: "Choisissez le niveau" },
              { step: "2", label: "Sélectionnez la matière" },
              { step: "3", label: "Réservez en 1 clic" },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "clamp(2.5rem, 6vw, 3rem)",
                    height: "clamp(2.5rem, 6vw, 3rem)",
                    borderRadius: "50%",
                    background: COLORS.stepBackground,
                    color: COLORS.secondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    margin: "0 auto 10px",
                    fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  }}
                >
                  {item.step}
                </div>
                <p
                  style={{
                    fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)",
                    fontWeight: "bold",
                    color: COLORS.secondary,
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Flèche de scroll vers la section suivante */}
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
        <a href="#about" aria-label="Aller à la section suivante">
          <img
            src={arrowSvg}
            alt="Scroll down"
            style={{
              height: "clamp(2rem, 5vw, 3rem)",
              width: "clamp(2rem, 5vw, 3rem)",
              opacity: 0.8,
            }}
          />
        </a>
      </div>
    </section>
  );
};

Home.defaultProps = {
  name: "",
  title: "",
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Home;