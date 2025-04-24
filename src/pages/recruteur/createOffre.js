import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

import './createOffre.css';

const CreateOffreForm = ({ onSave, onCancel, offreToEdit }) => {
  const isEditing = !!offreToEdit;

  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    typeContrat: '',
    salaire: '',
    localisation: '',
    dateExpiration: '',
    dureeContrat: '',
    profilRecherche: '',
    niveauExperience: '',
    motsCles: '',
    typeLieu: '',
    ...offreToEdit
  });

  
  useEffect(() => {
    if (offreToEdit) {
      setFormData(prev => ({ ...prev, ...offreToEdit }));
    }
  }, [offreToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      datePublication: isEditing ? formData.datePublication : new Date().toLocaleDateString(),
    });
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h1 className="form-title">{isEditing ? 'Modifier une Offre' : 'Créer une Nouvelle Offre'}</h1>
          <button 
  className="close-button" 
  onClick={onCancel}
  aria-label="Fermer le formulaire"
>
  <FiX size={20} />
</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Section Titre */}
          <div className="form-section">
            <h2 className="section-title">Titre de l'offre</h2>
            <input 
              type="text" 
              name="titre" 
              value={formData.titre} 
              onChange={handleChange} 
              required 
              className="uniform-input"
            />
          </div>

          {/* Section Type de Contrat, Salaire, Localisation */}
          <div className="form-section">
            <h2 className="section-title">Type de Contrat</h2>
            <select 
              name="typeContrat" 
              value={formData.typeContrat} 
              onChange={handleChange} 
              required
              className="uniform-input"
            >
              <option value="">Sélectionner</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
              <option value="Freelance">Freelance</option>
              <option value="Alternance">Alternance</option>
            </select>

            <div className="form-row">
              <div className="form-group">
                <h3 className="sub-section-title">Salaire</h3>
                <input 
                  type="text" 
                  name="salaire" 
                  value={formData.salaire} 
                  onChange={handleChange} 
                  className="uniform-input"
                />
              </div>
              <div className="form-group">
                <h3 className="sub-section-title">Localisation</h3>
                <input 
                  type="text" 
                  name="localisation" 
                  value={formData.localisation} 
                  onChange={handleChange} 
                  required 
                  className="uniform-input"
                />
              </div>
            </div>
          </div>

          <div className="divider"></div>

          {/* Section Durée du Contrat et Date d'expiration */}
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <h3 className="sub-section-title">Durée du Contrat</h3>
                <input 
                  type="text" 
                  name="dureeContrat" 
                  value={formData.dureeContrat} 
                  onChange={handleChange} 
                  className="uniform-input"
                />
              </div>
              <div className="form-group">
                <h3 className="sub-section-title">Date d'expiration</h3>
                <input 
                  type="date" 
                  name="dateExpiration" 
                  value={formData.dateExpiration} 
                  onChange={handleChange} 
                  className="uniform-input"
                />
              </div>
            </div>
          </div>

          {/* Section Niveau d'expérience et Type de Lieu */}
          <div className="form-row">
            <div className="form-group">
              <h3 className="sub-section-title">Niveau d'expérience</h3>
              <select 
                name="niveauExperience" 
                value={formData.niveauExperience} 
                onChange={handleChange}
                className="uniform-input"
              >
                <option value="">Sélectionner</option>
                <option value="Débutant">Débutant</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Confirmé">Confirmé</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div className="form-group">
              <h3 className="sub-section-title">Type de Lieu</h3>
              <select 
                name="typeLieu" 
                value={formData.typeLieu} 
                onChange={handleChange}
                className="uniform-input"
              >
                <option value="">Sélectionner</option>
                <option value="Télétravail">Télétravail</option>
                <option value="Présentiel">Présentiel</option>
                <option value="Hybride">Hybride</option>
              </select>
            </div>
          </div>

          <div className="divider"></div>

          {/* Section Mots-Clés et Profil Recherché */}
          <div className="form-section">
            <h3 className="sub-section-title">Mots-Clés</h3>
            <input 
              type="text" 
              name="motsCles" 
              value={formData.motsCles} 
              onChange={handleChange} 
              placeholder="React, Node.js..." 
              className="uniform-input"
            />

            <h3 className="sub-section-title">Profil Recherché</h3>
            <textarea 
              name="profilRecherche" 
              value={formData.profilRecherche} 
              onChange={handleChange} 
              className="uniform-input uniform-textarea"
            />
          </div>

          <div className="divider"></div>

          {/* Section Description */}
          <div className="form-section">
            <h2 className="section-title">Description</h2>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              className="uniform-input large-textarea"
            />
          </div>

          {/* Bouton Enregistrer seulement */}
          <div className="form-actions">
            <button type="submit" className="save-button">
              {isEditing ? 'Mettre à jour' : 'Enregistrer'} l'offre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOffreForm;