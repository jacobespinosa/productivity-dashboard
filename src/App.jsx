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

  const [weeklyPlan, setWeeklyPlan] = useState([
    {
      id: 1,
      day: "Monday",
      date: "6/22/2026",
      tasks: []
    },
    {
      id: 2,
      day: "Tuesday",
      date: "6/23/2026",
      tasks: []
    },
    {
      id: 3,
      day: "Wednesday",
      date: "6/24/2026",
      tasks: []
    },
    {
      id: 4,
      day: "Thursday",
      date: "6/25/2026",
      tasks: []
    },
    {
      id: 5,
      day: "Friday",
      date: "6/26/2026",
      tasks: []
    },
    {
      id: 6,
      day: "Saturday",
      date: "6/27/2026",
      tasks: []
    },
    {
      id: 7,
      day: "Sunday",
      date: "6/28/2026",
      tasks: []
    },
  ])

  return <Dashboard 
            projects={projects} setProjects={setProjects}
            weeklyPlan={weeklyPlan} setWeeklyPlan={setWeeklyPlan}
          />
}

export default App
