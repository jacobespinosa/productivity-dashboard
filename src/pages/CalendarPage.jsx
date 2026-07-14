import './CalendarPage.css';
import { getCurrentWeekStart } from '../utils/dateUtils';
import { getDateKey } from '../utils/dateUtils';
import { useState } from 'react';
import WeeklyCalendar from "../components/WeeklyCalendar";
import CalendarHeader from '../components/CalendarHeader';
import ColumnBarChart from '../components/ColumnBarChart';

function CalendarPage({tasksByDate, taskActions}) {
    const [ visibleWeekStart, setVisibleWeekStart ] = useState(getCurrentWeekStart());

    const {
        handleCreateTask,
        handleDeleteTask,
        handleToggleTask,
        handleUpdateTask,
        handleAddTask,
        handleEditTask
    } = taskActions;

    const estimatedWorkloadData = Array.from({length: 7}, (_, index) => {
        const date = new Date(visibleWeekStart);
        date.setDate(date.getDate() + index);

        const datekey = getDateKey(date);
        const tasks = tasksByDate[datekey] ?? [];
        const numOfTasks = tasks.length;

        const time = tasks.reduce((totalTime, task) => {
            return totalTime + task.time;
        }, 0);

        return {
            day: date.toLocaleDateString('en-US', {weekday: 'short'}),
            time,
            numOfTasks
        }
    });
    const sortedWeekDaysByTime = estimatedWorkloadData.toSorted((a, b) => b.time - a.time);
    const mostTime = sortedWeekDaysByTime[0].time;
    const maxMinutes = Math.ceil(mostTime / 60) * 60;

    return (
        <main className="calendar">
            <section className="calendar-content">
                <div className="calendar-header">
                    <CalendarHeader />
                </div>
                <div className="estimated-workload">
                    <ColumnBarChart 
                        title={"Estimated Workload"}
                        data={estimatedWorkloadData}
                        maxValue={maxMinutes}
                        getKey={item => item.day}
                        getValue={item => item.time}
                        getBottomLabel={item => item.day}
                        getTopLabel={item => item.numOfTasks}
                    />
                </div>
                <div className="week-calendar">
                    <WeeklyCalendar
                        tasksByDate={tasksByDate}
                        handleAddTask={handleAddTask}
                        handleEditTask={handleEditTask}
                        handleCreateTask={handleCreateTask}
                        handleDeleteTask={handleDeleteTask}
                        handleToggleTask={handleToggleTask}
                        handleUpdateTask={handleUpdateTask}
                        visibleWeekStart={visibleWeekStart}
                        setVisibleWeekStart={setVisibleWeekStart}
                    />
                </div>
            </section>
        </main>
    );
}

export default CalendarPage