import './Dashboard.css';

import { getCurrentWeekStart } from '../utils/dateUtils';
import { getWeeklyTaskStats } from '../utils/taskUtils';
import { getWeeklyTotalTime } from '../utils/timeUtils';
import { useState } from 'react';

import AddTaskModal from '../components/AddTaskModal';
import SideBar from "../components/SideBar";
import Timer   from "../components/Timer";
import WeeklyCalendar from '../components/WeeklyCalendar';
import ProgressRing from '../components/ProgressRing';
import TodayTaskList from '../components/TodayTaskList';
import CreateProjectModal from '../components/CreateProjectModal';
import ProjectTimeBreakdown from '../components/ProjectTimeBreakdown';
import WeeklyFocusChart from '../components/WeeklyFocusChart';

function Dashboard({projects, setProjects, tasksByDate, setTasksByDate,
                    timeByDate, setTimeByDate, taskActions, taskModalState,
                    newTask }) {

  const {
      handleCreateTask,
      handleDeleteTask,
      handleToggleTask,
      handleUpdateTask,
      handleAddTask,
      handleEditTask
  } = taskActions;

  const {
    taskModalMode,
    setTaskModalMode,
    isTaskModalOpen,
    setIsTaskModalOpen
  } = taskModalState

  const [ currentSessionSeconds, setCurrentSessionSeconds ] = useState(0);
  const [ selectedTask, setSelectedTask ] = useState(null);
  const [ isCreateProjectOpen, setIsCreateProjectOpen ] = useState(false);
  const [ currentProjectId, setCurrentProjectId ] = useState(projects[0].id);
  const [ isRunning, setIsRunning ] = useState(false);

  const { totalTasks, totalTasksCompleted } = getWeeklyTaskStats(tasksByDate);
  const totalWeeklyTime = getWeeklyTotalTime(timeByDate) + currentSessionSeconds;

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

          <div className="dashboard-graphs">
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
              <ProjectTimeBreakdown 
                  projects={projects}
                  tasksByDate={tasksByDate}
                  timeByDate={timeByDate}
              />
            </div>

            <div className="weekly-focus-chart">
              <WeeklyFocusChart 
                  timeByDate={timeByDate}
              />
            </div>
          </div>

          <div className="recent-sessions">

          </div>

          <div className="streaks-card">

          </div>
          <div className="daily-task-list">
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
      {isTaskModalOpen && (
          <AddTaskModal
              projects={projects}
              mode={taskModalMode}
              task={newTask}
              onClose={() => {
                setCurrentProjectId(projects[0].id);
                setIsTaskModalOpen(false);
              }}
              onSubmit={taskModalMode === "add" 
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