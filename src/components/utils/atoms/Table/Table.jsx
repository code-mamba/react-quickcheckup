import { useTable, useSortBy } from "react-table";
import { useMemo } from "react";
import './table.css'

export const Table = (props) => {
  const columns = useMemo(() => props.COLUMNS, []);
  const data = useMemo(() => props.DATA, []);

  const tableInstance = useTable({
    columns,
    data,
  },useSortBy);
const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance


  return (
    <table  {...getTableProps()}>
      <thead>
        {
          headerGroups.map((headerGroup)=>(
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column=>(
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? 'v':'^'):''}
                  </span>
                  
                  </th>
                ))
              }

            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          rows.map(row =>{
            prepareRow(row)
            return(
              <tr {...row.getRowProps()} >
                  {
                    row.cells.map(cell=>{
                      return(
                        <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
                      )
                    })
                  }

              </tr>
            )
          })
        }
 
      </tbody>
    </table>
  );
};
