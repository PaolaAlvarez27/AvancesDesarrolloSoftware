import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const MonthlyLoad = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8761/objectives')
      .then(response => {
        const objectives = response.data;
        const monthlyCounts = {};
        const dailyCounts = {};

        objectives.forEach(obj => {
          const month = new Date(obj.deadline).toLocaleString('default', { month: 'long' });
          const day = new Date(obj.deadline).getDate();

          if (!monthlyCounts[month]) {
            monthlyCounts[month] = 0;
          }
          if (!dailyCounts[day]) {
            dailyCounts[day] = 0;
          }

          monthlyCounts[month] += 1;
          dailyCounts[day] += 1;
        });

        setMonthlyData({
          labels: Object.keys(monthlyCounts),
          datasets: [{
            label: 'Objetivos por mes',
            data: Object.values(monthlyCounts),
            backgroundColor: 'rgba(75, 192, 192, 0.6)'
          }]
        });

        setDailyData({
          labels: Object.keys(dailyCounts),
          datasets: [{
            label: 'Objetivos por día',
            data: Object.values(dailyCounts),
            backgroundColor: 'rgba(153, 102, 255, 0.6)'
          }]
        });
      })
      .catch(error => {
        console.error('Error fetching objectives:', error);
      });
  }, []);

  return (
    <div>
      <h2>Carga mensual</h2>
      <div>
        <h3>Objetivos por mes</h3>
        <Bar data={monthlyData} />
      </div>
      <div>
        <h3>Objetivos por día</h3>
        <Bar data={dailyData} />
      </div>
    </div>
  );
};

export default MonthlyLoad;
