import React, { useState ,useEffect} from 'react';
import './CandidateManagement.css';
import {
  getCandidatById
 
} from './api';

const OffreDetail = ({ offre, onBack,  onAccept, onReject }) => {
  const [filter, setFilter] = useState('TOUS'); 
     // ✅ Empêche les erreurs si l'offre ou les candidats sont manquants
     console.log("Offre reçue :", offre);
     
      
  
     if (!offre || !offre.candidats) {
      return <p className="no-candidates">Chargement de l'offre ou pas de candidats disponibles...</p>;
    }
    const formatStatut = (statut) => {
      switch (statut) {
        case 'EN_ATTENTE':
        case 'En_cours':
        case 'En cours':
          return 'En cours';
        case 'REJETE':
        case 'Refuse':
        case 'Refusé':
          return 'Refusé';
        case 'ACCEPTE':
        case 'Accepte':
          return 'Accepté';
        default:
          return statut;
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
       
        <p className="date">Publié le: {offre.date_publication}</p>
        
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
  <option value="Accepté">Acceptés</option>
  <option value="Refusé">Rejetés</option>
  <option value="En cours">En attente</option>
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
                  <tr key={candidat.id_candidat}>
                    <td>{candidat.nom}   {candidat.prenom}</td>
                    <td>{candidat.email}</td>
                    <td>
                      <span className={`statut ${candidat.statut.toLowerCase()}`}>
                        {formatStatut(candidat.statut)}
                      </span>
                    </td>
                    <td className="actions">
                      {candidat.statut === 'En cours'&&(
                        <>
                          <button 
                            className="accept-button" 
                            onClick={() => onAccept(candidat.id_candidature)}
                          >
                            Accepter
                          </button>
                          <button 
                            className="reject-button" 
                            onClick={() => onReject(candidat.id_candidature)}
                          >
                            Rejeter
                          </button>
                        </>
                      )}




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





const CandidateManagement = ({ 
  selectedOffre, 
  onBack, 
  onAccept, 
  onReject, 
  onViewCV, 
  showCV, 
  onCloseCV 
}) => {
  const [offreEnrichie, setOffreEnrichie] = useState(null);

  useEffect(() => {
    const enrichirCandidats = async () => {
      if (!selectedOffre || !selectedOffre.candidats) return;
      const enriched = await Promise.all(
        selectedOffre.candidats.map(async (c) => {
          const details = await getCandidatById(c.id_candidat);
          return { ...c, ...details }; // fusionne les données de base avec les infos nom/prenom
        })
      );
      setOffreEnrichie({ ...selectedOffre, candidats: enriched }); // ✅
    };

    enrichirCandidats();
  }, [selectedOffre]);

  return (
    <>
      {selectedOffre && (
        <OffreDetail 
        offre={offreEnrichie || selectedOffre}
          onBack={onBack}
          onAccept={onAccept}
          onReject={onReject}
          onViewCV={onViewCV}
        />
      )}
      
      
    </>
  );
};

export default CandidateManagement;