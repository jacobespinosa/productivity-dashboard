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
                    timeByDate, setTimeByDate, taskActions }) {

  const {
      handleCreateTask,
      handleDeleteTask,
      handleToggleTask,
      handleUpdateTask,
      handleAddTask,
      handleEditTask
  } = taskActions;

  const [ currentSessionSeconds, setCurrentSessionSeconds ] = useState(0);
  const [ selectedDateKey, setSelectedDateKey ] = useState("");
  const [ selectedTask, setSelectedTask ] = useState(null);
  const [ newTask, setNewTask ] = useState(null);
  const [ modalMode, setModalMode ] = useState("add");
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isCreateProjectOpen, setIsCreateProjectOpen ] = useState(false);
  const [ currentProjectId, setCurrentProjectId ] = useState(projects[0].id);
  const [ isRunning, setIsRunning ] = useState(false);

  const { totalTasks, totalTasksCompleted } = getWeeklyTaskStats(tasksByDate);
  const totalWeeklyTime = getWeeklyTimeStats(timeByDate) + currentSessionSeconds;

  function startTimer() {

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
            isRunning={isRunning}
            setIsRunning={setIsRunning}
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

          <div className="project-time-breakdown">

          </div>

          <div className="weekly-focus-chart">

          </div>

          <div className="recent-sessions">

          </div>

          <div className="streaks-card">
            
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
              setIsRunning={setIsRunning}
              setCurrentProjectId={setCurrentProjectId}
              setSelectedTask={setSelectedTask}
            />
          </div>
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