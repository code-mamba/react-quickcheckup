import { useTable, useSortBy } from "react-table";
import "./table.css";

export const Table = ({ columns, data }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? "v" : "^") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length}>No Records Found</td>
          </tr>
        ) : (
          rows.map((row) => {
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
  );
};
