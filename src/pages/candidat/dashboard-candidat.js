import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../header/Header';
import './Dashboard.css';

const DashboardCandidat = () => {
  const location = useLocation();
  const offres = location.state?.offres || [];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOffres = offres.filter((offre) =>
    offre.titre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <Header />

      <div className="main-content">
        {/* Champ de recherche */}
        <input
          type="text"
          placeholder="Rechercher une offre par titre..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <h2>Les offres recommandées d’après votre CV</h2>

        
        {/* Liste des offres filtrées */}
        <div className="offers">
          {filteredOffres.length > 0 ? (
            filteredOffres.map((offre, index) => (
              <div className="offer-card" key={index}>
                <h3>{offre.titre}</h3>
                <p><strong>Lieu:</strong> {offre.localisation}</p>
                <p><strong>Date:</strong> {new Date(offre.date_publication).toLocaleDateString()}</p>
                <p><strong>Score de pertinence:</strong> {(offre.score * 100).toFixed(2)}%</p>
              </div>
            ))
          ) : (
            <p>Aucune offre trouvée.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCandidat;
