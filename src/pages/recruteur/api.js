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


export const updateOffre = async (id, offre) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, offre);
  return response.data;
};

export const deleteOffre = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
