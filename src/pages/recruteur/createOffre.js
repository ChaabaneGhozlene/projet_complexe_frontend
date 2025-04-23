import React, { useState, useEffect } from 'react';
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

  /*const renderInput = (label, name, placeholder = '', required = false, type = 'text') => (
    
    <div className={`form-group${required ? ' required' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );

  const renderSelect = (label, name, options, required = false) => (
    <div className={`form-group${required ? ' required' : ''}`}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
      >
        <option value="">Sélectionner</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
*/
return (
    <div className="container">
      <h2>Créer une Nouvelle Offre</h2>
      <form onSubmit={handleSubmit} className="offre-form">

        <div className="form-row">
          <div className="form-group">
            <label>Titre de l'offre</label>
            <input type="text" name="titre" value={formData.titre} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Type de Contrat</label>
            <select name="typeContrat" value={formData.typeContrat} onChange={handleChange} required>
              <option value="">Sélectionner</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
              <option value="Freelance">Freelance</option>
              <option value="Alternance">Alternance</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Salaire</label>
            <input type="text" name="salaire" value={formData.salaire} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Localisation</label>
            <input type="text" name="localisation" value={formData.localisation} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Durée du Contrat</label>
            <input type="text" name="duree_contrat" value={formData.duree_contrat} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Date d'expiration</label>
            <input type="date" name="date_expiration" value={formData.date_expiration} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Niveau d'expérience</label>
            <select name="niveau_experience" value={formData.niveau_experience} onChange={handleChange}>
              <option value="">Sélectionner</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Confirmé">Confirmé</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div className="form-group">
            <label>Type de Lieu</label>
            <select name="type_lieu" value={formData.type_lieu} onChange={handleChange}>
              <option value="">Sélectionner</option>
              <option value="Télétravail">Télétravail</option>
              <option value="Présentiel">Présentiel</option>
              <option value="Hybride">Hybride</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Mots-Clés</label>
            <input type="text" name="mots_cles" value={formData.mots_cles} onChange={handleChange} placeholder="React, Node.js..." />
          </div>

          <div className="form-group">
            <label>Profil Recherché</label>
            <textarea name="profil_recherche" value={formData.profil_recherche} onChange={handleChange} rows="3" />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="5" required />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>Annuler</button>
          <button type="submit" className="save-button">Enregistrer l'offre</button>
        </div>
      </form>
    </div>
  );
};
export default CreateOffreForm;
