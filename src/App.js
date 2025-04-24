import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Candidat from "./pages/candidat/candidat";
import Recruteur from "./pages/recruteur/recruteur";
import DashboardCandidat from './pages/candidat/dashboard-candidat'; // Importer la page DashboardCandidat
import Profile from './pages/candidat/profile/profile';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/candidat" element={<Candidat />} />
        <Route path="/candidat/dashboard-candidat" element={<DashboardCandidat />} />
        <Route path="/recruteur" element={<Recruteur />} />

     

        <Route path="/profile" element={<Profile />} />

      </Routes>
    </Router>
  );
}

export default App;
