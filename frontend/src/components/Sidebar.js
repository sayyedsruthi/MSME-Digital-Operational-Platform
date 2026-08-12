import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const navItems = [
  ["/dashboard", "Dashboard", "▦"],
  ["/inventory", "Inventory", "▤"],
  ["/orders", "Orders", "◫"],
  ["/vendors", "Vendors", "◇"],
  ["/employees", "Employees", "◎"],
  ["/production", "Production", "◈"],
  ["/reports", "Reports", "▣"],
  ["/notifications", "Notifications", "◌"]
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">M</div>
        <div>
          <strong>MSME Ops</strong>
          <small>Digital ERP</small>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(([to, label, icon]) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            <span>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
