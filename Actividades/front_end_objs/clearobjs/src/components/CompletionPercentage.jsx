import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const CompletionPercentage = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8761/objectives')
      .then(response => {
        const objectives = response.data;
        let completed = 0;
        let pending = 0;
        let overdue = 0;

        objectives.forEach(obj => {
          if (obj.completed) {
            completed += 1;
          } else if (new Date(obj.deadline) < new Date()) {
            overdue += 1;
          } else {
            pending += 1;
          }
        });

        setChartData({
          labels: ['Cumplidos', 'Pendientes', 'Vencidos'],
          datasets: [{
            data: [completed, pending, overdue],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }]
        });
      })
      .catch(error => {
        console.error('Error fetching objectives:', error);
      });
  }, []);

  return (
    <div>
      <h2>Porcentaje de cumplimiento</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default CompletionPercentage;
