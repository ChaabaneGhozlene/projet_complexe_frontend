import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);

  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
  };

  return (
    <div className="header">
      <input type="text" placeholder="Rechercher..." className="search-bar" />
      <div className="icons">
        <div
          className="user-icon"
          onMouseEnter={toggleUserInfo}
          onMouseLeave={toggleUserInfo}
        >
          👤
          {showUserInfo && (
            <div className="user-info-box">
              <p><strong>Nom:</strong> John</p>

              <p><strong>Prénom:</strong> Doe</p>
            
              <p><strong>Email:</strong> john.doe@example.com</p>
            </div>
          )}
        </div>
        <i className="notification-icon">🔔</i>
      </div>
    </div>
  );
};

export default Header;
