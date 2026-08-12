import "../styles/table.css";

export default function DataTable({ columns, data, onView, onEdit }) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            {(onView || onEdit) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>
              ))}
              {(onView || onEdit) && (
                <td className="table-actions">
                  {onView && <button onClick={() => onView(row)}>View</button>}
                  {onEdit && <button onClick={() => onEdit(row)}>Edit</button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
