import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../header/Header'; // Import Header
import './Dashboard.css';

const DashboardCandidat = () => {
  const location = useLocation();
  const offres = location.state?.offres || [];
  return (
    <div className="dashboard-container">
      {/* Main Content */}
      <div className="main-content">
      <h2>Les offres recommandés d'près votre CV </h2>
        {/* Header */}
        <Header />

        {/* Offers Section */}
        <div className="offers">
        {offres.length > 0 ? (
            offres.map((offre, index) => (
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
