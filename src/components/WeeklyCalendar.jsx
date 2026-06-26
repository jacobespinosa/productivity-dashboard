import './WeeklyCalendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan  } from '@fortawesome/free-regular-svg-icons';
import { getCurrentWeekStart, getDaySuffix, 
         getCurrentWeekRange } from '../utils/dateUtils';
import { formatMinutesHHMM } from '../utils/timeUtils';
import AddTaskModal from './AddTaskModal';
import { useState } from 'react';


function WeeklyCalendar({ projects, tasksByDate, setTasksByDate }) {
    
    const [ modalMode, setModalMode ] = useState("add");
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedDateKey, setSelectedDateKey ] = useState("");
    const [ selectedTask, setSelectedTask ] = useState(null);
    const [ visibleWeekStart, setVisibleWeekStart ] = useState(getCurrentWeekStart());

    function handleCreateTask(taskName, projectId, estimatedTime) {
        setTasksByDate(prev => ({
            ...prev,
            [selectedDateKey]: [
                ...(prev[selectedDateKey] || []),
                {
                    id: Date.now(),
                    name: taskName,
                    projectId: projectId || null,
                    time: estimatedTime,
                    isDone: false
                }
            ]
        }));
        setIsModalOpen(false);
    }

    function handleUpdateTask(taskName, projectId, estimatedTime) {
        if (!selectedTask) return;

        setTasksByDate(prev => ({
            ...prev,
            [selectedDateKey]: prev[selectedDateKey].map(task =>
                task.id === selectedTask.id
                ? {
                    ...task,
                    name: taskName,
                    projectId: projectId || null,
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



    function handleNextWeek() {
        const nextWeek = new Date(visibleWeekStart);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setVisibleWeekStart(nextWeek);
    }

    function handlePrevWeek() {
        const prevWeek = new Date(visibleWeekStart);
        prevWeek.setDate(prevWeek.getDate() - 7);
        setVisibleWeekStart(prevWeek);
    }

    function handleCurrentWeek() {
        setVisibleWeekStart(new Date(getCurrentWeekStart()));
    }


    const weekDays = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(visibleWeekStart);
        date.setDate(visibleWeekStart.getDate() + index);

        const dateKey = date.toLocaleDateString('en-US');

        const tasks = tasksByDate[dateKey] || [];
        return {
            dateKey, 
            day: date.toLocaleDateString('default', {weekday: 'long'}),
            tasks
        }
    });

    return (
        <>
        <div className="weekly-calendar">
        <div className="weekly-header">
          <div className="weekly-title">
            <h1 className="weekly-calendar-title">Weekly Plan</h1>
            <span className="date-range">{getCurrentWeekRange(visibleWeekStart)}</span>
          </div>
          <div className="week-navigation">
              <button type="button" 
                      className="prev-week"
                      onClick={() => handlePrevWeek()}
              >Prev</button>
              <button type="button" 
                      className="this-week"
                      disabled={
                        getCurrentWeekStart().toDateString() === visibleWeekStart.toDateString()
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
                                    onChange={() => handleToggleTask(day.dateKey, task.id)} 
                                />
                                <span 
                                    className="task-text"
                                    onClick={() => handleEditTask(day.dateKey, task)}>
                                    {task.name} - {formatMinutesHHMM(task.time)}
                                </span>
                                <button
                                    type="button"
                                    className="delete-btn"
                                    onClick={(e) => {handleDeleteTask(day.dateKey, task.id)}}
                                >
                                <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="card-footing">
                        <p className="estimated-time">
                            Total: {formatMinutesHHMM(totalTime)}
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
                projects={projects}
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

export default WeeklyCalendar