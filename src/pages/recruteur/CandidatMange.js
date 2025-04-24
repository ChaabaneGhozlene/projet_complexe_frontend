import React, { useState } from 'react';
import './CandidateManagement.css';

const OffreDetail = ({ offre, onBack, onAccept, onReject, onViewCV }) => {
  const [filter, setFilter] = useState('TOUS'); // 'TOUS', 'ACCEPTE', 'REJETE', 'EN_ATTENTE'

  const formatStatut = (statut) => {
    switch(statut) {
      case 'EN_ATTENTE': return 'ENLATITRITE';
      case 'ACCEPTE': return 'ACCEPTE';
      case 'REJETE': return 'REJETE';
      default: return statut;
    }
  };

  // Filtrer les candidats selon le filtre sélectionné
  const filteredCandidats = offre.candidats.filter(candidat => {
    if (filter === 'TOUS') return true;
    return candidat.statut === filter;
  });

  return (
    <div className="container">
      <button className="back-button" onClick={onBack}>
        ← Retour à la liste
      </button>
      
      <div className="offre-detail">
        <h2>{offre.titre}</h2>
        <p className="company">{offre.entreprise}</p>
        <p className="location">{offre.localisation}</p>
        <p className="date">Publié le: {offre.datePublication}</p>
        
        <div className="description">
          <h3>Description de l'offre</h3>
          <p>{offre.description}</p>
        </div>
        
        <div className="candidats-section">
          <div className="filter-controls">
            <h3>Candidats ({filteredCandidats.length}/{offre.candidats.length})</h3>
            <div className="filter-select">
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="status-filter"
              >
                <option value="TOUS">Tous les candidats</option>
                <option value="ACCEPTE">Acceptés</option>
                <option value="REJETE">Rejetés</option>
                <option value="EN_ATTENTE">En attente</option>
              </select>
            </div>
          </div>
          
          {filteredCandidats.length > 0 ? (
            <table className="candidats-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidats.map((candidat) => (
                  <tr key={candidat.id}>
                    <td>{candidat.nom}</td>
                    <td>{candidat.email}</td>
                    <td>
                      <span className={`status ${candidat.statut.toLowerCase()}`}>
                        {formatStatut(candidat.statut)}
                      </span>
                    </td>
                    <td className="actions">
                      {candidat.statut === 'EN_ATTENTE' && (
                        <>
                          <button 
                            className="accept-button" 
                            onClick={() => onAccept(candidat.id)}
                          >
                            Accepter
                          </button>
                          <button 
                            className="reject-button" 
                            onClick={() => onReject(candidat.id)}
                          >
                            Rejeter
                          </button>
                        </>
                      )}
                      <button 
                        className="view-cv-button" 
                        onClick={() => onViewCV(candidat.cv)}
                      >
                        Voir CV
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-candidates">
              Aucun candidat {filter !== 'TOUS' ? `avec le statut "${formatStatut(filter)}"` : ''} pour cette offre.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ... (CVModal et CandidateManagement restent inchangés)

// ... (le reste du code reste inchangé, CVModal et CandidateManagement)

const CVModal = ({ cvUrl, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>×</button>
        <iframe 
          src={cvUrl} 
          title="CV du candidat" 
          className="cv-iframe"
        ></iframe>
      </div>
    </div>
  );
};

const CandidateManagement = ({ 
  selectedOffre, 
  onBack, 
  onAccept, 
  onReject, 
  onViewCV, 
  showCV, 
  onCloseCV 
}) => {
  return (
    <>
      {selectedOffre && (
        <OffreDetail 
          offre={selectedOffre}
          onBack={onBack}
          onAccept={onAccept}
          onReject={onReject}
          onViewCV={onViewCV}
        />
      )}
      
      {showCV && (
        <CVModal 
          cvUrl={showCV} 
          onClose={onCloseCV}
        />
      )}
    </>
  );
};

export default CandidateManagement;