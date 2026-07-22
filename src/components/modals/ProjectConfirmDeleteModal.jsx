import './ProjectConfirmDeleteModal.css';

function ProjectConfirmDeleteModal({projectToDelete, setIsProjectConfirmDeleteModalOpen,
                                    handleDeleteProject
}) {
    return (
        <div className='project-confirm-delete-modal-background'>
            <div className='project-confirm-delete-modal'>
                <h1 className='modal-title'>Delete Project?</h1>
                <div className='divider'></div>
                <p className='modal-text'>
                    This will permanently delete 
                    "{projectToDelete.name}" 
                    and all of its tasks, sessions, and history. This action cannot be undone.
                </p>
                <div className='divider'></div>
                <div className="actions">
                    <button type='button' className='cancel'
                            onClick={() => setIsProjectConfirmDeleteModalOpen(false)}>
                        Cancel
                    </button>
                    <button type="button" className='delete'
                            onClick={() => handleDeleteProject(projectToDelete.id)}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProjectConfirmDeleteModal