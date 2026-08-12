import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import { employeeService } from "../../services/employeeService";

export default function EmployeeProfile() {
  const { id } = useParams();

  const [employee, setEmployee] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const data =
        await employeeService.get(id);

      setEmployee(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <h2>Loading...</h2>;

  if (!employee)
    return (
      <h2>
        Employee not found
      </h2>
    );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Employee Profile
          </p>

          <h1>
            {employee.name}
          </h1>

          <p>
            {employee.role} -
            {employee.department}
          </p>
        </div>
      </div>

      <section className="panel detail-grid">
        <p>
          <strong>ID:</strong>
          {" "}
          {employee.id}
        </p>

        <p>
          <strong>Salary:</strong>
          {" "}
          {employee.salary}
        </p>

        
      </section>
    </div>
  );
}