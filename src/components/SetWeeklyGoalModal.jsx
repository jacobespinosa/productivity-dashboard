import './SetWeeklyGoalModal.css';
import { useState } from 'react';

function SetWeeklyGoalModal({onSubmit, onClose, weeklyTimeGoal}) {
    const [weeklyGoal, setWeeklyGoal] = useState(weeklyTimeGoal);
    const hourlyWeeklyGoal = weeklyGoal / 3600;

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(weeklyGoal);
        onClose();
    }

    return (
        <div className="weekly-goal-modal-background">
            <div className="weekly-goal-modal">
                <h2 className="goal-modal-title">
                    Set Weekly Time Goal
                </h2>
                <div className='divider'></div>
                <form className='goal-form'
                      onSubmit={handleSubmit}
                      id="set-weekly-goal-form"
                >
                    <label htmlFor='hour-selector'>
                        Choose number of hours: 
                    </label>
                    <input type="number" 
                           className='goal-selector'
                           id="hour-selector" 
                           min="0"
                           required
                           value={hourlyWeeklyGoal}
                           onChange={(e) => setWeeklyGoal((e.target.value * 3600))}
                    />
                </form>
                <div className='divider'></div>
                <button type="submit" 
                        className="set-goal-btn" 
                        form="set-weekly-goal-form">
                    Set
                </button>
                <div className="project-close-btn" onClick={onClose}>
                    &times;
                </div>
            </div>
        </div>
    );
}

export default SetWeeklyGoalModal