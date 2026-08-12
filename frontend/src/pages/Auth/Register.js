import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Operations Manager",
  });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const submit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await register(form);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>

      <p>
        Create a role-based account
        for the ERP workspace.
      </p>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <form
        onSubmit={submit}
        className="form-stack"
      >
        <label>
          Name
          <input
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        </label>

        <label>
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </label>

        <label>
          Password
          <input
            required
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password:
                  e.target.value,
              })
            }
          />
        </label>

        <label>
          Role
          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option>Admin</option>

            <option>
              Operations Manager
            </option>

            <option>
              Inventory Executive
            </option>

            <option>
              HR Manager
            </option>
          </select>
        </label>

        <button
          className="primary-btn"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>
      </form>

      <p>
        Already registered?{" "}
        <Link to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}