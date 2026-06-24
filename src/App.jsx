import './App.css'
import Dashboard from './pages/Dashboard';
import { useState } from 'react';

function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "leetCode",
      timeSpent: 0
    },
    {
      id: 2,
      name: "Python",
      timeSpent: 0,
    },
    {
      id: 3,
      name: "SIEM",
      timeSpent: 0
    }
  ]);

  const [tasksByDate, setTasksByDate] = useState({})

  return <Dashboard 
            projects={projects} setProjects={setProjects}
            tasksByDate={tasksByDate} setTasksByDate={setTasksByDate}
          />
}

export default App
