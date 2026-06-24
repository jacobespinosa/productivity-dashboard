import './WeeklyCalender.css';
import AddTaskModal from './AddTaskModal';
import { useState } from 'react';


function WeeklyCalender({ weeklyPlan, setWeeklyPlan }) {
    const [ modalMode, setModalMode ] = useState("add");
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ selectedDayId, setSelectedDayId ] = useState(null);
    const [ selectedTask, setSelectedTask ] = useState(null);

    function handleCreateTask(taskName, estimatedTime) {
        setWeeklyPlan(prevWeeklyPlan => 
            prevWeeklyPlan.map(day => 
                day.id === selectedDayId
                ? { ...day, tasks: [...day.tasks, {
                    id: Date.now(),
                    name: taskName,
                    time: estimatedTime,
                    isDone: false
                }
              ]
            }
            : day
            )
        );
        setIsModalOpen(false);
    }

    function handleUpdateTask(taskName, estimatedTime) {
        setWeeklyPlan(prevWeeklyPlan => 
            prevWeeklyPlan.map(day => 
                day.id === selectedDayId
                ? { ...day, 
                    tasks: day.tasks.map(task => 
                        task.id === selectedTask.id
                        ? {
                            ...task,
                            name: taskName,
                            time: estimatedTime
                        }
                        : task
                    )
                } : day
            )
        );
        setIsModalOpen(false);        
    }

    function handleToggleTask(dayId, taskId) {
        setWeeklyPlan(prevWeeklyPlan =>
            prevWeeklyPlan.map(day =>
                day.id === dayId
                ? { ...day,
                    tasks: day.tasks.map(task =>
                        task.id === taskId
                        ? {
                            ...task,
                            isDone: !task.isDone
                        } : task
                    )
                } : day
            )
        )
    }

    function handleAddTask(dayId) {
        setModalMode("add");
        setSelectedTask(null);
        setSelectedDayId(dayId);
        setIsModalOpen(true);
    }

    function handleEditTask(dayId, task) {
        setModalMode("edit");
        setSelectedTask(task);
        setSelectedDayId(dayId);
        setIsModalOpen(true);
    }

    return (
        <>
        <div className="weekly-calender">
        <div className="weekly-header">
          <h1 className="weekly-calender-title">Weekly Plan</h1>
          <button type="button" className="new-week-btn">New Week</button>
        </div>

        <div className="day-container">
        {weeklyPlan.map(day => {
            const totalTime = day.tasks.reduce(
                (acc, task) => acc + task.time,
                0
            );

            return (
                <div key={day.id} className="day-card">
                    <div className="card-heading">
                        <h3 className="date">{day.day}, {day.date}</h3>
                    </div>

                    <ul>
                        {day.tasks.map(task => (
                            <li key={task.id} onClick={() => handleEditTask(day.id, task)}>
                                <input 
                                    type="checkbox" 
                                    checked={task.isDone}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={() => handleToggleTask(day.id, task.id)} 
                                />
                                {task.name} - {task.time}m
                            </li>
                        ))}
                    </ul>

                    <div className="card-footing">
                        <p className="estimated-time">Total: {totalTime}m</p>

                        <button
                            type="button"
                            className="add-task-btn"
                            onClick={() => handleAddTask(day.id)}
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
                dayId={selectedDayId}
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