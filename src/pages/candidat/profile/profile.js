import React, { useEffect, useState } from 'react';
import Header from '../../header/Header';
import './profile.css';
import { FaEdit } from 'react-icons/fa'; // pour l'icône modifier
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [candidat, setCandidat] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Pour gérer l'état d'édition
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCandidat = async () => {
            const email = localStorage.getItem('candidat_email');
            if (!email) return;

            try {
                const response = await fetch(`http://127.0.0.1:8000/candidats/email/${email}`);
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement du profil");
                }

                const data = await response.json();
                setCandidat(data);
                setFormData({
                    nom: data.nom,
                    prenom: data.prenom,
                    tel: data.tel || "",
                    cv: data.cv || ""
                });
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        fetchCandidat();
    }, []);

    // Gérer la modification des champs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Soumettre les changements
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('candidat_email');

        try {
            const response = await fetch(`http://127.0.0.1:8000/candidats/email/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour du profil");
            }

            const updatedCandidat = await response.json();
            setCandidat(updatedCandidat);
            setIsEditing(false);
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <div className="main-content">
                <Header />  {/* Afficher le Header */}
                <div className="profile-content">
                <div className="profile-header">
                        <h2>Mon Profil</h2>
                        {!isEditing && (
                            <FaEdit
                                className="edit-icon"
                                title="Modifier mon profil"
                                style={{ cursor: 'pointer', marginLeft: '10px' }}
                                onClick={() => setIsEditing(true)}
                            />
                        )}
                    </div>
                    {candidat ? (
                        <div className="profile-box">
                            {isEditing ? (
                                <form onSubmit={handleSubmit}>
                                <div className="input-section">
                                    <label>
                                        Nom:
                                        <input
                                            type="text"
                                            className="input-field"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                        />
                                    </label>
                                    </div>
                                    <div className="input-section">
                                    <label>
                                        Prénom:
                                        <input
                                            type="text"
                                            className="input-field"
                                            name="prenom"
                                            value={formData.prenom}
                                            onChange={handleChange}
                                        />
                                    </label>
                                    </div>
                                    <div className="input-section">
                                    <label>
                                        Téléphone:
                                        <input
                                            type="text"
                                            className="input-field"
                                            name="tel"
                                            value={formData.tel}
                                            onChange={handleChange}
                                        />
                                    </label>
                                    </div>
                                    <div className="input-section">
                                    <label>
                                        CV:
                                        <input
                                            type="text"
                                            className="input-field"
                                            name="cv"
                                            value={formData.cv}
                                            onChange={handleChange}
                                        />
                                    </label>
                                    </div>
                                    <button type="submit" className="submit-btn">Enregistrer</button>
                                </form>
                            ) : (
                                <div>
                                    <p><strong>Nom:</strong> {candidat.nom} {candidat.prenom}</p>
                                    <p><strong>Email:</strong> {candidat.email}</p>
                                    <p><strong>Téléphone:</strong> {candidat.tel || "Non fourni"}</p>
                                    <p><strong>CV:</strong> {candidat.cv || "Aucun CV enregistré"}</p>
                                
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Chargement du profil...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
