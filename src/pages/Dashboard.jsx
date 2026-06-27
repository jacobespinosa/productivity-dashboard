import './Dashboard.css';

import { getCurrentWeekStart } from '../utils/dateUtils';
import { getWeeklyTaskStats } from '../utils/taskUtils';
import { getWeeklyTimeStats } from '../utils/timeUtils';
import { useState } from 'react';

import SideBar from "../components/SideBar";
import Timer   from "../components/Timer";
import WeeklyCalendar from '../components/WeeklyCalendar';
import ProgressRing from '../components/ProgressRing';

function Dashboard({projects, setProjects, tasksByDate, setTasksByDate,
                    timeByDate, setTimeByDate }) {

  const [ currentSessionSeconds, setCurrentSessionSeconds ] = useState(0);

  const { totalTasks, totalTasksCompleted } = getWeeklyTaskStats(tasksByDate);
  const totalWeeklyTime = getWeeklyTimeStats(timeByDate) + currentSessionSeconds;

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

          </div>
          <WeeklyCalendar
            projects={projects}
            tasksByDate={tasksByDate}
            setTasksByDate={setTasksByDate}
          />
        </section>
      </main>
  );
}

export default Dashboard