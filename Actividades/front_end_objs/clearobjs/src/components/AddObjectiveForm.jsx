import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

const AddObjectiveForm = ({ onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [project, setProject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newObjective = {
      name,
      project,
      deadline,
      visible
    };

    axios.post('http://localhost:8761/objectives', newObjective)
      .then(response => {
        onAdd(response.data);
        onClose();
        swal("Objetivo guardado", "Tu objetivo ha sido guardado exitosamente", "success");
      })
      .catch(error => {
        console.error('Error adding objective:', error);
        swal("Error", "Hubo un error al guardar el objetivo", "error");
      });
  };

  return (
    <div>
      <h2>Añadir Objetivo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Objetivo:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Categorías:</label>
          <input 
            type="text" 
            value={project} 
            onChange={(e) => setProject(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Fecha límite:</label>
          <input 
            type="date" 
            value={deadline} 
            onChange={(e) => setDeadline(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Visible:</label>
          <input 
            type="checkbox" 
            checked={visible} 
            onChange={(e) => setVisible(e.target.checked)} 
          />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default AddObjectiveForm;
