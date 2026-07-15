import './ProjectsPage.css';
import ProjectList from '../components/projects/ProjectList';

function ProjectsPage({ projects, setProjects, setIsCreateProjectOpen }) {
    return (
        <main className='projects'>
            <section className='projects-content'>
                <div className='projects-header'>
                    <h1>Projects</h1>
                </div>
                <div className="projects-create-project-btn"
                     onClick={() => setIsCreateProjectOpen(true)}>
                    Create New Project
                </div>
                <div className='projects-list'>
                    <ProjectList 
                        projects={projects}
                    />
                </div>
            </section>
        </main>
    );
}

export default ProjectsPage