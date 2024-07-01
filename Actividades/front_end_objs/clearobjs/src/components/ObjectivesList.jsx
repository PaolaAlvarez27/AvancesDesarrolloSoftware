import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ObjectivesList.css'; // Asegúrate de tener este archivo para los estilos

const ObjectivesList = ({ onAddClick }) => {
  const [objectives, setObjectives] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editObjective, setEditObjective] = useState({});

  useEffect(() => {
    fetchObjectives();
  }, []);

  const fetchObjectives = () => {
    axios.get('http://localhost:8761/objectives')
      .then(response => {
        setObjectives(response.data);
      })
      .catch(error => {
        console.error('Error fetching objectives:', error);
      });
  };

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

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8761/objectives/${id}`)
      .then(() => {
        fetchObjectives();
      })
      .catch(error => {
        console.error('Error deleting objective:', error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditObjective({
      ...editObjective,
      [name]: value,
    });
  };

  const handleEditSave = (id) => {
    axios.put(`http://localhost:8761/objectives/${id}`, editObjective)
      .then(() => {
        setIsEditing(null);
        fetchObjectives();
      })
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
            <th>Proyecto</th>
            <th>Fecha límite</th>
            <th>Visible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {objectives.map((obj) => (
            <tr key={obj.id} className={obj.completed ? 'completed' : isPastDeadline(obj.deadline) ? 'past-deadline' : ''}>
              {isEditing === obj.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editObjective.name || ''}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="project"
                      value={editObjective.project || ''}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      name="deadline"
                      value={editObjective.deadline || ''}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="visible"
                      checked={editObjective.visible || false}
                      onChange={(e) => setEditObjective({
                        ...editObjective,
                        visible: e.target.checked,
                      })}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleEditSave(obj.id)}>Guardar</button>
                    <button onClick={() => setIsEditing(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
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
                  <td>
                    <button onClick={() => {
                      setIsEditing(obj.id);
                      setEditObjective(obj);
                    }}>Editar</button>
                    <button onClick={() => handleDelete(obj.id)}>Eliminar</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ObjectivesList;

