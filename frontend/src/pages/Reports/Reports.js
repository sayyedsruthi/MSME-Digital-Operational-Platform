import { useNavigate } from "react-router-dom";

export default function Reports() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Reports Center
          </p>

          <h1>
            Reports & Analytics
          </h1>

          <p>
            Generate inventory,
            employee and sales reports.
          </p>
        </div>
      </div>

      <section className="grid-3">
        <button
          className="panel report-tile"
          onClick={() =>
            navigate(
              "/reports/inventory"
            )
          }
        >
          Inventory Report
        </button>

        <button
          className="panel report-tile"
          onClick={() =>
            navigate(
              "/reports/sales"
            )
          }
        >
          Sales Report
        </button>

        <button
          className="panel report-tile"
          onClick={() =>
            navigate(
              "/reports/employees"
            )
          }
        >
          Employee Report
        </button>
      </section>
    </div>
  );
}