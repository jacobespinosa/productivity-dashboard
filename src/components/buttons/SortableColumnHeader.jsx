import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './SortableColumnHeader.css';

function SortableColumnHeader({label, field, sortConfig, onSort}) {
    return (
        <button 
            type="button" 
            className="sort-btn"
            onClick={() => onSort(field)}
        >
            <span>{label}</span>
            <span className="sort-icons">
                <FontAwesomeIcon icon={faChevronUp} className='chevron-up'
                    style={{"color": 
                        `${sortConfig.direction === "ascending" 
                            && sortConfig.field === field
                            ? "var(--text-primary)" : "var(--text-secondary)"}`}}/>
                <FontAwesomeIcon icon={faChevronDown} className='chevron-down'
                    style={{"color": 
                        `${sortConfig.direction === "descending"
                            && sortConfig.field === field
                            ? "var(--text-primary)" : "var(--text-secondary)"}`}}/>
            </span>
        </button>
    );
}

export default SortableColumnHeader