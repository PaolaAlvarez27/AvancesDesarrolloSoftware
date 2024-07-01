import React from 'react';

const MenuBar = ({ setMenu }) => {
  return (
    <div className="menu-bar">
      <button onClick={() => setMenu('objectives')}>Objetivos</button>
      <button onClick={() => setMenu('projects')}>Proyectos</button>
      <button onClick={() => setMenu('deadlines')}>Fechas límite</button>
      <button onClick={() => setMenu('status')}>Estado</button>
    </div>
  );
};

export default MenuBar;