import './Timer.css';
import { useState, useEffect } from 'react';
import { formatSecondsHHMMSS } from '../utils/timeUtils';

function Timer({projects, setProjects, timeByDate, setTimeByDate,
                currentSessionSeconds, setCurrentSessionSeconds}) {
    const [isRunning, setIsRunning] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);
    
    const today = new Date();
    const dateKey = today.toLocaleDateString();

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
                project.id === selectedProjectId
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
           <select className="project-selector" 
                   onChange={(e) => setSelectedProjectId(Number(e.target.value))}
           >
              {projects.map(project => (
                <option
                  key={project.id}
                  value={project.id}
                >
                  {project.name}
                </option>
              ))}
           </select>

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