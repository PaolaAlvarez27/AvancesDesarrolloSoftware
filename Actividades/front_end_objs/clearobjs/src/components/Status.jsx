import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Status = () => {
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8761/objectives')
      .then(response => {
        setObjectives(response.data);
      })
      .catch(error => {
        console.error('Error fetching objectives:', error);
      });
  }, []);

  const completedObjectives = objectives.filter(obj => obj.completed);
  const pastDeadlineObjectives = objectives.filter(obj => 
    !obj.completed && new Date(obj.deadline) < new Date());

  return (
    <div>
      <h2>Estado</h2>
      <h3>Completados</h3>
      <ul>
        {completedObjectives.map(obj => (
          <li key={obj.id}>{obj.name} - {new Date(obj.deadline).toLocaleDateString()}</li>
        ))}
      </ul>
      <h3>Pasados de fecha límite</h3>
      <ul>
        {pastDeadlineObjectives.map(obj => (
          <li key={obj.id}>{obj.name} - {new Date(obj.deadline).toLocaleDateString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default Status;
