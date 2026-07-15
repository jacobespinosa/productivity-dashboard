import './StreaksCard.css';
import trophyIcon from '../../assets/trophy.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faSquare } from '@fortawesome/free-solid-svg-icons';
import { getTaskCompletionStreaks, getFocusGoalStreaks } from '../../utils/streakUtils';

function StreaksCard({tasksByDate, timeByDate}) {
    const weeklyFocusGoal = 7200 // 2 hours

    const {
        currentStreak: allTasksCompletedStreak,
        longestStreak: allTasksCompletedBest 
    } = getTaskCompletionStreaks(tasksByDate);

    const {
        currentStreak: dailyFocusGoalStreak, 
        longestStreak: dailyFocusGoalBest 
    } = getFocusGoalStreaks(timeByDate, weeklyFocusGoal)

    return (
        <div className='streaks-card-container'>
            <h3 className='streaks-card-header'>Streaks</h3>
            <div className="streak-display">
                <div className="all-tasks-completed">
                    <h4>Tasks Completed</h4>
                    <div className="streaks">
                        <div className='current-streak'>
                            <div className='days'>
                                <span className='number'>{allTasksCompletedStreak}</span>
                                <div className='fire-icon'>
                                    <FontAwesomeIcon 
                                        icon={faFire} 
                                        className='fire-outer'/>
                                    <FontAwesomeIcon 
                                        icon={faSquare}
                                        className='fire-inner' />
                                </div>
                            </div>
                            <span className='label'>Current</span>
                        </div>
                        <div className='best-streak'> 
                            <div className='days'>
                                <span className='number'>{allTasksCompletedBest}</span>
                                <img
                                    src={trophyIcon}
                                    alt="trophy"
                                    className='tropy-icon'
                                />
                            </div>
                            <span className='label'>Best</span>
                        </div>
                    </div>
                </div>
                <div className='divider-vertical'></div>
                <div className='daily-focus-goal'>
                    <h4>Daily Focus Goal</h4>
                    <div className="streaks">
                        <div className='current-streak'>
                            <div className="days">
                                <span className='number'>{dailyFocusGoalStreak}</span>
                                <div className='fire-icon'>
                                    <FontAwesomeIcon 
                                        icon={faFire} 
                                        className='fire-outer'/>
                                    <FontAwesomeIcon 
                                        icon={faSquare}
                                        className='fire-inner' />
                                </div>
                            </div>
                            <span className='label'>Current</span>
                        </div>
                        <div className='best-streak'> 
                            <div className='days'>
                                <span className='number'>{dailyFocusGoalBest}</span>
                                <img
                                    src={trophyIcon}
                                    alt="trophy"
                                    className='tropy-icon'
                                />
                            </div>
                            <span className='label'>Best</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StreaksCard