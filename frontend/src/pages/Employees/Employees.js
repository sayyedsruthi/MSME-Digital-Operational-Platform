import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../components/DataTable";
import { employeeService } from "../../services/employeeService";

export default function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);

      const data =
        await employeeService.list();

      setEmployees(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load employees"
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
    },
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

  if (loading)
    return <h2>Loading...</h2>;

  if (error)
    return <h2>{error}</h2>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Employee Management
          </p>

          <h1>
            Employee Dashboard
          </h1>
        </div>

        <div>
          <button
            className="secondary-btn"
            onClick={() =>
              navigate(
                "/employees/attendance"
              )
            }
          >
            Attendance
          </button>

          <button
            className="primary-btn"
            onClick={() =>
              navigate(
                "/employees/add"
              )
            }
          >
            Add Employee
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={employees}
        onView={(row) =>
          navigate(
            `/employees/${row.id}`
          )
        }
      />
    </div>
  );
}