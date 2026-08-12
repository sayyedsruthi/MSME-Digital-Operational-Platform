import { useEffect, useState } from "react";

import KPISection from "../../components/KPISection";
import { dashboardService } from "../../services/dashboardService";

import "../../styles/dashboard.css";

export default function Dashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data =
        await dashboardService.getSummary();

      setDashboard(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h2>{error}</h2>

        <button
          onClick={loadDashboard}
        >
          Retry
        </button>
      </div>
    );
  }

  const kpis = [
    {
      title: "Employees",
      value:
        dashboard?.totals
          ?.employees || 0,
      tone: "info",
    },
    {
      title: "Inventory",
      value:
        dashboard?.totals
          ?.inventory || 0,
      tone: "success",
    },
    {
      title: "Orders",
      value:
        dashboard?.totals
          ?.orders || 0,
      tone: "warning",
    },
    {
      title: "Production",
      value:
        dashboard?.totals
          ?.production || 0,
      tone: "info",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Dashboard
          </p>

          <h1>
            Factory Operations Overview
          </h1>

          <p>
            Live data from backend
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={loadDashboard}
        >
          Refresh
        </button>
      </div>

      <KPISection items={kpis} />

      <div className="grid-2">
        <section className="panel">
          <h3>
            Low Stock Items
          </h3>

          {dashboard?.lowStock
            ?.length ? (
            dashboard.lowStock.map(
              (item) => (
                <p
                  className="activity"
                  key={item.id}
                >
                  <strong>
                    {
                      item.product_name
                    }
                  </strong>

                  <span>
                    {item.quantity}
                  </span>
                </p>
              )
            )
          ) : (
            <p>
              No low stock items
            </p>
          )}
        </section>

        <section className="panel">
          <h3>
            Recent Orders
          </h3>

          {dashboard?.recentOrders
            ?.length ? (
            dashboard.recentOrders.map(
              (order) => (
                <p
                  className="activity"
                  key={order.id}
                >
                  <strong>
                    {order.order_no}
                  </strong>

                  <span>
                    {order.status}
                  </span>
                </p>
              )
            )
          ) : (
            <p>
              No recent orders
            </p>
          )}
        </section>
      </div>
    </div>
  );
}