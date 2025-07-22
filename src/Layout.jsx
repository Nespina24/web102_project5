import './App.css'
import { Outlet } from 'react-router-dom';

function Layout() {

    const refreshPage = () => {
        window.location.reload();
    };
    return (
        <div>
            <header className="dashboard">
                <button className="dashboard-element" onClick={refreshPage}>🏠 Dashboard</button>
                <button className="dashboard-element" onClick={refreshPage}>🔍 Search</button>
                <button className="dashboard-element" onClick={refreshPage}>ℹ️ About</button>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
