import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../chartcontainers.css'; // Archivo estilo CSS

const generateColor = (seed) => {
  // Simple function to generate colors based on a seed (month/day)
  const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
  return colors[seed % colors.length];
};

const MonthlyLoad = () => {
  const [monthlyData, setMonthlyData] = useState({ labels: [], datasets: [] });
  const [dailyData, setDailyData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('http://localhost:8761/objectives')
      .then(response => {
        const objectives = response.data;
        const monthlyCounts = {};
        const dailyCounts = {};

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
      })
      .catch(error => {
        console.error('Error fetching objectives:', error);
      });
  }, []);

  return (
    <div>
      <h2>Objetivos por período</h2>
      <div className="chart-container">
        <h4 style={{ textAlign: 'center' }}>Objetivos por mes</h4>
        <div style={{ width: '80%', height: '400px' }}>
          <Bar 
            data={monthlyData} 
            options={{ 
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              }
            }} 
          />
        </div>
      </div>
      <div className="chart-container">
        <h4 style={{ textAlign: 'center' }}>Objetivos por día</h4>
        <div style={{ width: '80%', height: '400px' }}>
          <Bar 
            data={dailyData} 
            options={{ 
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlyLoad;
