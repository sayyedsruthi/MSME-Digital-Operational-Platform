export default function DashboardCard({ title, value, change, tone = "info" }) {
  return (
    <article className={`dashboard-card ${tone}`}>
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{change}</small>
    </article>
  );
}
