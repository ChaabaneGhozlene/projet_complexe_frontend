import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight } from 'react-icons/fa';  // Import de l'icône flèche droite
import './candidat.css'; // Assurez-vous d'importer votre fichier CSS

const Candidat = () => {
  const navigate = useNavigate();

  const [cv, setCv] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCv(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setCv(file);
    }
  };

  const handleSubmit = () => {
    if (cv) {
      alert("CV envoyé avec succès !");
    } else {
      alert("Veuillez télécharger votre CV.");
    }
  };

  return (
    <div className="candidat-container">
      <div className="candidat-header">
        <h1>Welcome Candidat</h1>
      </div>

      <div className="candidat-body">
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
              className="file-input"
              id="file-input"
            />
            <div className="file-upload-box">
              {cv ? (
                <p>{cv.name}</p>
              ) : (
                <p>Glissez-déposez ou sélectionnez votre CV</p>
              )}
            </div>
          </label>
          <button onClick={handleSubmit} className="submit-btn">Envoyer</button>
        </div>
      </div>

      {/* Icône de flèche à droite, en bas de la page */}
      <div 
        className="dashboard-link"
        onClick={() => navigate("/candidat/dashboard-candidat")}
      >
        <FaChevronRight size={30} /> {/* Flèche "chevron-right" */}
      </div>
    </div>
  );
};

export default Candidat;
