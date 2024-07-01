import React, { useState } from 'react';
import MenuBar from './components/MenuBar';
import Objectives from './components/Objectives';
import Projects from './components/Projects';
import Deadlines from './components/Deadlines';
import Status from './components/Status';
import MonthlyLoad from './components/MonthlyLoad';
import CompletionPercentage from './components/CompletionPercentage';

const App = () => {
  const [menu, setMenu] = useState('objectives');

  const renderContent = () => {
    switch (menu) {
      case 'objectives':
        return <Objectives />;
      case 'projects':
        return <Projects />;
      case 'deadlines':
        return <Deadlines />;
      case 'status':
        return <Status />;
      case 'monthly-load':
        return <MonthlyLoad />;
      case 'completion-percentage':
        return <CompletionPercentage />;
      default:
        return <Objectives />;
    }
  };

  return (
    <div>
      <MenuBar setMenu={setMenu} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;