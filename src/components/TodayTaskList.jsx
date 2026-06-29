import './TodayTaskList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan  } from '@fortawesome/free-regular-svg-icons';
import { formatMinutesHHMM, formatISOMMDD } from '../utils/timeUtils'; 
import { getDueStatus, getLateTasks } from '../utils/taskUtils';

function TodayTaskList({tasksByDate, handleAddTask, handleEditTask, handleDeleteTask, 
                        handleToggleTask
}) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.toLocaleDateString('en-US', {weekday: 'long'});
    const dateKey = today.toLocaleDateString();

    const lateTasks = getLateTasks(tasksByDate);
    const todayTasks = (tasksByDate[dateKey] ?? []).concat(lateTasks);

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

    return (
        <div className="today-task-container">
            <div className="today-task-heading">
                <h1>Daily Tasks</h1>
                <p className="today-task-date">{dayOfWeek}, {dateKey}</p>
            </div>
            <div className="today-task-subheading">
                <div className="tasks-remaining-container">
                    <p>Tasks remaining: {numOfTasksRemaining}</p>
                    <div className="task-list-progress-bar"
                        style={{ "--progress": `${percent}%`}}>
                    </div>
                </div>
                <button type="button" className="today-tasks-filter-btn">
                    Filter
                </button>
            </div>
            <ul className="today-task-list">
                {todayTasks.map(task => (
                    <li
                        key={task.id}
                        className={`today-list-item ${getDueStatus(task)}`}
                    >
                        <input 
                            type="checkbox" 
                            checked={task.isDone}
                            onChange={() => handleToggleTask((task.dateKey ?? dateKey), task.id)} 
                        />
                        <span 
                            className="task-text"
                            onClick={() => handleEditTask((task.dateKey ?? dateKey), task)}
                        >
                            {task.name}
                            {task.time ? ` - ${formatMinutesHHMM(task.time)}` : ""}  
                            {task.dueDate && (
                                <span className={`task-due-date ${getDueStatus(task)}`}>
                                    <span className={`date-separator ${getDueStatus(task)}`}> • </span> 
                                    {formatISOMMDD(task.dueDate)}
                                </span>
                            )}
                        </span>
                        <button
                            type="button"
                            className="delete-btn"
                            onClick={(e) => {handleDeleteTask((task.dateKey ?? dateKey), task.id)}}
                        >
                        <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </li>    
                ))}
            </ul>
            <div className="today-task-list-footing">
                <div className="estimated-time-remaining">
                    <p>Estimated time left: {estimatedTimeLeft !== 0 
                                            ? formatMinutesHHMM(estimatedTimeLeft) 
                                            : "0m"}
                    </p>
                </div>
                <button
                    type="button"
                    className="add-task-btn"
                    onClick={() => handleAddTask(dateKey)}
                >
                Add task
                </button>
            </div>
        </div>
    );
}

export default TodayTaskList