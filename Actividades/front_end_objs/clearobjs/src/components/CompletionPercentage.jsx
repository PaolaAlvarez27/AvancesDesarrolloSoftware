import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import '../chartcontainers.css';
import useObjectivesData from '../hooks/useObjectivesData';

const CompletionPercentage = () => {
    const { completionData } = useObjectivesData();

  return (
    <div>
      <h2>Relación de cumplimiento</h2>
      <div className="chart-container">
        <div style={{ width: '60%', height: '400px' }}>
          <Pie data={completionData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default CompletionPercentage;