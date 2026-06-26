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

const [ tasksByDate, setTasksByDate ] = useState({
      "6/22/2026": [
          {
              id: 1,
              name: "Study React",
              projectId: 1,
              time: 90,
              isDone: true
          },
          {
              id: 2,
              name: "LeetCode",
              projectId: 2,
              time: 60,
              isDone: false
          }
      ],

      "6/23/2026": [
          {
              id: 3,
              name: "Work on Dashboard",
              projectId: 1,
              time: 120,
              isDone: true
          },
          {
              id: 4,
              name: "Linux+ Study",
              projectId: 3,
              time: 45,
              isDone: true
          },
          {
              id: 5,
              name: "Gym",
              projectId: null,
              time: 60,
              isDone: false
          }
      ],

      "6/24/2026": [
          {
              id: 6,
              name: "Weekly Quiz",
              projectId: null,
              time: 30,
              isDone: true
          }
      ],

      "6/25/2026": [
          {
              id: 7,
              name: "Portfolio Improvements",
              projectId: 1,
              time: 120,
              isDone: false
          },
          {
              id: 8,
              name: "Cloud Notes",
              projectId: 3,
              time: 60,
              isDone: false
          }
      ],

      "6/26/2026": [
          {
              id: 9,
              name: "Read Documentation",
              projectId: 2,
              time: 45,
              isDone: true
          },
          {
              id: 10,
              name: "System Design Practice",
              projectId: 2,
              time: 90,
              isDone: false
          }
      ],

      "6/27/2026": [
          {
              id: 11,
              name: "Fix Timer Bugs",
              projectId: 1,
              time: 75,
              isDone: false
          },
          {
              id: 12,
              name: "Review Security Notes",
              projectId: 3,
              time: 60,
              isDone: true
          },
          {
              id: 13,
              name: "Laundry",
              projectId: null,
              time: 30,
              isDone: true
          }
      ],

      "6/28/2026": [
          {
              id: 14,
              name: "Plan Next Week",
              projectId: null,
              time: 30,
              isDone: false
          },
          {
              id: 15,
              name: "Refactor Weekly Calendar",
              projectId: 1,
              time: 90,
              isDone: false
          }
      ]
});

  return <Dashboard 
            projects={projects} setProjects={setProjects}
            tasksByDate={tasksByDate} setTasksByDate={setTasksByDate}
          />
}

export default App
