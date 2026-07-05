import './Timer.css';
import { useState, useEffect, useRef } from 'react';
import { formatSecondsHHMMSS } from '../utils/timeUtils';
import DropdownSelector from '../components/DropdownSelector';

function Timer({projects, setProjects, timeByDate, setTimeByDate,
                currentSessionSeconds, setCurrentSessionSeconds,
                currentProjectId, setCurrentProjectId, selectedTask,
                setSelectedTask, tasksByDate, handleAddTask, setSelectedProjectId }) {
    const [isRunning, setIsRunning] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);
    
    const today = new Date();
    const dateKey = today.toLocaleDateString();
    const currentProject = projects.find(p => p.id === currentProjectId);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const isClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            return;
        }

        document.addEventListener("click", isClickOutside);

        return () => {
            document.removeEventListener("click", isClickOutside);
        }
    }, [])

    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setCurrentSessionSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [isRunning]);

    function handleClick() {
        setIsRunning(prev => !prev);
    }

    function handleEndSession() {
        setProjects(prevProjects => 
            prevProjects.map(project => 
                project.id === currentProjectId
                ? { ...project, timeSpent: project.timeSpent + currentSessionSeconds }
                : project
            )
        )

        setTimeByDate(prevTimeByDate => (
            {
                ...prevTimeByDate,
                [dateKey]: (prevTimeByDate[dateKey] ?? 0) + currentSessionSeconds 
            }
        ))

        setIsRunning(false);
        setCurrentSessionSeconds(0);
    }

    return (
        <div className="timer">
           <p className="time">{formatSecondsHHMMSS(currentSessionSeconds)}</p> 
           <div className="selector-container" ref={dropdownRef}
e               onClick={() => setIsDropdownOpen(prev => !prev)}>
            <span className="project-name">{currentProject.name}</span>
            <span className="task-name">{selectedTask?.name ? `: ${selectedTask.name}` : ""}</span>
            <div className="dropdown-container">
                    { isDropdownOpen && 
                        <DropdownSelector
                            projects={projects}
                            currentProjectId={currentProjectId}
                            setCurrentProjectId={setCurrentProjectId}
                            tasksByDate={tasksByDate}
                            setSelectedTask={setSelectedTask}
                            handleAddTask={handleAddTask}
                            setIsDropdownOpen={setIsDropdownOpen}
                        />
                    }
            </div>
           </div>

           <div className="btn-container">
             {currentSessionSeconds > 0? (
             <button className="btn end" onClick={handleEndSession}>
               end
             </button> 
             ) : null}

             <button 
                type="button" 
                onClick={handleClick}
                className={isRunning
                           ? "btn pause"
                           : "btn start"}>
                {isRunning? "pause" : "start"}
             </button>
           </div>
        </div>
    );
}

export default Timer