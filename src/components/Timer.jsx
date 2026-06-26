import './Timer.css';
import { useState, useEffect } from 'react';
import { formatSecondsHHMMSS } from '../utils/timeUtils';

function Timer({projects, setProjects}) {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [selectedProjectId, setSelectedProjectId] = useState(projects[0].id);

    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
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
                ? { ...project, timeSpent: project.timeSpent + seconds }
                : project
            )
        )

        setIsRunning(false);
        setSeconds(0);
    }

    return (
        <div className="timer">
           <p className="time">{formatSecondsHHMMSS(seconds)}</p> 
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
             {seconds > 0? (
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