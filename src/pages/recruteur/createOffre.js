import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import axios from 'axios';
import './createOffre.css';

const CreateOffreForm = ({ onSave, onCancel, offreToEdit }) => {
  const isEditing = !!offreToEdit;
  const [isSubmitting, setIsSubmitting] = useState(false);  // Nouveau state pour gérer l'état de la soumission

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSubmitting) return; // Si une soumission est déjà en cours, on arrête ici
  
    setIsSubmitting(true);  // Activer l'état de soumission
  
    // Adapter les noms pour qu'ils correspondent à ceux attendus par l'API
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
      profilRecherche: formData.profilRecherche,
      dateExpiration: formData.dateExpiration,
      datePublication: new Date().toISOString()
    };
  
    try {
      const url = isEditing
        ? `http://localhost:8000/offres/${offreToEdit.id}`
        : 'http://localhost:8000/offres/';
      
      const method = isEditing ? 'put' : 'post';
  
      const response = await axios({
        method,
        url,
        data: formDataWithRecruteur,
      });
  
      console.log('Réponse API:', response.data);
  
      // Mise à jour locale sans refaire un fetch
      if (isEditing) {
        // Si c'est une modification, on met à jour localement
        onSave(response.data);
      } else {
        // Si c'est une nouvelle offre, on ajoute à la liste existante
        onSave(response.data);  // Ajouter la nouvelle offre dans l'état parent
      }
      
      // Pas besoin de refaire un fetch si l'état local a été mis à jour
      // onUpdateOffres(response.data); // Cette ligne est supprimée pour éviter le doublon
  
    } catch (error) {
      // Meilleure gestion des erreurs avec messages plus clairs
      if (error.response) {
        console.error('Réponse du serveur:', error.response.data);
        console.error('Status de l\'erreur:', error.response.status);
        alert('Erreur serveur: ' + error.response.data.message); // Exemple de message utilisateur
      } else if (error.request) {
        console.error('Aucune réponse du serveur:', error.request);
        alert('Problème de connexion. Essayez plus tard.');
      } else {
        console.error('Erreur de configuration de la requête:', error.message);
        alert('Erreur: ' + error.message);
      }
    } finally {
      setIsSubmitting(false); 
       // Réactiver l'état de soumission après l'achèvement de la requête
    }
  };
  

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-header">
          <h1 className="form-title">{isEditing ? 'Modifier une Offre' : 'Créer une Nouvelle Offre'}</h1>
          <button className="close-button" onClick={onCancel} aria-label="Fermer le formulaire">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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

          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <h3 className="sub-section-title">Durée du Contrat</h3>
                <input
                  type="text"
                  name="dureeContrat"
                  value={formData.dureeContrat}
                  onChange={handleChange}
                  required
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

          <div className="form-section">
            <h3 className="sub-section-title">Mots-Clés</h3>
            <input
              type="text"
              name="motsCles"
              value={formData.motsCles}
              onChange={handleChange}
              placeholder="React, Node.js..."
              required
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

          <div className="form-actions">
            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting} // Désactive le bouton pendant la soumission
            >
              {isEditing ? 'Modifier l\'Offre' : 'Créer l\'Offre'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="cancel-button"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default CreateOffreForm;