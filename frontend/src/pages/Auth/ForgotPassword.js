import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="auth-card">
      <h2>Reset Password</h2>

      <p>
        Password reset functionality has not been implemented yet.
      </p>

      <div className="form-stack">
        <button
          className="primary-btn"
          type="button"
          disabled
        >
          Coming Soon
        </button>
      </div>

      <p>
        <Link to="/login">
          Back to Login
        </Link>
      </p>
    </div>
  );
}