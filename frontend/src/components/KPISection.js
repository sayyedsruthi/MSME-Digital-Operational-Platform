import DashboardCard from "./DashboardCard";

export default function KPISection({ items }) {
  return (
    <section className="grid-4">
      {items.map((item) => (
        <DashboardCard key={item.title} {...item} />
      ))}
    </section>
  );
}
