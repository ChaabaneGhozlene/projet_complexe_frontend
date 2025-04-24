// api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/offres'; // adapte à ton backend

export const fetchOffres = async () => {
    try {
      console.log("→ Appel API fetchOffres"); // log
      const response = await axios.get('http://localhost:8000/offres/');
      console.log("→ Résultat fetchOffres :", response.data); // log
      return response.data;
    } catch (error) {
      console.error("Erreur dans fetchOffres :", error); // log
      return [];
    }
  };
  
  
  export const createOffre = async (offre) => {
    try {
        // Envoie l'objet offre dans la requête POST
        const response = await axios.post('http://localhost:8000/offres/', offre);
        console.log('Offre créée avec succès :', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'offre:', error);
        if (error.response && error.response.data) {
            console.error('Erreur de validation côté serveur:', error.response.data);
        }
        throw error;
    }
};


export const updateOffre = async (id_offre, offre) => {
  const response = await axios.put(`http://localhost:8000/offres/${id_offre}`, offre);
  return response.data;
};


export const deleteOffre = async (id_offre) => {
  await axios.delete(`${API_BASE_URL}/${id_offre}`);  // Utilise id_offre ici
};

// ----------------------------
// API Candidatures
// ----------------------------

const CANDIDATURES_API_URL = 'http://localhost:8000/candidatures';

export const getCandidaturesByOffre = async (id_offre) => {
  try {
    const response = await axios.get(`${CANDIDATURES_API_URL}/offre/${id_offre}`);
    console.error('Erreur lors de la récupération des candidatures :', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des candidatures :', error);
    return [];
  }
};
export const updateCandidatureStatus = async (id_candidature, statut) => {
  try {
    const response = await axios.patch(
      `${CANDIDATURES_API_URL}/${id_candidature}/statut`,
      { statut }, // on envoie un objet JSON
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du statut pour la candidature ${id_candidature} :`, error);
    throw error;
  }
};

export const fetchOffreDetail = async (id_offre) => {
  const response = await fetch(`${API_BASE_URL}/${id_offre}`);
  if (!response.ok) throw new Error('Erreur lors de la récupération des détails de l\'offre');
  return await response.json();
};
// Exemple de fonction pour récupérer un candidat
export const getCandidatById = async (id) => {
  const response = await axios.get(`http://localhost:8000/candidats/${id}`);
  return response.data;
};