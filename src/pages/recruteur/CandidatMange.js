import React from 'react';
import './CandidateManagement.css';

const OffreDetail = ({ offre, onBack, onAccept, onReject, onViewCV }) => {
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
          <h3>Candidats ({offre.candidats.length})</h3>
          
          {offre.candidats.length > 0 ? (
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
                {offre.candidats.map((candidat) => (
                  <tr key={candidat.id}>
                    <td>{candidat.nom}</td>
                    <td>{candidat.email}</td>
                    <td>
                      <span className={`status ${candidat.statut.toLowerCase()}`}>
                        {candidat.statut}
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
            <p className="no-candidates">Aucun candidat pour cette offre pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

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