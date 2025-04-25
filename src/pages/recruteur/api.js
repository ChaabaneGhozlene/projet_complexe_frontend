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
// api.js

export const updateCandidatureStatus = async (id_candidature, statut) => {
  try {
    const response = await fetch(`http://localhost:8000/candidatures/${id_candidature}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Ajoute ici un header Authorization si tu utilises un token JWT
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ statut }), // le corps doit correspondre au schéma `CandidatureUpdate`
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de la candidature :', error);
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

// api.js

export const getCV = async () => {
  try {
    const response = await fetch("http://localhost:8000/get_cv");
    
    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement du CV');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CV_NadaMorghom.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Erreur API : ', error);
    throw error;
  }
};
