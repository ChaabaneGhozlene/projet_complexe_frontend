import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import logoImg from '../../assets/khadamni.jpg';
import { FaUser, FaBell } from 'react-icons/fa';

const Header = () => {

   const [candidat, setCandidat] = useState(null);
 const [formData, setFormData] = useState({});
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const [email, setEmail] = useState("");

  

  const toggleUserInfo = () => setShowUserInfo(!showUserInfo);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  useEffect(() => {
          const fetchCandidat = async () => {
              const emailFromStorage  = localStorage.getItem('candidat_email');
              if (!emailFromStorage ) return;
              setEmail(emailFromStorage); 
              try {
                  const response = await fetch(`http://127.0.0.1:8000/candidats/email/${emailFromStorage}`);
                  if (!response.ok) {
                      throw new Error("Erreur lors du chargement du profil");
                  }
  
                  const data = await response.json();
                  setCandidat(data);
                  setFormData({
                      nom: data.nom,
                      prenom: data.prenom,
                      tel: data.tel || "",
                  });
              } catch (error) {
                  console.error("Erreur:", error);
              }
          };
  
          fetchCandidat();
      }, []);
  
  // 👇 Fermer le popup si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-left">
          <img src={logoImg} className="logo" />
          <nav className="nav-links">
            <a href="/candidat/dashboard-candidat" className="nav-link">Offres</a>
            <a href="/profile" className="nav-link">Profile</a>
          </nav>
        </div>

        <div className="header-right">

          <div className="icons">
            <div
              className="user-icon-container"
              onMouseEnter={toggleUserInfo}
              onMouseLeave={toggleUserInfo}
            >
              <span className="user-icon"><FaUser size={20} color="#2E3244" /></span>
              {showUserInfo && (
                <div className="user-info-box">
                  <p><strong>Nom:</strong> {formData.nom}</p>
                  <p><strong>Prénom:</strong> {formData.prenom}</p>
                  <p><strong>Email:</strong> {email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
