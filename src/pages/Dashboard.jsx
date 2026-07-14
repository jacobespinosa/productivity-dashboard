import './Dashboard.css';

import { getCurrentWeekStart } from '../utils/dateUtils';
import { getWeeklyTaskStats } from '../utils/taskUtils';
import { getWeeklyTotalTime, getWeeklyTimeStats } from '../utils/timeUtils';
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
import SetWeeklyGoalModal from '../components/SetWeeklyGoalModal';
import RecentSessions from '../components/RecentSessions';
import StreaksCard from '../components/StreaksCard';
import ColumnBarChart from '../components/ColumnBarChart';

function Dashboard({projects, setProjects, tasksByDate, setTasksByDate,
                    timeByDate, setTimeByDate, taskActions, taskModalState,
                    newTask, sessions, setSessions, currentProjectId, setCurrentProjectId }) {

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

  const [currentSessionSeconds, setCurrentSessionSeconds] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isWeeklyGoalModalOpen, setIsWeeklyGoalModalOpen] = useState(false);
  const [weeklyTimeGoal, setWeeklyTimeGoal] = useState(86400);

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

  const weeklyTimeStats = getWeeklyTimeStats(timeByDate);
  const sortedTimeStats = weeklyTimeStats.toSorted((a, b) => b.time - a.time);
  const mostTime = sortedTimeStats[0].time;
  const maxTime = Math.ceil(mostTime / 60) * 60;

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
            setSessions={setSessions}
          />

          <div className="dashboard-graphs">
            <div className="total-weekly-tasks-ring">
              <ProgressRing 
                value={totalTasksCompleted}
                goal={totalTasks}
                title={"Total Weekly Tasks"}
                unit=""
                onClick={""}
              />
            </div>
            <div className="total-weekly-time-ring">
              <ProgressRing
                value={totalWeeklyTime}
                goal={weeklyTimeGoal}
                title={"Total Weekly Time"}
                type="time"
                onClick={() => setIsWeeklyGoalModalOpen(true)}
              />
            </div>

            <div className="project-time-breakdown">
              <ProjectTimeBreakdown
                  projects={projects}
                  timeByDate={timeByDate}
                  sessions={sessions}
              />
            </div>

            <div className="weekly-focus-chart">
              <ColumnBarChart 
                  title={"Weekly Focus Chart"}
                  data={weeklyTimeStats}
                  maxValue={maxTime}
                  getKey={item => item.day}
                  getValue={item => item.time}
                  getBottomLabel={item => item.day}
                  getTopLabel={item => item.timeDisplay}
              />
            </div>
          </div>

          <div className="streaks-card">
              <StreaksCard 
                  tasksByDate={tasksByDate}
                  timeByDate={timeByDate}
              />
          </div>
          <div className="right-panel">
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
            <div className="recent-sessions">
                <RecentSessions 
                  sessions={sessions}
                  projects={projects}
                  tasksByDate={tasksByDate}
                />
            </div>
          </div>
        </section>

      {isCreateProjectOpen && (
          <CreateProjectModal
              onSubmit={handleCreateProject}
              onClose={() => {
                setIsCreateProjectOpen(false);
              }}
          />
      )}

      {isWeeklyGoalModalOpen && (
          <SetWeeklyGoalModal 
              onSubmit={(goal) => setWeeklyTimeGoal(goal)}
              onClose={() => {
                setIsWeeklyGoalModalOpen(false);
              }}
              weeklyTimeGoal={weeklyTimeGoal}
          />
      )}
      </main>
  );
}

export default Dashboard