import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import logoImg from '../../assets/khadamni.png';
import { FaUser, FaBell } from 'react-icons/fa';

const Header = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const toggleUserInfo = () => setShowUserInfo(!showUserInfo);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

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
          <input type="text" placeholder="Rechercher..." className="search-bar" />

          <div className="icons">
            <div
              className="user-icon-container"
              onMouseEnter={toggleUserInfo}
              onMouseLeave={toggleUserInfo}
            >
              <span className="user-icon"><FaUser size={20} color="#2E3244" /></span>
              {showUserInfo && (
                <div className="user-info-box">
                  <p><strong>Nom:</strong> John</p>
                  <p><strong>Prénom:</strong> Doe</p>
                  <p><strong>Email:</strong> john.doe@example.com</p>
                </div>
              )}
            </div>

            <div className="notification-icon" onClick={toggleNotifications} ref={notificationRef}>
              <FaBell size={21} color="#F1895C" />
              {showNotifications && (
                <div className="notification-popup">
                  <p><strong>Nouvelle offre :</strong> Développeur React</p>
                  <p><strong>Message :</strong> Votre profil a été vu</p>
                  <p><strong>Rappel :</strong> Entretien demain à 10h</p>
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