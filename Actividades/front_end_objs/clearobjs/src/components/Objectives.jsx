import React, { useState } from 'react';
import ObjectivesList from './ObjectivesList';
import AddObjectiveForm from './AddObjectiveForm';

const Objectives = () => {
  const [showForm, setShowForm] = useState(false);
  const [objectives, setObjectives] = useState([]);

  const handleAddObjective = (newObjective) => {
    setObjectives([...objectives, newObjective]);
  };

  return (
    <div>
      {showForm ? (
        <AddObjectiveForm onClose={() => setShowForm(false)} onAdd={handleAddObjective} />
      ) : (
        <ObjectivesList onAddClick={() => setShowForm(true)} />
      )}
    </div>
  );
};

export default Objectives;

