import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  // Utilisation de useState pour gérer le lien actif
  const [activeLink, setActiveLink] = useState('');

  // Fonction pour gérer le clic sur un lien
  const handleLinkClick = (link) => {
    setActiveLink(link); // Mettre à jour l'état de l'élément actif
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Khadamni</h2>
      </div>
      <ul className="menu">
        <li
          onClick={() => handleLinkClick('dashboard')} // Utilisation de handleLinkClick pour gérer l'état actif
          className={activeLink === 'dashboard' ? 'active' : ''}
        >
          <Link to="/candidat/dashboard-candidat">Offres</Link>
        </li>
        <li
          onClick={() => handleLinkClick('profile')} // Utilisation de handleLinkClick pour gérer l'état actif
          className={activeLink === 'profile' ? 'active' : ''}
        >
          <Link to="/profile">Mon Profil</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
