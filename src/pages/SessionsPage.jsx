import './SessionsPage.css';
import SessionsHistory from '../components/sessions/SessionsHistory';
import { getSortedSessions } from '../utils/sessionUtils';

function SessionsPage({sessions, setSessions, tasksByDate, projects, timeByDate,
                       weeklyTimeGoal
}) {
    const sortedSessions = getSortedSessions(sessions);
    return (
        <main className="sessions">
            <section className="sessions-content">
                <div className="sessions-header">
                    <h1>Sessions</h1>
                </div>
                <div className="sessions-list">
                    <SessionsHistory 
                        sessions={sortedSessions} 
                        setSessions={setSessions}
                        tasksByDate={tasksByDate}
                        projects={projects}
                        timeByDate={timeByDate}
                        weeklyTimeGoal={weeklyTimeGoal}
                    />
                </div>
            </section>
        </main>
    );
}

export default SessionsPage