export default function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="loading-spinner">
      <span />
      {label}
    </div>
  );
}
