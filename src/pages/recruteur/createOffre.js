import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import axios from 'axios';
import './createOffre.css';

const CreateOffreForm = ({ onSave, onCancel, offreToEdit, resetForm }) => {
  const isEditing = !!offreToEdit;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // État initial du formulaire
  const initialState = {
    titre: '',
    description: '',
    typeContrat: '',
    salaire: '',
    localisation: '',
    dateExpiration: '',
    dureeContrat: '',
    niveauExperience: '',
    motsCles: '',
    typeLieu: ''
  };

  const [formData, setFormData] = useState(initialState);

  // Effet pour gérer les changements d'offreToEdit ET resetForm
  useEffect(() => {
    if (offreToEdit) {
      setFormData({
        titre: offreToEdit.titre || '',
        description: offreToEdit.description || '',
        typeContrat: offreToEdit.typeContrat || '',
        salaire: offreToEdit.salaire || '',
        localisation: offreToEdit.localisation || '',
        dateExpiration: offreToEdit.dateExpiration?.split('T')[0] || '',
        dureeContrat: offreToEdit.duree_contrat || '',
        niveauExperience: offreToEdit.niveau_experience || '',
        motsCles: offreToEdit.mots_cles || '',
        typeLieu: offreToEdit.type_lieu || ''
      });
    } else if (resetForm) {
      // Réinitialisation explicite du formulaire
      setFormData(initialState);
    }
  }, [offreToEdit, resetForm]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const formDataWithRecruteur = {
      titre: formData.titre,
      description: formData.description,
      typeContrat: formData.typeContrat,
      localisation: formData.localisation,
      salaire: formData.salaire,
      duree_contrat: formData.dureeContrat,
      niveau_experience: formData.niveauExperience,
      mots_cles: formData.motsCles,
      type_lieu: formData.typeLieu,
      id_recruteur: 1,
      datePublication: new Date().toISOString()
    };

    try {
      const url = isEditing
        ? `http://localhost:8000/offres/${offreToEdit.id_offre}`
        : 'http://localhost:8000/offres/';
      const method = isEditing ? 'put' : 'post';

      if (!formData.titre || !formData.description || !formData.typeContrat || !formData.salaire || !formData.localisation) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }

      const response = await axios({
        method,
        url,
        data: formDataWithRecruteur,
      });

      onSave(response.data);
    } catch (error) {
      if (error.response) {
        alert('Erreur serveur: ' + error.response.data.message);
      } else if (error.request) {
        alert('Problème de connexion. Essayez plus tard.');
      } else {
        alert('Erreur: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h1 className="form-title">{isEditing ? 'Modifier une Offre' : 'Créer une Nouvelle Offre'}</h1>
          <button className="close-button" onClick={onCancel}>
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Titre */}
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

          {/* Type de Contrat */}
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
              <option value="Contrat d'interim">Contrat d'intérim</option>
              <option value="Contrat d'apprentissage">Contrat d'apprentissage</option>
              <option value="Contrat de professionnalisation">Contrat de professionnalisation</option>
              <option value="Contrat de stage">Contrat de stage</option>
              <option value="Contrat unique d'insertion">Contrat unique d'insertion</option>
              <option value="CTT">CTT</option>
              <option value="Contrat à temps partiel">Contrat à temps partiel</option>
              <option value="portage salarial">portage salarial</option>
              <option value="auto-entrepreneur">auto-entrepreneur</option>
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

          {/* Durée & Expiration */}
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
            </div>
          </div>

          {/* Niveau & Type Lieu */}
          <div className="form-row">
            <div className="form-group">
              <h3 className="sub-section-title">Niveau d'expérience</h3>
              <select
                name="niveauExperience"
                value={formData.niveauExperience}
                onChange={handleChange}
                required
                className="uniform-input"
              >
                <option value="">Sélectionner</option>
                <option value="Debutant">Débutant</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Etudiant">Étudiant</option>
              </select>
            </div>
            <div className="form-group">
              <h3 className="sub-section-title">Type de Lieu</h3>
              <select
                name="typeLieu"
                value={formData.typeLieu}
                onChange={handleChange}
                required
                className="uniform-input"
              >
                <option value="">Sélectionner</option>
                <option value="Hybride">Hybride</option>
                <option value="Sur site">Sur site</option>
                <option value="A distance">À distance</option>
              </select>
            </div>
          </div>

          {/* Mots Clés */}
          <div className="form-section">
            <h3 className="sub-section-title">Mots-Clés</h3>
            <input
              type="text"
              name="motsCles"
              value={formData.motsCles}
              onChange={handleChange}
              className="uniform-input"
              required
            />
          </div>

          {/* Description */}
          <div className="form-section">
            <h2 className="section-title">Description</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="uniform-input uniform-textarea"
              required
            />
          </div>

          {/* Boutons */}
          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isEditing ? 'Modifier l\'Offre' : 'Créer l\'Offre'}
            </button>
            <button type="button" onClick={onCancel} className="cancel-button">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOffreForm;
