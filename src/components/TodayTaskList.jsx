import './TodayTaskList.css';

import { formatMinutesHHMM } from '../utils/timeUtils'; 

function TodayTaskList({tasksByDate, setTasksByDate}) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.toLocaleDateString('en-US', {weekday: 'long'});
    const dateKey = today.toLocaleDateString();

    const todayTasks = tasksByDate[dateKey];
    let numOfTasksRemaining = 0;
    let totalNumOfTasks = 0;
    let estimatedTimeLeft = 0;
    for (let task of todayTasks) {
        if (!task.isDone) {
            ++numOfTasksRemaining;
            estimatedTimeLeft += task.time;
        }
        totalNumOfTasks++;
    }
    const numOfTasksDone = totalNumOfTasks - numOfTasksRemaining;
    const percent = totalNumOfTasks > 0 
            ? Math.min((numOfTasksDone / totalNumOfTasks) * 100, 100)
            : 0;

    console.log(percent);
    return (
        <div className="today-task-container">
            <div className="today-task-heading">
                <h1>Daily Tasks</h1>
                <p className="today-task-date">{dayOfWeek}, {dateKey}</p>
            </div>
            <div className="today-task-body">
                <p>Tasks remaining: {numOfTasksRemaining}</p>
                {/*
                <p>Estimated time left: {estimatedTimeLeft !== 0 
                                         ? formatMinutesHHMM(estimatedTimeLeft) 
                                        : "0m"}
                </p>
                */}
                <div className="task-list-progress-bar"
                     style={{ "--progress": `${percent}%`}}></div>
                <div className="taday-task-list">

                </div>
            </div>
        </div>
    );
}

export default TodayTaskList