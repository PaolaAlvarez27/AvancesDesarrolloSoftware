import React from 'react';
import { Link } from 'react-router-dom';
import '../MenuBar.css'; // Asegúrate de crear este archivo para los estilos

const MenuBar = () => {
  return (
    <div className="menu-bar">
      <Link to="/objectives" className="menu-link">Objetivos</Link>
      <Link to="/projects" className="menu-link">Proyectos</Link>
      <Link to="/deadlines" className="menu-link">Fechas límite</Link>
      <Link to="/status" className="menu-link">Estado</Link>
      <Link to="/monthly-load" className="menu-link">Objetivos por período</Link>
      <Link to="/completion-percentage" className="menu-link">Razón de cumplimiento</Link>
    </div>
  );
};

export default MenuBar;
