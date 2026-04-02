/**
 * About component - Présentation du concept EduConnect
 */
import React from "react";
import image from "../images/fondo-tecnologia.jpg";

const imageAltText = "purple and blue abstract technology background";

const description =
  "EduConnect est une plateforme innovante qui simplifie la mise en relation entre des étudiants tuteurs qualifiés et des parents d'élèves. Notre mission est d'offrir un accompagnement scolaire de qualité, accessible et proche de chez vous.";

const stepList = [
  "Recherche simplifiée par matière et niveau scolaire",
  "Sélection de tuteurs étudiants recrutés avec soin",
  "Mise en relation basée sur la proximité géographique",
  "Suivi personnalisé de la progression de l'élève",
  "Système d'abonnement flexible et transparent",
  "Évaluation des tuteurs par les parents pour garantir la qualité",
];

const detailOrQuote =
  "Nous croyons en la réussite par l'entraide. En connectant des étudiants passionnés avec des élèves motivés, nous créons un écosystème d'apprentissage dynamique qui profite à toute la communauté locale.";

const About = () => {
  return (
    <section
      className="padding"
      id="about"
      style={{
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <img
        className="background"
        src={image}
        alt={imageAltText}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          display: "block",
        }}
      />

      <div
        style={{
          backgroundColor: "white",
          width: "90%",
          maxWidth: "1000px",
          padding: "clamp(1rem, 4vw, 2rem)",
          margin: "3rem auto",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          boxSizing: "border-box",
          wordBreak: "break-word",
        }}
      >
        <h2 style={{ fontSize: "calc(1.5rem + 1vw)" }}>Pourquoi choisir EduConnect ?</h2>

        <p
          className="large"
          style={{
            fontSize: "calc(0.9rem + 0.4vw)",
            lineHeight: "1.7",
            wordBreak: "break-word",
          }}
        >
          {description}
        </p>

        <hr style={{ margin: "2rem auto", width: "80%" }} />

        <div
          style={{
            textAlign: "left",
            margin: "2rem auto",
            maxWidth: "800px",
            boxSizing: "border-box",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Comment ça marche ?</h3>
          <ul
            style={{
              columns: "auto 2",
              columnGap: "2rem",
              fontSize: "calc(0.85rem + 0.3vw)",
              padding: "0 0.5rem",
              listStylePosition: "inside",
              boxSizing: "border-box",
            }}
          >
            {stepList.map((step) => (
              <li
                key={step}
                style={{
                  marginBottom: "0.75rem",
                  breakInside: "avoid",
                  wordBreak: "break-word",
                }}
              >
                {step}
              </li>
            ))}
          </ul>
        </div>

        <hr style={{ margin: "2rem auto", width: "80%" }} />

        <p
          style={{
            padding: "1rem",
            fontSize: "calc(0.85rem + 0.3vw)",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.7",
            wordBreak: "break-word",
          }}
        >
          {detailOrQuote}
        </p>
      </div>
    </section>
  );
};

export default About;