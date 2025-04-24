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
  deleteOffre
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
  

  const handleDeleteOffre = async (offreId) => {
    await deleteOffre(offreId);
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
      await updateOffre(offre.id, offre);
      const updatedOffres = offres.map(o => o.id === offre.id ? offre : o);
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

  const handleAccept = (candidatId) => {
    const updatedOffres = offres.map(offre => {
      if (offre.id === selectedOffre.id) {
        const updatedCandidats = offre.candidats.map(candidat => {
          if (candidat.id === candidatId) {
            return { ...candidat, statut: 'ACCEPTE' };
          }
          return candidat;
        });
        return { ...offre, candidats: updatedCandidats };
      }
      return offre;
    });
    setOffres(updatedOffres);
    setSelectedOffre(updatedOffres.find(o => o.id === selectedOffre.id));
  };

  const handleReject = (candidatId) => {
    const updatedOffres = offres.map(offre => {
      if (offre.id === selectedOffre.id) {
        const updatedCandidats = offre.candidats.map(candidat => {
          if (candidat.id === candidatId) {
            return { ...candidat, statut: 'REJETE' };
          }
          return candidat;
        });
        return { ...offre, candidats: updatedCandidats };
      }
      return offre;
    });
    setOffres(updatedOffres);
    setSelectedOffre(updatedOffres.find(o => o.id === selectedOffre.id));
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
          onViewOffre={(offre) => {
            setSelectedOffre(offre);
            setView('detail');
          }}
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
