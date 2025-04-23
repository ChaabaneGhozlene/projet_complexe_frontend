import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Candidat from "./pages/candidat/candidat";
import Recruteur from "./pages/recruteur/recruteur";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/candidat" element={<Candidat />} />
        <Route path="/recruteur" element={<Recruteur />} />

      </Routes>
    </Router>
  );
}

export default App;
