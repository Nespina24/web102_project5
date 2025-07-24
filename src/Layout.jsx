import './App.css';
import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout-container">
      <nav className="sidebar">
        <Link to="/">
          <button className="dashboard-element">🏠 Dashboard</button>
        </Link>
        <Link to="/search">
          <button className="dashboard-element">🔍 Search</button>
        </Link>
        <Link to="/about">
          <button className="dashboard-element">ℹ️ About</button>
        </Link>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}