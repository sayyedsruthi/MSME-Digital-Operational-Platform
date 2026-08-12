import { Link } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

export default function NotificationBell() {
  const { unreadCount } = useNotifications();
  return (
    <Link className="notification-bell" to="/notifications">
      Alerts
      {unreadCount > 0 && <span>{unreadCount}</span>}
    </Link>
  );
}
