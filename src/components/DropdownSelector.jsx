import './DropdownSelector.css';

function DropdownSelector({projects, currentProjectId, setCurrentProjectId,
                          tasksByDate, setSelectedTask, handleAddTask,
                          setIsDropdownOpen}) {

    const currentProject = projects.find(p => p.id === currentProjectId);
    const projectTasks =  Object.values(tasksByDate).flat().filter(task => 
        task.projectId === currentProjectId && !task.isDone)

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    const todayDatekey = todayDate.toLocaleDateString();

    return (
        <div className="dropdown-selector">
            <p className="default-project-option"
                    onClick={() => {
                        setCurrentProjectId(projects[0].id);
                        setSelectedTask(null);
                    }}
            >
                {projects[0].name}
            </p>
            <p className="project-selector-title">Projects:</p>
            <ul className="project-options">
            {projects.map((project, index) => {
                if (index === 0) return;
                return (
                    <li className="project-option"
                        key={project.id}
                        onClick={() => {
                            setCurrentProjectId(project.id)
                            setSelectedTask(null);
                        }}
                    >
                        <span>{project.name}</span>
                        <button type="button" 
                                className="selector-add-task-btn"
                                onClick={() => {
                                    setCurrentProjectId(project.id);
                                    handleAddTask(todayDatekey);
                                }}
                        >
                            Add Task
                        </button>
                    </li>
                )
            })}
            </ul>
            <div className="task-selector">
                <p className="task-selector-title">
                    {currentProjectId === 0 ? "General tasks: " 
                        : `${currentProject.name} tasks:`}
                </p>
                <ul className="task-options">
                    {projectTasks.map(task =>
                        <li className="task-option"
                            key={task.id}    
                            onClick={() => setSelectedTask(task)} 
                        >
                            {task.name}
                        </li>
                    )}
                </ul>
            </div>
            <div className="create-project-btn-container">
                <div className="divider"></div>
                <button type="button" className="create-project-btn">
                    Create New Project
                </button>
            </div>
        </div>
    );
}

export default DropdownSelector