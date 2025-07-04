import React, { useState, useEffect } from "react";

function AdminDataTable({ columns = [], data = [] }) {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  function handleSort(accessor) {
    let direction = "asc";
    if (sortConfig.key === accessor && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: accessor, direction });

    const sorted = [...sortedData].sort((a, b) => {
      if (a[accessor] < b[accessor]) return direction === "asc" ? -1 : 1;
      if (a[accessor] > b[accessor]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedData(sorted);
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-background shadow-md">
      <table className="min-w-full divide-y divide-muted text-sm">
        <thead className="bg-muted/50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor || col.Header}
                className={`whitespace-nowrap px-4 py-3 text-left font-semibold uppercase text-muted-foreground cursor-pointer select-none`}
                onClick={() => col.accessor && handleSort(col.accessor)}
              >
                {col.Header}
                {sortConfig.key === col.accessor ? (
                  sortConfig.direction === "asc" ? " ▲" : " ▼"
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-muted transition-opacity duration-300" key={sortedData.length}>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-muted-foreground">
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr key={row._id} className="transition-colors hover:bg-muted/40">
                {columns.map((col) => (
                  <td key={col.accessor} className="whitespace-nowrap px-4 py-3">
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