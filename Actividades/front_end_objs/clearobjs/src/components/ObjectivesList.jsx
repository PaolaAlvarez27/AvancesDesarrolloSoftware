import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ObjectivesList.css'; // Asegúrate de tener este archivo para los estilos

const ObjectivesList = ({ onAddClick }) => {
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8761/objectives')
      .then(response => {
        setObjectives(response.data);
      })
      .catch(error => {
        console.error('Error fetching the objectives:', error);
      });
  }, []);

  const toggleComplete = (id) => {
    const updatedObjectives = objectives.map(obj => {
      if (obj.id === id) {
        return { ...obj, completed: !obj.completed };
      }
      return obj;
    });
    setObjectives(updatedObjectives);

    const updatedObjective = updatedObjectives.find(obj => obj.id === id);
    axios.put(`http://localhost:8761/objectives/${id}`, updatedObjective)
      .catch(error => {
        console.error('Error updating objective:', error);
      });
  };

  const isPastDeadline = (deadline) => {
    return new Date(deadline) < new Date();
  };

  return (
    <div className="objectives-list">
      <button onClick={onAddClick}>Añadir objetivo</button>
      <table>
        <thead>
          <tr>
            <th>Objetivo</th>
            <th>Categorías</th>
            <th>Fecha</th>
            <th>Visible</th>
          </tr>
        </thead>
        <tbody>
          {objectives.map((obj) => (
            <tr key={obj.id} className={obj.completed ? 'completed' : isPastDeadline(obj.deadline) ? 'past-deadline' : ''}>
              <td>
                <input
                  type="checkbox"
                  checked={obj.completed}
                  onChange={() => toggleComplete(obj.id)}
                />
                {obj.name}
              </td>
              <td>{obj.project}</td>
              <td>{new Date(obj.deadline).toLocaleDateString()}</td>
              <td>{obj.visible ? 'Sí' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ObjectivesList;

