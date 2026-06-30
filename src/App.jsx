import './App.css'
import Dashboard from './pages/Dashboard';
import { useState } from 'react';

function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "leetCode",
      timeSpent: 21674
    },
    {
      id: 2,
      name: "Python",
      timeSpent: 16223
    },
    {
      id: 3,
      name: "SIEM",
      timeSpent: 36902
    }
  ]);

  const [ timeByDate, setTimeByDate ] = useState({
      "6/29/2026": 16902,
      "6/30/2026": 16223,
      "7/1/2026": 21674,
      "7/2/2026": 8963,
      "7/3/2026": 12261,
      "7/4/2026": 1612,
      "7/5/2026": 0
  });

  const [ tasksByDate, setTasksByDate ] = useState({
      "6/29/2026": [
          {
              id: 1,
              name: "Study React",
              projectId: 1,
              time: 90,
              isDone: true,
              dueDate: "2026-06-30"
          },
          {
              id: 2,
              name: "LeetCode",
              projectId: 2,
              time: 60,
              isDone: false,
              dueDate: "2026-06-30"
          }
      ],

      "6/30/2026": [
          {
              id: 3,
              name: "Work on Dashboard",
              projectId: 1,
              time: 120,
              isDone: true,
              dueDate: "2026-07-1"
          },
          {
              id: 4,
              name: "Linux+ Study",
              projectId: 3,
              time: 45,
              isDone: true,
              dueDate: "2026-07-1"
          },
          {
              id: 5,
              name: "Gym",
              projectId: null,
              time: 60,
              isDone: false,
              dueDate: "2026-07-1"
          }
      ],

      "7/1/2026": [
          {
              id: 6,
              name: "Weekly Quiz",
              projectId: null,
              time: 30,
              isDone: true,
              dueDate: "2026-07-2"
          }
      ],

      "7/2/2026": [
          {
              id: 7,
              name: "Portfolio Improvements",
              projectId: 1,
              time: 120,
              isDone: false,
              dueDate: "2026-07-3"
          },
          {
              id: 8,
              name: "Cloud Notes",
              projectId: 3,
              time: 60,
              isDone: false,
              dueDate: "2026-07-3"
          }
      ],

      "7/3/2026": [
          {
              id: 9,
              name: "Read Documentation",
              projectId: 2,
              time: 45,
              isDone: true,
              dueDate: "2026-7-4"
          },
          {
              id: 10,
              name: "System Design Practice",
              projectId: 2,
              time: 90,
              isDone: false,
              dueDate: "2026-07-4"
          }
      ],

      "7/4/2026": [
          {
              id: 11,
              name: "Fix Timer Bugs",
              projectId: 1,
              time: 75,
              isDone: false,
              dueDate: "2026-7-5"
          },
          {
              id: 12,
              name: "Review Security Notes",
              projectId: 3,
              time: 60,
              isDone: true,
              dueDate: "2026-7-5"
          },
          {
              id: 13,
              name: "Laundry",
              projectId: null,
              time: 30,
              isDone: true,
              dueDate: "2026-7-5"
          }
      ],

      "7/5/2026": [
          {
              id: 14,
              name: "Plan Next Week",
              projectId: null,
              time: 30,
              isDone: true,
              dueDate: "2026-06-28"
          },
          {
              id: 15,
              name: "Refactor Weekly Calendar",
              projectId: 1,
              time: 90,
              isDone: true,
              dueDate: "2026-06-28"
          }
      ]
  });

  return <Dashboard 
            projects={projects} setProjects={setProjects}
            tasksByDate={tasksByDate} setTasksByDate={setTasksByDate}
            timeByDate={timeByDate} setTimeByDate={setTimeByDate}
          />
}

export default App
