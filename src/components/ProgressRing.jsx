import './ProgressRing.css';
import { formatSecondsHHMM } from '../utils/timeUtils';

function ProgressRing({value, goal, title, type, onClick}) {
    const percent = goal > 0 ? Math.min((value / goal) * 100, 100) : 0;

    const displayValue = type === "time" ? formatSecondsHHMM(value) : value;
    const displayGoal  = type === "time" ? formatSecondsHHMM(goal)  : goal;
    const display = type === "time" 
                ? `${displayValue}\n${displayGoal}` : `${displayValue} / ${displayGoal}`;

    return (
        <div className="progress-ring">
            <h3 className="progress-ring-title">{title}</h3>
            <div className={`progress-ring-circle ${percent === 100 ? "completed" : ""}`}
                 style={{ "--progress": `${percent}%` }}
            >
                <div className="progress-ring-inner-circle">
                    <button className={`ring-fraction ${percent === 100 ? "completed" : ""} ${onClick? "clickable" : ""}`}
                          onClick={onClick? onClick : undefined}>
                        {display}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProgressRing