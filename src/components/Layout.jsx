import './Layout.css';
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

function Layout() {
    return (
        <div className="app-layout">
            <SideBar />
            <main className="page-content">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout