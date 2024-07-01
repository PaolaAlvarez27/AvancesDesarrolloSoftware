import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../chartcontainers.css'; // Archivo estilo CSS
import useObjectivesData from '../hooks/useObjectivesData';

const MonthlyLoad = () => {
    const { monthlyData, dailyData } = useObjectivesData();
  
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
