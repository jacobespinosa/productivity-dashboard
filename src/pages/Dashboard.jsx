import './Dashboard.css';

import { getCurrentWeekStart } from '../utils/dateUtils';
import { getWeeklyTaskStats } from '../utils/taskUtils';
import { useState } from 'react';

import SideBar from "../components/SideBar";
import Timer   from "../components/Timer";
import WeeklyCalendar from '../components/WeeklyCalendar';
import ProgressRing from '../components/ProgressRing';

function Dashboard({projects, setProjects, tasksByDate, setTasksByDate}) {

  const [ currentWeekStart, setCurrentWeekStart ] = useState(getCurrentWeekStart());

  const { totalTasks, totalTasksCompleted } = getWeeklyTaskStats(currentWeekStart, tasksByDate);

  return (
      <main className="dashboard">
        <SideBar />

        <section className="dashboard-content">
          <Timer
            projects={projects}
            setProjects={setProjects}
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
              value={72854}
              goal={86400}
              title={"Total Weekly Time"}
              type="time"
            />
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