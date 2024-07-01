import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8761/objectives')
      .then(response => {
        const groupedByProject = response.data.reduce((acc, objective) => {
          (acc[objective.project] = acc[objective.project] || []).push(objective);
          return acc;
        }, {});
        setProjects(groupedByProject);
      })
      .catch(error => {
        console.error('Error fetching objectives:', error);
      });
  }, []);

  return (
    <div>
      <h2>Proyectos</h2>
      <ul>
        {Object.keys(projects).map((project) => (
          <li key={project}>
            <button onClick={() => setSelectedProject(project)}>{project}</button>
          </li>
        ))}
      </ul>
      {selectedProject && (
        <div>
          <h3>Objetivos para {selectedProject}</h3>
          <ul>
            {projects[selectedProject].map((objective) => (
              <li key={objective.id}>{objective.name} - {new Date(objective.deadline).toLocaleDateString()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Projects;