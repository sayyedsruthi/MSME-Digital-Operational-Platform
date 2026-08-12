import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

      await login(form);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>

      <p>
        Access your manufacturing
        operations workspace.
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
          Email
          <input
            type="email"
            required
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
            type="password"
            required
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

        <button
          className="primary-btn"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>
      </form>

      <p>
        New user?{" "}
        <Link to="/register">
          Create account
        </Link>
      </p>

      <p>
        <Link to="/forgot-password">
          Forgot password?
        </Link>
      </p>
    </div>
  );
}