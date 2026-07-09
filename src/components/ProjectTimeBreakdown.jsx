import './ProjectTimeBreakdown.css';
import { getWeeklyProjectStats } from '../utils/projectUtils';
import { formatMinutesHHMMIncludeZero, getWeeklyTotalTime } from '../utils/timeUtils';

function ProjectTimeBreakdown({ projects, tasksByDate, timeByDate }) {
    const projectStats = getWeeklyProjectStats(projects, tasksByDate);
    const sortedProjectStats = projectStats.toSorted((a, b) => b.time - a.time);
    const mostTimeSpent = sortedProjectStats[0].time;
    const totalWeeklyTime = getWeeklyTotalTime(timeByDate) / 60;

    return (
        <div className="project-weekly-breakdown-container">
            <h3 className="project-weekly-breakdown-title">
                Project Weekly Breakdown
            </h3>
            <ul className="project-weekly-breakdown-list">
                {sortedProjectStats.map(({project, time}) => {
                    const percent = Math.min((time / mostTimeSpent) * 100, 100);
                    const totalWeekPercent = Math.min((time / totalWeeklyTime) * 100, 100).toFixed(0);
                    return (
                        <li className="project-weekly-breakdown-item"
                            key={project.id}>
                            <div className="project-weekly-breakdown-label">
                                <span className="color-dot"
                                    style={{"color": `${project.color}`}}>
                                        ●
                                </span>
                                <span className="project-name">{project.name}</span>
                            </div>
                            <div className="project-weekly-breakdown-bar"
                                 style={{
                                    "--progress": `${percent}%`,
                                    "--projectColor": `${project.color}`
                                 }}>
                            </div>
                            <div className="breakdown-time-percent-container">
                                <span className="project-weekly-breakdown-time">
                                    {formatMinutesHHMMIncludeZero(time)}
                                </span>
                                <span className="project-weekly-breakdown-percent">
                                    ({totalWeekPercent}%)
                                </span>
                            </div>
                        </li>
                    )})}
            </ul>
        </div>
    );
}

export default ProjectTimeBreakdown