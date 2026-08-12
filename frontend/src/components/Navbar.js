import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";
import useAuth from "../hooks/useAuth";
import "../styles/navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Manufacturing ERP</p>
        <h2>MSME Digital Operations Platform</h2>
      </div>
      <div className="navbar-actions">
        <NotificationBell />
        <Link className="profile-chip" to="/dashboard">
          <span>{user?.name?.charAt(0) || "U"}</span>
          <div>
            <strong>{user?.name}</strong>
            <small>{user?.role}</small>
          </div>
        </Link>
        <button className="secondary-btn" onClick={logout}>Logout</button>
      </div>
    </header>
  );
}
