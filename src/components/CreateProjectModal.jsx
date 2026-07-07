import './CreateProjectModal.css';
import { useState } from 'react';

function CreateProjectModal({ onSubmit, onClose }) {
    const [projectName, setProjectName] = useState("");
    const [projectColor, setProjectColor] = useState("#4CC9FE");

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(projectName, projectColor);
        onClose();
    }

    return (
        <div className="project-modal-background">
            <div className="project-modal">
                <h2 className="project-modal-title">
                    Create Project
                </h2>
                <div className='divider'></div>
                <form className="project-form" 
                      onSubmit={handleSubmit}
                      id="create-project-form"
                >
                    <input type="text" 
                           className="project-name-input"
                           required
                           placeholder='Enter project name'
                           onChange={(e) => setProjectName(e.target.value)}
                    />
                    <input type='color' 
                           className="project-color-input" 
                           value={projectColor}
                           onChange={(e) => setProjectColor(e.target.value)}
                    />
                </form>
                <div className='divider'></div>
                <button type="submit" 
                        className="add-project-btn" 
                        form="create-project-form"
                >
                    Create
                </button>
                <div className="project-close-btn" onClick={onClose}>
                    &times;
                </div>
            </div>
        </div>
    )
}

export default CreateProjectModal