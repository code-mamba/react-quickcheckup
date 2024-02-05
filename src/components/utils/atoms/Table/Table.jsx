import React, { useState } from "react";
import { useTable, useSortBy } from "react-table";
import "./table.css";

export const Table = ({ columns, data, pageSize = 5 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const pages = Math.ceil(rows.length / pageSize);

  const paginatedRows = rows.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const changePage = (page) => {
    const newPage = Math.max(0, Math.min(page, pages - 1));
    setCurrentPage(newPage);
  };

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? "v" : "^") : ""}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {paginatedRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>No Records Found</td>
            </tr>
          ) : (
            paginatedRows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button className="previous" onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0}>
          Previous
        </button>
        <p>
          Page {currentPage + 1} of {pages}
        </p>
        <button className="next" onClick={() => changePage(currentPage + 1)} disabled={currentPage === pages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};
