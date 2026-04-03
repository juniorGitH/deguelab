/**
 * Degue Lab - Application React
 * Boutique en ligne de Degue et Yaourt Premium
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Degue Lab Components
import DegueLabNav from "./Components/DegueLabNav";
import DegueLabFooter from "./Components/DegueLabFooter";
import DegueLabHome from "./Components/DegueLabHome";
import DegueLabProducts from "./Components/DegueLabProducts";
import DegueLabAbout from "./Components/DegueLabAbout";

// Styles
import "./index.css";

// Layout principal avec DegueLabNav et DegueLabFooter
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <DegueLabNav />
      <main className="flex-grow">{children}</main>
      <DegueLabFooter />
    </div>
  );
};

const App = () => {
  const basename = window.location.pathname.startsWith("/deguelab") ? "/deguelab" : "/";

  return (
    <Router basename={basename} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Layout><DegueLabHome /></Layout>} />
        
        {/* Page Produits */}
        <Route path="/products" element={<Layout><DegueLabProducts /></Layout>} />
        
        {/* Page À Propos */}
        <Route path="/about" element={<Layout><DegueLabAbout /></Layout>} />
        
        {/* Route de fallback */}
        <Route path="*" element={<Layout><DegueLabHome /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
