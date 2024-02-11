import React, { useState } from "react";

import { useTable, useSortBy } from "react-table";

import {Button} from "src/components/atom/index"
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
      {pages>1 &&(
           <div className="pagination">
            <Button label="Previous" onClick={() => changePage(currentPage - 1)} variant="secondary" disabled={currentPage === pages - 1}/>
           <div className="page-of">
             Page {currentPage + 1} of {pages}
           </div>
           <Button label="Next" onClick={() => changePage(currentPage + 1)} variant="secondary" disabled={currentPage === pages - 1}/>
         </div>
      )}
   
    </div>
  );
};
