import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        <div className="header-left">
          <img  alt="Khadamni Logo" className="logo" />
          <h1 className="site-title">Khadamni</h1>
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
              <span className="user-icon">👤</span>
              {showUserInfo && (
                <div className="user-info-box">
                  <p><strong>Nom:</strong> John</p>
                  <p><strong>Prénom:</strong> Doe</p>
                  <p><strong>Email:</strong> john.doe@example.com</p>
                </div>
              )}
            </div>
            <i className="notification-icon">🔔🔔</i>
           
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;