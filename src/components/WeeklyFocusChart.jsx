import './WeeklyFocusChart.css';
import { formatMinutesHHMMIncludeZero, getWeeklyTimeStats } from '../utils/timeUtils';

function WeeklyFocusChart({ timeByDate }) {
    const weeklyTimeStats = getWeeklyTimeStats(timeByDate);
    const sortedTimeStats = weeklyTimeStats.toSorted((a, b) => b.time - a.time);
    const mostTime = sortedTimeStats[0].time;

    return (
        <div className="weekly-focus-chart-container">
            <h3 className="weekly-focus-chart-title">
                Weekly Focus Chart
            </h3>
            <ul className="focus-chart">
                {weeklyTimeStats.map(({day, time}) => {
                    const percent = Math.min((time / mostTime) * 100, 100);
                    return (
                        <li key={day} className="focus-chart-item">
                            <div className="focus-chart-bar">
                                <div className="focus-chart-time"
                                    style={{"bottom": `calc(${percent}% + 8px)`}}>
                                    {formatMinutesHHMMIncludeZero(time/60)}
                                </div>
                                <div className="progress-fill" 
                                     style={{"height": `${percent}%`}}></div>
                            </div>
                            <div className="focus-chart-label">
                                {day}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>        
    );
}

export default WeeklyFocusChart