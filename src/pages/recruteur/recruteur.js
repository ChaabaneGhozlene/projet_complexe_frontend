import React, { useState } from 'react';
import OfferManagement from './OffreManagement';
import CandidateManagement from './CandidatMange';
import './CandidateManagement.css';

const App = () => {
  const [view, setView] = useState('list'); // 'list', 'detail', 'create'
  const [selectedOffre, setSelectedOffre] = useState(null);
  const [showCV, setShowCV] = useState(null);
  const [offreToEdit, setOffreToEdit] = useState(null);

  const [offres, setOffres] = useState([
    {
      id: 1,
      titre: 'Développeur React.js',
      entreprise: 'Tech Solutions Inc.',
      localisation: 'Paris, France',
      datePublication: '15/04/2023',
      description: 'Nous recherchons un développeur React.js expérimenté pour rejoindre notre équipe. Vous serez responsable du développement de nouvelles fonctionnalités pour nos applications web.',
      candidats: [
        {
          id: 101,
          nom: 'Jean Dupont',
          email: 'jean.dupont@email.com',
          statut: 'EN_ATTENTE',
          cv: 'https://example.com/cv-jean-dupont.pdf'
        },
        {
          id: 102,
          nom: 'Marie Martin',
          email: 'marie.martin@email.com',
          statut: 'ACCEPTE',
          cv: 'https://example.com/cv-marie-martin.pdf'
        }
      ]
    },
    {
      id: 2,
      titre: 'Designer UI/UX',
      entreprise: 'Creative Agency',
      localisation: 'Lyon, France',
      datePublication: '10/04/2023',
      description: 'Nous cherchons un designer UI/UX talentueux pour concevoir des interfaces utilisateur intuitives et esthétiques pour nos clients.',
      candidats: [
        {
          id: 201,
          nom: 'Lucie Bernard',
          email: 'lucie.bernard@email.com',
          statut: 'REJETE',
          cv: 'https://example.com/cv-lucie-bernard.pdf'
        }
      ]
    }
  ]);

  const handleDeleteOffre = (offreId) => {
    setOffres(offres.filter(offre => offre.id !== offreId));
  };

  const handleEditOffre = (offre) => {
    setOffreToEdit(offre);
    setView('edit');
  };

  const handleSaveOffre = (offre) => {
    if (offreToEdit) {
      // Mise à jour d'une offre existante
      setOffres(offres.map(o => o.id === offre.id ? offre : o));
    } else {
      // Création d'une nouvelle offre
      setOffres([...offres, offre]);
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

export default App
