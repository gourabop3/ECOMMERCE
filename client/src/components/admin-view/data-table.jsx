import { Fragment } from "react";

function AdminDataTable({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-background shadow-sm">
      <table className="min-w-full divide-y divide-muted text-sm">
        <thead className="bg-muted/50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor || col.Header}
                className="whitespace-nowrap px-3 py-2 text-left font-semibold uppercase text-muted-foreground"
              >
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-muted">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-muted-foreground"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row._id} className="hover:bg-muted/40">
                {columns.map((col) => (
                  <td key={col.accessor} className="whitespace-nowrap px-3 py-2">
                    {col.Cell ? col.Cell(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDataTable;