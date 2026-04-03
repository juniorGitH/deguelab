/**
 * Footer component - Version EduConnect
 * Design harmonisé avec le composant Home
 */
import React from "react";
import PropTypes from "prop-types";
import envelopeIcon from "../images/socials/envelope.svg";
import linkedInIcon from "../images/socials/linkedin.svg";
import twitterIcon from "../images/socials/twitter.svg";
import youTubeIcon from "../images/socials/youtube.svg";

// Constantes de style harmonisées
const COLORS = {
  primary: "#4E567E",
  secondary: "#3498db",
  textDark: "#2c3e50",
  textMedium: "#34495e",
  textLight: "#5d6d7e",
  backgroundLight: "rgba(255, 255, 255, 0.92)",
  stepBackground: "#D2F1E4",
  success: "#2ecc71",
  danger: "#e74c3c",
  white: "#ffffff",
};

const Footer = ({
  email = "contact@educonnect.com",
  linkedIn = "educonnect-tutorat",
  name = "EduConnect",
  primaryColor = COLORS.primary,
  twitter = "EduConnect_FR",
  youTube = "EduConnectTutorials",
}) => {
  return (
    <footer
      id="footer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(1.5rem, 4vh, 2.5rem)",
        padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)",
        backgroundColor: primaryColor,
        width: "100%",
        boxSizing: "border-box",
        color: COLORS.white,
        position: "relative",
        overflow: "hidden",
        // Optionnel : un subtil dégradé radial pour la texture
        background: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, ${primaryColor} 80%)`,
      }}
    >
      {/* Titre et description */}
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <h2
          style={{
            color: COLORS.white,
            margin: 0,
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            fontWeight: "700",
            letterSpacing: "-0.02em",
          }}
        >
          {name}
        </h2>
        <p
          style={{
            opacity: 0.8,
            fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
            marginTop: "0.5rem",
            fontWeight: "400",
          }}
        >
          Le succès scolaire à portée de main
        </p>
      </div>

      {/* Réseaux sociaux */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
          marginTop: "0.5rem",
        }}
      >
        {email && (
          <a
            href={`mailto:${email}`}
            title="Nous écrire"
            style={{
              transition: "transform 0.2s ease, opacity 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "0.9";
            }}
          >
            <img
              src={envelopeIcon}
              alt="email"
              style={{
                width: "clamp(24px, 5vw, 28px)",
                filter: "brightness(0) invert(1)",
                opacity: 0.9,
              }}
            />
          </a>
        )}
        {linkedIn && (
          <a
            href={`https://www.linkedin.com/company/${linkedIn}`}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{
              transition: "transform 0.2s ease, opacity 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "0.9";
            }}
          >
            <img
              src={linkedInIcon}
              alt="LinkedIn"
              style={{
                width: "clamp(24px, 5vw, 28px)",
                filter: "brightness(0) invert(1)",
                opacity: 0.9,
              }}
            />
          </a>
        )}
        {twitter && (
          <a
            href={`https://twitter.com/${twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            style={{
              transition: "transform 0.2s ease, opacity 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "0.9";
            }}
          >
            <img
              src={twitterIcon}
              alt="Twitter"
              style={{
                width: "clamp(24px, 5vw, 28px)",
                filter: "brightness(0) invert(1)",
                opacity: 0.9,
              }}
            />
          </a>
        )}
        {youTube && (
          <a
            href={`https://www.youtube.com/${youTube}`}
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            style={{
              transition: "transform 0.2s ease, opacity 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "0.9";
            }}
          >
            <img
              src={youTubeIcon}
              alt="YouTube"
              style={{
                width: "clamp(24px, 5vw, 28px)",
                filter: "brightness(0) invert(1)",
                opacity: 0.9,
              }}
            />
          </a>
        )}
      </div>

      {/* Liens légaux et navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "clamp(1.2rem, 3vw, 2rem)",
          fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
          marginTop: "1rem",
        }}
      >
        {[
          { href: "/MentionsLegales", label: "Mentions légales" },
          { href: "/ConditionsGeneralesUtilisation", label: "CGU" },
          { href: "/Securite", label: "Confidentialité" },
          { href: "/Ressources", label: "Ressources" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: COLORS.white,
              textDecoration: "none",
              opacity: 0.8,
              transition: "opacity 0.2s ease, transform 0.2s ease",
              borderBottom: "1px solid transparent",
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = "1";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.borderBottomColor = COLORS.stepBackground;
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = "0.8";
              e.target.style.transform = "translateY(0)";
              e.target.style.borderBottomColor = "transparent";
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Séparateur élégant */}
      <hr
        style={{
          width: "100%",
          maxWidth: "800px",
          border: "0",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          margin: "clamp(1rem, 2vh, 2rem) 0 0 0",
        }}
      />

      {/* Copyright */}
      <p
        style={{
          fontSize: "clamp(0.75rem, 2vw, 0.85rem)",
          opacity: 0.6,
          margin: 0,
        }}
      >
        &copy; 2026 {name}. Tous droits réservés.
           
      </p>
      
    </footer>
  );
};

Footer.propTypes = {
  email: PropTypes.string,
  linkedIn: PropTypes.string,
  name: PropTypes.string,
  primaryColor: PropTypes.string,
  twitter: PropTypes.string,
  youTube: PropTypes.string,
};

export default Footer;