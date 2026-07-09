import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import ProjectsPage from "./pages/ProjectsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Layout from "./components/Layout";
import { useState } from 'react';

function App() {
  const [ taskModalMode, setTaskModalMode ] = useState("add");
  const [ isTaskModalOpen, setIsTaskModalOpen ] = useState(false);
  const [ selectedDateKey, setSelectedDateKey ] = useState("");
  const [ newTask, setNewTask ] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 0,
      name: "No Project",
      color: "#333",
      timeSpent: 0
    },
    {
      id: 1,
      name: "leetCode",
      color: "#FF8849",
      timeSpent: 21674
    },
    {
      id: 2,
      name: "Python",
      color: "#69BE28",
      timeSpent: 16223
    },
    {
      id: 3,
      name: "SIEM",
      color: "#3DB7E4",
      timeSpent: 36902
    }
  ]);

    const [timeByDate, setTimeByDate] = useState({
        "7/6/2026": 9000,   
        "7/7/2026": 13500,  
        "7/8/2026": 1800,  
        "7/9/2026": 10800,  
        "7/10/2026": 8100, 
        "7/11/2026": 9900, 
        "7/12/2026": 7200  
    });

  const [ tasksByDate, setTasksByDate ] = useState({
      "7/6/2026": [
          {
              id: 1,
              name: "Study React",
              projectId: 0,
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

      "7/7/2026": [
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
              projectId: 0,
              time: 60,
              isDone: false,
              dueDate: "2026-07-1"
          }
      ],

      "7/8/2026": [
          {
              id: 6,
              name: "Weekly Quiz",
              projectId: 0,
              time: 30,
              isDone: true,
              dueDate: "2026-07-2"
          }
      ],

      "7/9/2026": [
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

      "7/10/2026": [
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

      "7/11/2026": [
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
              projectId: 0,
              time: 30,
              isDone: true,
              dueDate: "2026-7-5"
          }
      ],

      "7/12/2026": [
          {
              id: 14,
              name: "Plan Next Week",
              projectId: 0,
              time: 30,
              isDone: true,
              dueDate: "2026-06-28",
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


  function handleCreateTask(taskName, projectId, estimatedTime, dueDate) {
      setTasksByDate(prev => ({
          ...prev,
          [selectedDateKey]: [
              ...(prev[selectedDateKey] || []),
              {
                  id: Date.now(),
                  name: taskName,
                  projectId,
                  time: estimatedTime,
                  isDone: false,
                  dueDate
              }
          ]
      }));
      setIsTaskModalOpen(false);
  }

  function handleUpdateTask(taskName, projectId, estimatedTime, dueDate) {
      if (!newTask) return;

      setTasksByDate(prev => ({
          ...prev,
          [selectedDateKey]: prev[selectedDateKey].map(task =>
              task.id === newTask.id
              ? {
                  ...task,
                  name: taskName,
                  projectId,
                  time: estimatedTime,
                  dueDate,
                  dateCompleted: ""
              }
              : task
          )
      }));
      setIsTaskModalOpen(false);        
  }

  function handleDeleteTask(dateKey, taskId) {
      setTasksByDate(prev => ({
          ...prev,
          [dateKey]: prev[dateKey].filter(
              task => task.id !== taskId
          )
      }));
  }

  function handleToggleTask(dateKey, taskId) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      setTasksByDate(prev => ({
          ...prev,
          [dateKey]: prev[dateKey].map(task =>
              task.id === taskId
              ? 
              { 
                ...task, 
                isDone: !task.isDone,
                dateCompleted: !task.isDone? today.toLocaleDateString() : ""
              }
              : task
          )
      }));
  }

  function handleAddTask(dateKey) {
      setTaskModalMode("add");
      setSelectedDateKey(dateKey);
      setNewTask(null);
      setIsTaskModalOpen(true);
  }

  function handleEditTask(dateKey, task) {
      setTaskModalMode("edit");
      setSelectedDateKey(dateKey);
      setNewTask(task);
      setIsTaskModalOpen(true);
  }

  const taskActions = {
      handleCreateTask,
      handleDeleteTask,
      handleToggleTask,
      handleUpdateTask,
      handleAddTask,
      handleEditTask
  }

  const taskModalState = {
    taskModalMode,
    setTaskModalMode,
    isTaskModalOpen,
    setIsTaskModalOpen
  }

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Navigate to="/Dashboard" />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <Dashboard 
                                projects={projects} setProjects={setProjects}
                                tasksByDate={tasksByDate} setTasksByDate={setTasksByDate}
                                timeByDate={timeByDate} setTimeByDate={setTimeByDate}
                                taskActions={taskActions} taskModalState={taskModalState}
                                newTask={newTask}
                            />
                        } 
                    />
                    <Route 
                        path="/calendar" 
                        element={
                            <CalendarPage 
                                tasksByDate={tasksByDate}
                                taskActions={taskActions}
                                taskModalState={taskModalState}
                            />
                        } 
                    />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App
