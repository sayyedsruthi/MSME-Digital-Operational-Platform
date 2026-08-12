import DataTable from "../../components/DataTable";

import { useNotifications }
from "../../context/NotificationContext";

export default function Notifications() {
  const {
    notifications,
    markAllRead,
    loading,
  } =
    useNotifications();

  const rows =
    notifications.map(
      (item) => ({
        ...item,

        status:
          item.read_status
            ? "Read"
            : "Unread",
      })
    );

  const columns = [
    {
      key: "type",
      label: "Type",
    },

    {
      key: "message",
      label: "Message",
    },

    {
      key: "status",
      label: "Status",
    },

    {
      key: "id",
      label: "ID",
    },
  ];

  if (loading) {
    return (
      <div className="page">
        <h2>
          Loading
          Notifications...
        </h2>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Notifications
          </p>

          <h1>
            Alerts and
            Reminders
          </h1>

          <p>
            Low stock,
            production,
            orders and
            vendor alerts.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={
            markAllRead
          }
        >
          Mark All Read
        </button>
      </div>

      <DataTable
        columns={columns}
        data={rows}
      />
    </div>
  );
}