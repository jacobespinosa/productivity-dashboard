import './WeeklyCalendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan  } from '@fortawesome/free-regular-svg-icons';
import { getCurrentWeekStart, getDaySuffix, 
         getCurrentWeekRange, getTodayDate, getDateKey } from '../../utils/dateUtils';
import { formatMinutesHHMM, formatISOMMDD } from '../../utils/timeUtils';
import { getDueStatus } from '../../utils/taskUtils';
import { useState } from 'react';


function WeeklyCalendar({ tasksByDate, handleAddTask, handleEditTask,
                          handleDeleteTask, handleToggleTask, visibleWeekStart,
                          setVisibleWeekStart
 }) {
    
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
            tasks,
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
            const todayDatekey = getDateKey(getTodayDate());
            const isToday = todayDatekey === day.dateKey;
            return (
                <div key={day.dateKey} className="day-card">
                    <div className="card-heading">
                        <h3 className={`date ${isToday ? "today" : ""}`}>{day.day}, {day.dateKey}</h3>
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
                                    onClick={() => handleEditTask(day.dateKey, task)}
                                >
                                    {task.name}
                                    {task.time ? ` - ${formatMinutesHHMM(task.time)}` : ""}  
                                    {task.dueDate && (
                                        <span className={`task-due-date ${getDueStatus(task)}`}>
                                            <span className="date-separator"> • </span> 
                                            {formatISOMMDD(task.dueDate)}
                                        </span>
                                    )}
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

        </>
    );
}

export default WeeklyCalendar