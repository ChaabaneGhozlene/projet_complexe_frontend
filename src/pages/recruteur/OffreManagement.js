import React from 'react';
import OffresList from './offreLIst';
import CreateOffreForm from './createOffre';
  

const OfferManagement = ({ 
  offres, 
  onCreateOffre, 
  onViewOffre,
  view,
  onSaveOffre,
  onCancelCreate,
  onDeleteOffre,
  onEditOffre,
  offreToEdit
}) => {
  return (
    <>
      {view === 'list' && (
        <OffresList 
          offres={offres} 
          onCreateOffre={onCreateOffre}
          onViewOffre={onViewOffre}
          onDeleteOffre={onDeleteOffre}
          onEditOffre={onEditOffre}
        />
      )}
      
      {(view === 'create' || view === 'edit') && (
        <CreateOffreForm 
          onSave={onSaveOffre}
          onCancel={onCancelCreate}
          offreToEdit={offreToEdit}
        />
      )}
    </>
  );
};

export default OfferManagement;