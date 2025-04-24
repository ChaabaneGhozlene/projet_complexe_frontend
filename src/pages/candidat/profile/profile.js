// src/pages/candidat/profile/profile.js

import React from 'react';
import Header from '../../header/Header';  // Import du Header

const Profile = () => {
    return (
        <div className="dashboard-container">
            
            <div className="main-content">
                <Header />  {/* Afficher le Header */}
                <div className="profile-content">
                    <h2>Mon Profil</h2>
                    <div className="profile-box">
                        <p><strong>Nom:</strong> John Doe</p>
                        <p><strong>Email:</strong> johndoe@example.com</p>
                        <p><strong>Profession:</strong> Développeur Web</p>
                        <p><strong>Experience:</strong> 5 ans</p>
                    </div>
                    {/* Contenu spécifique au profil */}
                </div>
            </div>
        </div>
    );
}

export default Profile;
