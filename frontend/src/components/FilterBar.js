export default function FilterBar({ value, onChange, options = [] }) {
  return (
    <select className="filter-bar" value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">All Status</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}
