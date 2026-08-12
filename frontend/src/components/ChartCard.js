import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

export default function ChartCard({ title, type = "line", data, dataKey = "value", xKey = "name" }) {
  return (
    <section className="panel chart-card">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        {type === "bar" ? (
          <BarChart data={data} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbe3ef" />
            <XAxis dataKey={xKey} stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Bar dataKey={dataKey} fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbe3ef" />
            <XAxis dataKey={xKey} stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke="#0f766e" strokeWidth={3} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </section>
  );
}
