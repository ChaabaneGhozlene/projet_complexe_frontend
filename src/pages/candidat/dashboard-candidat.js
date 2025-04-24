import React from 'react';
import Header from '../header/Header'; // Import Header
import './Dashboard.css';

const DashboardCandidat = () => {
  return (
    <div className="dashboard-container">
    
     

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <Header />

        {/* Offers Section */}
        <div className="offers">
          <div className="offer-card">
            <h3>Offre 1</h3>
            <p><strong>Entreprise:</strong> ABC Corp</p>
            <p><strong>Lieu:</strong> Tunis</p>
            <p><strong>Date:</strong> 01/01/2025</p>
          </div>

          <div className="offer-card">
            <h3>Offre 2</h3>
            <p><strong>Entreprise:</strong> XYZ Ltd</p>
            <p><strong>Lieu:</strong> Sfax</p>
            <p><strong>Date:</strong> 15/02/2025</p>
          </div>

          <div className="offer-card">
            <h3>Offre 3</h3>
            <p><strong>Entreprise:</strong> TechSolutions</p>
            <p><strong>Lieu:</strong> Nabeul</p>
            <p><strong>Date:</strong> 10/03/2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCandidat;
