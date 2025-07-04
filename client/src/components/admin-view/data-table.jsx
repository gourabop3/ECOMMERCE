import React, { useState, useMemo } from "react";

function AdminDataTable({ columns = [], data = [], pageSize = 10 }) {
  // ===== Sorting =====
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  function handleSort(key) {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  }

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (valA === valB) return 0;
      const order = valA > valB ? 1 : -1;
      return sortConfig.direction === "asc" ? order : -order;
    });
  }, [data, sortConfig]);

  // ===== Pagination =====
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-background shadow-sm">
      <table className="min-w-full divide-y divide-muted text-sm">
        <thead className="bg-muted/50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor || col.Header}
                onClick={() => col.accessor && handleSort(col.accessor)}
                className="whitespace-nowrap px-3 py-2 text-left font-semibold uppercase text-muted-foreground cursor-pointer select-none"
              >
                {col.Header}
                {sortConfig.key === col.accessor ? (
                  <span className="ml-1">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-muted">
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-muted-foreground">
                No data available
              </td>
            </tr>
          ) : (
            paginatedData.map((row) => (
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

      {/* Pagination Controls */}
      {sortedData.length > pageSize && (
        <div className="flex items-center justify-end gap-2 p-3 text-xs">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 bg-muted rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 bg-muted rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDataTable;