import {
  useEffect,
  useState,
} from "react";

import DataTable from "../../components/DataTable";
import { reportService } from "../../services/reportService";

export default function EmployeeReport() {
  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const data =
      await reportService.employees();

    setEmployees(data);
  };

  const columns = [
    {
      key: "name",
      label: "Employee",
    },
    {
      key: "department",
      label: "Department",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "salary",
      label: "Salary",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Employee Report
          </p>

          <h1>
            Workforce Report
          </h1>
        </div>

        <button
          className="primary-btn"
        >
          Export PDF
        </button>
      </div>

      <DataTable
        columns={columns}
        data={employees}
      />
    </div>
  );
}