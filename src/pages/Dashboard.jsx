import './Dashboard.css';

import { getCurrentWeekStart } from '../utils/dateUtils';
import { getWeeklyTaskStats } from '../utils/taskUtils';
import { getWeeklyTimeStats } from '../utils/timeUtils';
import { useState } from 'react';

import AddTaskModal from '../components/AddTaskModal';
import SideBar from "../components/SideBar";
import Timer   from "../components/Timer";
import WeeklyCalendar from '../components/WeeklyCalendar';
import ProgressRing from '../components/ProgressRing';
import TodayTaskList from '../components/TodayTaskList';
import CreateProjectModal from '../components/CreateProjectModal';

function Dashboard({projects, setProjects, tasksByDate, setTasksByDate,
                    timeByDate, setTimeByDate }) {

  const [ currentSessionSeconds, setCurrentSessionSeconds ] = useState(0);
  const [ selectedDateKey, setSelectedDateKey ] = useState("");
  const [ selectedTask, setSelectedTask ] = useState(null);
  const [ newTask, setNewTask ] = useState(null);
  const [ modalMode, setModalMode ] = useState("add");
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isCreateProjectOpen, setIsCreateProjectOpen ] = useState(false);
  const [ currentProjectId, setCurrentProjectId ] = useState(projects[0].id);

  const { totalTasks, totalTasksCompleted } = getWeeklyTaskStats(tasksByDate);
  const totalWeeklyTime = getWeeklyTimeStats(timeByDate) + currentSessionSeconds;

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
      setIsModalOpen(false);
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
      setIsModalOpen(false);        
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
      setModalMode("add");
      setSelectedDateKey(dateKey);
      setNewTask(null);
      setIsModalOpen(true);
  }

  function handleEditTask(dateKey, task) {
      setModalMode("edit");
      setSelectedDateKey(dateKey);
      setNewTask(task);
      setIsModalOpen(true);
  }

  function handleCreateProject(name, color) {
      setProjects(prevProjects => 
          [...prevProjects, {
            id: Date.now(),
            name: name,
            color: color
          }]
      )
  }

  return (
      <main className="dashboard">
        <SideBar />

        <section className="dashboard-content">
          <Timer
            projects={projects}
            setProjects={setProjects}
            timeByDate={timeByDate}
            setTimeByDate={setTimeByDate}
            currentSessionSeconds={currentSessionSeconds}
            setCurrentSessionSeconds={setCurrentSessionSeconds}
            currentProjectId={currentProjectId}
            setCurrentProjectId={setCurrentProjectId}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            tasksByDate={tasksByDate}
            handleAddTask={handleAddTask}
            setIsCreateProjectOpen={setIsCreateProjectOpen}
          />
          <div className="total-weekly-tasks-ring">
            <ProgressRing 
              value={totalTasksCompleted}
              goal={totalTasks}
              title={"Total Weekly Tasks"}
              unit=""
            />
          </div>
          <div className="total-weekly-time-ring">
            <ProgressRing
              value={totalWeeklyTime}
              goal={86400}
              title={"Total Weekly Time"}
              type="time"
            />
          </div>
          <div className="today-task-list">
            <TodayTaskList
              tasksByDate={tasksByDate}
              projects={projects}
              handleAddTask={handleAddTask}
              handleEditTask={handleEditTask}
              handleCreateTask={handleCreateTask}
              handleDeleteTask={handleDeleteTask}
              handleToggleTask={handleToggleTask}
              handleUpdateTask={handleUpdateTask}
            />
          </div>
          <WeeklyCalendar
            tasksByDate={tasksByDate}
            handleAddTask={handleAddTask}
            handleEditTask={handleEditTask}
            handleCreateTask={handleCreateTask}
            handleDeleteTask={handleDeleteTask}
            handleToggleTask={handleToggleTask}
            handleUpdateTask={handleUpdateTask}
          />
        </section>
      {isModalOpen && (
          <AddTaskModal
              projects={projects}
              mode={modalMode}
              task={newTask}
              onClose={() => {
                setCurrentProjectId(projects[0].id);
                setIsModalOpen(false);
              }}
              onSubmit={modalMode === "add" 
                        ? handleCreateTask : handleUpdateTask}
              currentProjectId={currentProjectId}
          />
      )}

      {isCreateProjectOpen && (
          <CreateProjectModal
              onSubmit={handleCreateProject}
              onClose={() => {
                setIsCreateProjectOpen(false);
              }}
          />
      )}
      </main>
  );
}

export default Dashboard