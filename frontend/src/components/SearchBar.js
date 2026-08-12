export default function SearchBar({ value, onChange, placeholder = "Search records..." }) {
  return (
    <div className="search-bar">
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </div>
  );
}
