import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from 'react-icons/fa';
import './candidat.css';

const Candidat = () => {
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState(""); // ← ajoute ceci
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [cv, setCv] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // ← état de chargement

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setCv(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) setCv(file);
  };

  const handleSubmit = async () => {
    if (!cv || !nom || !email || !tel) {
      alert("Veuillez remplir tous les champs, y compris le CV.");
      return;
    }

    setIsLoading(true); // ← démarrer le chargement

    const formData = new FormData();
    formData.append("cv_file", cv);
    const candidatData = {
      nom,
      prenom,
      email,
      tel,
      cv: cv.name,
    };

    try {
      // 1. Créer un candidat en envoyant les données
      const candidatResponse = await fetch("http://127.0.0.1:8000/candidats/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidatData),
      });

      if (!candidatResponse.ok) {
        throw new Error("Erreur lors de l'enregistrement du candidat");
      }

      const candidat = await candidatResponse.json();

      localStorage.setItem("candidat_email", candidat.email);


      // 2. Appeler l'API pour matcher le CV et récupérer les offres
      const cvMatchResponse  = await fetch("http://127.0.0.1:8000/cv/match", {
        method: "POST",
        body: formData,
      });

      if (!cvMatchResponse.ok) {
        throw new Error("Erreur lors de l'envoi du CV");
      }

      const offres = await cvMatchResponse.json();

      // 3. Naviguer vers le tableau de bord avec les offres
      navigate("/candidat/dashboard-candidat", { state: { offres, candidat } });
    } catch (error) {
      alert("Erreur : " + error.message);
    } finally {
      setIsLoading(false); // ← arrêter le chargement
    }
  };

  return (
    <div className="candidat-container">
      <div className="candidat-header">
        <h1>Inscription Candidat</h1>
      </div>

      <div className="candidat-body">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Champs Nom */}
          <div className="input-section">
            <label htmlFor="nom">Nom:</label>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Champs prenom */}
          <div className="input-section">
            <label htmlFor="prenom">Prénom:</label>
            <input
              id="prenom"
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Champs Email */}
          <div className="input-section">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Champs Téléphone */}
          <div className="input-section">
            <label htmlFor="tel">Téléphone:</label>
            <input
              id="tel"
              type="text"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Section pour le CV */}
          <div
            className="upload-section"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <label className="file-label" htmlFor="file-input">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                id="file-input"
                className="file-input"
              />
              <div className="file-upload-box">
                {cv ? <p>{cv.name}</p> : <p>Glissez-déposez ou sélectionnez votre CV</p>}
              </div>
            </label>
          </div>

          {/* Bouton d'envoi */}
          <button onClick={handleSubmit} className="submit-btn" disabled={isLoading}>
            {isLoading ? "Traitement en cours..." : "Envoyer"}
          </button>

          {/* Optionnel : loader graphique */}
          {isLoading && (
            <div className="loader-spinner">
              <p>Analyse du CV, veuillez patienter...</p>
              <div className="spinner"></div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Candidat;
