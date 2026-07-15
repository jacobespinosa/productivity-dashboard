import './ProjectList.css';
import { useState } from 'react';
import { formatMinutesHHMMIncludeZero } from '../../utils/timeUtils';

function ProjectList({projects}) {
    const [sortConfig, setSortConfig] = useState({
        field: "name",
        direction: "ascending"
    })

    const sortedProjects = projects.toSorted((a, b) => {
        const { field, direction } = sortConfig;

        let comparison = 0;
        if (field === "name") {
            comparison = a.name.localeCompare(b.name);
        }
        else if (field === "timeSpent") {
            comparison = a.timeSpent - b.timeSpent;
        }

        return direction === "ascending"
                    ? comparison
                    : -comparison;
    })

    function handleSort(field) {
        setSortConfig(current => {
            const clickedSameKey = current.field === field;

            return {
                field,
                direction:
                    clickedSameKey && current.direction === "ascending"
                    ? "descending"
                    : "ascending"
            }; 
        });
    }

    return (
        <div className='project-list-container'>
            <h3 className='project-list-header'>
                projects
            </h3>
            <div className='project-list-top-label'>
                <button type="button" className='project-list-name-btn'
                        onClick={() => handleSort("name")}>
                    Name
                </button>
                <button type="button" className='project-list-time-btn'
                        onClick={() => handleSort("timeSpent")}>
                    Tracked
                </button>
                <button type="button" className='project-list-filter-btn'>
                    {}
                </button>
            </div>
            <ul className='project-list'>
                {sortedProjects.map(project => {
                    return (
                        <li key={project.id}
                            className="project-list-item"
                        >
                            <div className="name-label">
                                <span className="project-dot"
                                    style={{"color": `${project.color}`}}>●</span>
                                <span className="project-name">{project.name}</span>
                            </div>
                            <div className="divider-vertical"></div>
                            <span className="project-tracked-time">
                                {formatMinutesHHMMIncludeZero(project.timeSpent / 60)}
                            </span>
                            <button type="button" className="project-item-archive-btn">
                                Archive
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ProjectList