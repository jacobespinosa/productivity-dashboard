import './SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFolder,  } from '@fortawesome/free-regular-svg-icons';
import { faChartLine, faGear, faBorderAll } from '@fortawesome/free-solid-svg-icons';

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <a href="#">App Name</a>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">Menu</p>
        <a href="#" className="sidebar-link">
          <FontAwesomeIcon icon={faBorderAll} />
          Dashboard
        </a>
        <a href="#" className="sidebar-link">
          <FontAwesomeIcon icon={faCalendar} />
          Calendar
        </a>
        <a href="#" className="sidebar-link">
          <FontAwesomeIcon icon={faFolder} />
          Projects
        </a>
        <a href="#" className="sidebar-link">
          <FontAwesomeIcon icon={faChartLine} />
          Analytics
        </a>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-title">General</p>
        <a href="#" className="sidebar-link">
          <FontAwesomeIcon icon={faGear} />
          Settings
        </a>
      </div>
    </aside>
  );
}

export default SideBar