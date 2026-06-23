import './Dashboard.css';
import SideBar from "../components/SideBar";
import Timer   from "../components/Timer";
import WeeklyCalender from '../components/WeeklyCalender';

function Dashboard({projects, setProjects}) {
  return (
      <main className="dashboard">
        <SideBar />

        <section className="dashboard-content">
          <Timer
            projects={projects}
            setProjects={setProjects}
          />
          <WeeklyCalender />
        </section>
      </main>
  );
}

export default Dashboard