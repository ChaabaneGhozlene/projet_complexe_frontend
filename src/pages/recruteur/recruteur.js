// App.js
import React, { useState, useEffect } from 'react';
import OfferManagement from './OffreManagement';
import CandidateManagement from './CandidatMange';
import './CandidateManagement.css';

import Header from '../header/Header';
import {
  fetchOffres,
  createOffre,
  updateOffre,
  deleteOffre,
  updateCandidatureStatus, 
  getCandidaturesByOffre, 
  //fetchOffreDetail,
 
} from './api'; // adapte le chemin selon l'arborescence

const App = () => {
  const [view, setView] = useState('list');
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [showCV, setShowCV] = useState(null);
  const [offreToEdit, setOffreToEdit] = useState(null);
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    const loadOffres = async () => {
      const data = await fetchOffres();
      console.log("Offres récupérées depuis l'API :", data); // 👈 LOG ICI
      setOffres(data);
    };
    loadOffres();
  }, []);
  

  const handleDeleteOffre = async (offre_id) => {
    await deleteOffre(offre_id);
    const updated = await fetchOffres();
    setOffres(updated);
  };

  const handleEditOffre = (offre) => {
    setOffreToEdit(offre);
    setView('edit');
  };

  const handleSaveOffre = async (offre) => {
    if (offreToEdit) {
      // Mise à jour de l'offre
      await updateOffre(offre.id_offre, offre);
      const updatedOffres = offres.map(o => o.id_offre === offre.id_offre ? offre : o);
      setOffres(updatedOffres);  // Mise à jour de l'état local
    } else {
      // Création d'une nouvelle offre
      const newOffre = await createOffre(offre);
      setOffres(prevOffres => [...prevOffres, newOffre]);  // Ajout de l'offre à la liste existante
    }
    setView('list');
    setOffreToEdit(null);
  };
  
  const handleBackToList = () => {
    setView('list');
  };

 /*onst updateStatutCandidat = async (id_candidature, statut)=>{
    try {
      await updateCandidatureStatus(id_candidature, statut);
      const updatedCandidats = await getCandidaturesByOffre(selectedOffre.id_offre);
  
      const updatedOffres = offres.map(offre => {
        if (offre.id_offre === selectedOffre.id_offre) {
          return { ...offre, candidats: updatedCandidats };
        }
        return offre;
      });
  
      setOffres(updatedOffres);
      // Ajoute un identifiant temporaire pour forcer le refresh
      setSelectedOffre({ ...selectedOffre, candidats: updatedCandidats, updatedAt: new Date().getTime() });
  
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du statut (${statut}) :`, error);
    }
  };
  
  */
 
  
  const refreshCandidatures = async () => {
    const updatedCandidats = await getCandidaturesByOffre(selectedOffre.id_offre);
    setSelectedOffre(prev => ({
      ...prev,
      candidats: updatedCandidats
    }));
  };
  
  const handleAccept = async (id_candidature) => {
    try {
      await updateCandidatureStatus(id_candidature, "Accepte");
      await refreshCandidatures();
    } catch (error) {
      console.error("Erreur lors de l'acceptation :", error);
    }
  };
  
  const handleReject = async (id_candidature) => {
    try {
      await updateCandidatureStatus(id_candidature, "Refuse");
      await refreshCandidatures();
    } catch (error) {
      console.error("Erreur lors du rejet :", error);
    }
  };
  
  

  const handleViewCV = (cvUrl) => {
    setShowCV(cvUrl);
  };

  const handleCloseCV = () => {
    setShowCV(null);
  };

  return (
    <div className="App">
      <Header />
      {view === 'detail' ? (
        <CandidateManagement
          selectedOffre={selectedOffre}
          onBack={handleBackToList}
          onAccept={handleAccept}
          onReject={handleReject}
          onViewCV={handleViewCV}
          showCV={showCV}
          onCloseCV={handleCloseCV}
        />
      ) : (
        <OfferManagement
          offres={offres}
          view={view}
          onCreateOffre={() => setView('create')}
          onViewOffre={async (offre) => {
            try {
              const candidats = await getCandidaturesByOffre(offre.id_offre); // Appel backend
              const offreAvecCandidats = { ...offre, candidats }; // Combine offre + candidats
              setSelectedOffre(offreAvecCandidats); // Stocke tout dans l'état
              setView('detail'); // Affiche les détails de l'offre
            } catch (error) {
              console.error("Erreur lors de la récupération des candidatures :", error);
            }
          }}// ✅ ici
          onSaveOffre={handleSaveOffre}
          onCancelCreate={() => setView('list')}
          onDeleteOffre={handleDeleteOffre}
          onEditOffre={handleEditOffre}
          offreToEdit={offreToEdit}
        />
      )}
    </div>
  );
};

export default App;
