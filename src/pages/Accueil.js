import React from "react";
import { useNavigate } from "react-router-dom";
import './Accueil.css';

const Accueil = () => {
  const navigate = useNavigate();

  return (
    <div className="accueil-container">
      <div className="accueil-text">
        <h1>Welcome To</h1>
        <h2>Khadamni</h2>
      </div>
      <div className="button-group">
        <button onClick={() => navigate("/candidat")}>Candidat</button>
        <button onClick={() => navigate("/recruteur")}>Recruteur</button>
      </div>
    </div>
  );
};


export default Accueil;
