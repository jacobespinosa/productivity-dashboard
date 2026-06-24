import './AddTaskModal.css';
import { useState } from 'react';

function AddTaskModal({mode, task, dayId, onClose, onSubmit}) {
    const [ taskName, setTaskName ] = useState(task?.name || "");
    const [ taskTime, setTaskTime ] = useState(task?.time || 0);

    return (
        <div className="modal-background">
            <div className="modal">
                <div className="close-btn" onClick={onClose}>
                    &times;
                </div>
                <h2 className="modal-title">
                    {mode === "add"? "Add Task" : "Edit Task"}
                </h2>
                <label htmlFor="name">Enter Task Name:</label>
                <input 
                    id="name" 
                    type="text"
                    value={taskName}
                    required
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <label htmlFor="time">Enter Estimated Time: </label>
                <select 
                    id="time" 
                    onChange={(e) => setTaskTime(Number(e.target.value))}
                    value={taskTime}
                >
                    <option value="0" selected>Select time</option>
                    <option value="15">15 min</option>
                    <option value="30">30 min</option>
                    <option value="45">45 min</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                    <option value="150">2.5 hours</option>
                    <option value="180">3 hours</option>
                    <option value="210">3.5 hours</option>
                    <option value="240">4 hours</option>
                </select>
                <button 
                    type="submit" 
                    disabled={!taskName.trim() || taskTime === 0}
                    onClick={() => onSubmit(taskName, taskTime)}>
                    {mode === "add" ? "Add Task" : "Save Changes"}
                </button>
            </div>
        </div>
    );
}

export default AddTaskModal