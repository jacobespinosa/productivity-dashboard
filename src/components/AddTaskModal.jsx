import './AddTaskModal.css';
import { useState } from 'react';

function AddTaskModal({mode, task, onClose, onSubmit}) {
    const [ taskName, setTaskName ] = useState(task?.name || "");
    const [ taskTime, setTaskTime ] = useState(task?.time || 0);

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(taskName, taskTime);
    }

    return (
        <div className="modal-background">
            <div className="modal">
                <h2 className="modal-title">
                    {mode === "add"? "Add Task" : "Edit Task"}
                </h2>

                <form className="task-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">
                            Enter Task Name: <span className="required">*</span>
                        </label>
                        <input 
                            id="name" 
                            type="text"
                            value={taskName}
                            required
                            placeholder="e.g. Finish project"
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">
                            Enter Estimated Time: <span className="optional">(optional)</span>
                        </label>
                        <select 
                            id="time" 
                            onChange={(e) => setTaskTime(Number(e.target.value))}
                            value={taskTime}
                        >
                            <option value="0">Select time</option>
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
                    </div>
                    <button 
                        type="submit" 
                        className="submit-btn"
                    >
                        {mode === "add" ? "Add Task" : "Save Changes"}
                    </button>
                    <div className="close-btn" onClick={onClose}>
                        &times;
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddTaskModal