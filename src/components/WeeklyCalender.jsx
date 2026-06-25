import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan  } from '@fortawesome/free-regular-svg-icons';
import './WeeklyCalender.css';
import AddTaskModal from './AddTaskModal';
import { useState } from 'react';


function WeeklyCalender({ tasksByDate, setTasksByDate }) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - daysToSubtract);
    
    const [ modalMode, setModalMode ] = useState("add");
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedDateKey, setSelectedDateKey ] = useState("");
    const [ selectedTask, setSelectedTask ] = useState(null);
    const [ currentWeekStart, setCurrentWeekStart ] = useState(weekStart);

    function handleCreateTask(taskName, estimatedTime) {
        console.log(`selectedDateKey: ${selectedDateKey}`);

        setTasksByDate(prev => ({
            ...prev,
            [selectedDateKey]: [
                ...(prev[selectedDateKey] || []),
                {
                    id: Date.now(),
                    name: taskName,
                    time: estimatedTime,
                    isDone: false
                }
            ]
        }));
        setIsModalOpen(false);
    }

    function handleUpdateTask(taskName, estimatedTime) {
        setTasksByDate(prev => ({
            ...prev,
            [selectedDateKey]: prev[selectedDateKey].map(task =>
                task.id === selectedTask.id
                ? {
                    ...task,
                    name: taskName,
                    time: estimatedTime
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
        setTasksByDate(prev => ({
            ...prev,
            [dateKey]: prev[dateKey].map(task =>
                task.id === taskId
                ? { ...task, isDone: !task.isDone }
                : task
            )
        }));
    }

    function handleAddTask(dateKey) {
        setModalMode("add");
        setSelectedDateKey(dateKey);
        setSelectedTask(null);
        setIsModalOpen(true);
    }

    function handleEditTask(dateKey, task) {
        setModalMode("edit");
        setSelectedDateKey(dateKey);
        setSelectedTask(task);
        setIsModalOpen(true);
    }


    function formatMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins  = Math.floor(minutes % 60);
        return `${hours > 0 ? `${hours}h ` : ""}${mins}m`;
    }

    function handleNextWeek() {
        const nextWeek = new Date(currentWeekStart);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setCurrentWeekStart(nextWeek);
    }

    function handlePrevWeek() {
        const prevWeek = new Date(currentWeekStart);
        prevWeek.setDate(prevWeek.getDate() - 7);
        setCurrentWeekStart(prevWeek);
    }

    function handleCurrentWeek() {
        setCurrentWeekStart(new Date(weekStart));
    }

    function getDaySuffix(day) {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    }

    function getCurrentWeekRange() {
        const startDate = new Date(currentWeekStart);
        const endDate = new Date(currentWeekStart);
        endDate.setDate(startDate.getDate() + 6);

        const startMonth = startDate.toLocaleDateString('default', {month: 'short'});
        const endMonth = endDate.toLocaleDateString('default', {month: 'short'});

        const start = startDate.getDate()
        const end = endDate.getDate();

        const startPrefix = getDaySuffix(start);
        const endPrefix = getDaySuffix(end);
        return `${startMonth} ${start}${startPrefix} - ${
            startMonth !== endMonth ? `${endMonth} ` : ""
        }${end}${endPrefix}`;
    }

    const weekDays = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + index);

        const dateKey = date.toLocaleDateString('en-US');

        console.log(`Week dateKey: ${dateKey}`);

        const tasks = tasksByDate[dateKey] || [];
        return {
            dateKey, 
            day: date.toLocaleDateString('default', {weekday: 'long'}),
            tasks
        }
    });


    return (
        <>
        <div className="weekly-calender">
        <div className="weekly-header">
          <div className="weekly-title">
            <h1 className="weekly-calender-title">Weekly Plan</h1>
            <span className="date-range">{getCurrentWeekRange()}</span>
          </div>
          <div className="week-navigation">
              <button type="button" 
                      className="prev-week"
                      onClick={() => handlePrevWeek()}
              >Prev</button>
              <button type="button" 
                      className="this-week"
                      disabled={
                        weekStart.toDateString() === currentWeekStart.toDateString()
                      }
                      onClick={() => handleCurrentWeek()}
              >This Week</button>
              <button type="button" 
                      className="next-week"
                      onClick={() => handleNextWeek()}
              >Next</button>
          </div>
        </div>

        <div className="day-container">
        {weekDays.map(day => {
            const totalTime = day.tasks.reduce(
                (acc, task) => acc + task.time,
                0
            );
            
            
            return (
                <div key={day.dateKey} className="day-card">
                    <div className="card-heading">
                        <h3 className="date">{day.day}, {day.dateKey}</h3>
                    </div>

                    <ul className="task-list">
                        {day.tasks.map(task => (
                            <li 
                              key={task.id} 
                              className="list-item">
                                <input 
                                    type="checkbox" 
                                    checked={task.isDone}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={() => handleToggleTask(day.dateKey, task.id)} 
                                />
                                <span 
                                    className="task-text"
                                    onClick={() => handleEditTask(day.dateKey, task)}>
                                    {task.name} - {formatMinutes(task.time)}
                                </span>
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteTask(day.dateKey, task.id);
                                    }}
                                >
                                <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="card-footing">
                        <p className="estimated-time">
                            Total: {formatMinutes(totalTime)}
                        </p>

                        <button
                            type="button"
                            className="add-task-btn"
                            onClick={() => handleAddTask(day.dateKey)}
                        >
                        Add task
                        </button>
                    </div>
                </div>
            );
        })}
        </div>
        </div>

        {isModalOpen && (
            <AddTaskModal
                mode={modalMode}
                task={selectedTask}
                onClose={() => setIsModalOpen(false)}
                onSubmit={modalMode === "add" 
                          ? handleCreateTask : handleUpdateTask}
            />
        )}
        </>
    );
}

export default WeeklyCalender