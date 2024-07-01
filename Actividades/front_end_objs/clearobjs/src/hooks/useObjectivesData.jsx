import { useState, useEffect } from 'react';
import axios from 'axios';

const generateColor = (seed) => {
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  return colors[seed % colors.length];
};

const useObjectivesData = () => {
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
  const [dailyData, setDailyData] = useState({ labels: [], datasets: [] });
  const [completionData, setCompletionData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('http://localhost:8761/objectives')
      .then(response => {
        const objectives = response.data;
        const monthlyCounts = {};
        const dailyCounts = {};
        let completed = 0;
        let pending = 0;
        let overdue = 0;

        objectives.forEach(obj => {
          const deadline = new Date(obj.deadline);
          const month = deadline.toLocaleString('default', { month: 'long' });
          const day = deadline.getDate();

          if (!monthlyCounts[month]) {
            monthlyCounts[month] = 0;
          }
          if (!dailyCounts[month]) {
            dailyCounts[month] = {};
          }
          if (!dailyCounts[month][day]) {
            dailyCounts[month][day] = 0;
          }

          monthlyCounts[month] += 1;
          dailyCounts[month][day] += 1;

          if (obj.completed) {
            completed += 1;
          } else if (new Date(obj.deadline) < new Date()) {
            overdue += 1;
          } else {
            pending += 1;
          }
        });

        const monthLabels = Object.keys(monthlyCounts);
        const dayLabels = [];
        const dayData = [];
        const dayColors = [];

        monthLabels.forEach((month, index) => {
          const days = Object.keys(dailyCounts[month]);
          days.forEach(day => {
            dayLabels.push(`${day} ${month}`);
            dayData.push(dailyCounts[month][day]);
            dayColors.push(generateColor(index));
          });
        });

        setMonthlyData({
          labels: monthLabels,
          datasets: [{
            label: 'Objetivos por mes',
            data: Object.values(monthlyCounts),
            backgroundColor: monthLabels.map((_, index) => generateColor(index))
          }]
        });

        setDailyData({
          labels: dayLabels,
          datasets: [{
            label: 'Objetivos por día',
            data: dayData,
            backgroundColor: dayColors
          }]
        });

        setCompletionData({
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

  return { monthlyData, dailyData, completionData };
};

export default useObjectivesData;
