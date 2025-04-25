import React, { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';


import './CandidateManagement.css';

const OffresList = ({ 
  offres, 
  onCreateOffre, 
  onViewOffre,
  onDeleteOffre,
  onEditOffre 
}) => {
  const [offreASupprimer, setOffreASupprimer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fonction de filtrage des offres par titre seulement
  const filteredOffres = offres.filter(offre => 
    offre.titre.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="container">
      <h1>Gestion des Offres d'Emploi</h1>
      
      <div className="search-and-create">
        
        <div className="search-bar-container">
        

          <input 
            type="text"
            placeholder=" Rechercher par titre d'offre..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          className="create-button"
          onClick={onCreateOffre}
          aria-label="Créer une nouvelle offre d'emploi"
        >
          <Plus size={18} className="button-icon" />
          <span>Créer une Nouvelle Offre</span>
        </button>
      </div>
      
      <div className="offres-grid">
        {filteredOffres.length > 0 ? (
          filteredOffres.map((offre) => (
            <div key={offre.id} className="offre-card">
              <div className="offre-card-content" onClick={() => onViewOffre(offre)}>
                <h3>{offre.titre}</h3>
                <p className="company">{offre.entreprise}</p>
                <p className="location">{offre.localisation}</p>
                <p className="date">Publié le: {offre.date_publication}</p>
              </div>
              <div className="offre-actions">
                <button className="edit-button" onClick={(e) => {
                  e.stopPropagation();
                  onEditOffre(offre);  // On edit the offer
                }}>
                  <Pencil size={18} color="#ACC572" />
                </button>
                <button className="delete-button" onClick={(e) => {
                  e.stopPropagation();
                  setOffreASupprimer(offre);  // On set the offer to be deleted
                }}>
                  <Trash2 size={18} color="#e74c3c"/>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            Aucune offre ne correspond à votre recherche.
          </div>
        )}
      </div>

      {/* Popup de confirmation pour la suppression */}
      {offreASupprimer && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3>Confirmer la suppression</h3>
            <p>Voulez-vous vraiment supprimer l'offre "{offreASupprimer.titre}" ?</p>
            <div className="modal-actions">
              <button
                className="confirm-delete-button"
                onClick={() => {
                  onDeleteOffre(offreASupprimer.id_offre);  // On delete the offer
                  setOffreASupprimer(null);  // Reset the delete confirmation state
                }}
              >
                Oui, supprimer
              </button>
              <button
                className="cancel-delete-button"
                onClick={() => setOffreASupprimer(null)}  // Close modal if cancelled
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
