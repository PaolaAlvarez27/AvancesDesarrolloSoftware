import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import Objectives from './components/Objectives';
import Projects from './components/Projects';
import Deadlines from './components/Deadlines';
import Status from './components/Status';
import MonthlyLoad from './components/MonthlyLoad';
import CompletionPercentage from './components/CompletionPercentage';

const App = () => {
  return (
    <Router>
      <div>
        <MenuBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Objectives />} />
            <Route path="/objectives" element={<Objectives />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/deadlines" element={<Deadlines />} />
            <Route path="/status" element={<Status />} />
            <Route path="/monthly-load" element={<MonthlyLoad />} />
            <Route path="/completion-percentage" element={<CompletionPercentage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
