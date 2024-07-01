import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import '../Deadlines.css'; // Importa los estilos aquí

const Deadlines = () => {
  const [objectives, setObjectives] = useState([]);
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    axios.get('http://localhost:8761/objectives')
      .then(response => {
        setObjectives(response.data);
      })
      .catch(error => {
        console.error('Error fetching objectives:', error);
      });
  }, []);

  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayObjectives = objectives.filter(objective => 
        new Date(objective.deadline).toLocaleDateString() === date.toLocaleDateString());
      return dayObjectives.length ? (
        <ul>
          {dayObjectives.map(obj => (
            <li key={obj.id}>{obj.name}</li>
          ))}
        </ul>
      ) : null;
    }
  };

  return (
    <div>
      <h2>Fechas límite</h2>
      <Calendar
        onChange={setValue}
        value={value}
        tileContent={getTileContent}
        className="react-calendar"
      />
    </div>
  );
};

export default Deadlines;

