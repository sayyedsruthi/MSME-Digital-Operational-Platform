import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/FormInput";
import { employeeService } from "../../services/employeeService";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    department: "",
    role: "",
    salary: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await employeeService.create(form);

      navigate("/employees");
    } catch (err) {
      setError(
        err.message ||
          "Failed to create employee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Employees
          </p>

          <h1>
            Add Employee
          </h1>
        </div>
      </div>

      <section className="panel">
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form
          className="form-grid"
          onSubmit={handleSubmit}
        >
          <FormInput
            label="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <FormInput
            label="Department"
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department:
                  e.target.value,
              })
            }
          />

          <FormInput
            label="Role"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          />

          <FormInput
            label="Salary"
            value={form.salary}
            onChange={(e) =>
              setForm({
                ...form,
                salary:
                  e.target.value,
              })
            }
          />

          <button
            className="primary-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Employee"}
          </button>
        </form>
      </section>
    </div>
  );
}