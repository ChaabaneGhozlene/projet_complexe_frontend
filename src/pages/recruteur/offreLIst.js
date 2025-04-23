import React, { useState } from 'react';
import './CandidateManagement.css';



const OffresList = ({ 
    offres, 
    onCreateOffre, 
    onViewOffre,
    onDeleteOffre,
    onEditOffre 
  }) => {
    const [offreASupprimer, setOffreASupprimer] = useState(null);
    
    
    return (
      <div className="container">
        <h1>Gestion des Offres d'Emploi</h1>
        <button className="create-button" onClick={onCreateOffre}>
          Créer une Nouvelle Offre
        </button>
        
        <div className="offres-grid">
          {offres.map((offre) => (
            <div key={offre.id} className="offre-card">
              <div className="offre-card-content" onClick={() => onViewOffre(offre)}>
                <h3>{offre.titre}</h3>
                <p className="company">{offre.entreprise}</p>
                <p className="location">{offre.localisation}</p>
                <p className="date">Publié le: {offre.datePublication}</p>
              </div>
              <div className="offre-actions">
                <button className="edit-button" onClick={(e) => {
                  e.stopPropagation();
                  onEditOffre(offre);
                }}>
                  ✎ 
                </button>
                <button className="delete-button" onClick={(e) => {
                  e.stopPropagation();
                  setOffreASupprimer(offre);
                }}>
                  ❌ 
                </button>
              </div>
            </div>
          ))}
        </div>
  
        {/* Popup de confirmation - en dehors de la grille */}
        {offreASupprimer && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <h3>Confirmer la suppression</h3>
              <p>Voulez-vous vraiment supprimer l'offre "{offreASupprimer.titre}" ?</p>
              <div className="modal-actions">
                <button
                  className="confirm-delete-button"
                  onClick={() => {
                    onDeleteOffre(offreASupprimer.id);
                    setOffreASupprimer(null);
                  }}
                >
                  Oui, supprimer
                </button>
                <button
                  className="cancel-delete-button"
                  onClick={() => setOffreASupprimer(null)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
      
  export default OffresList;