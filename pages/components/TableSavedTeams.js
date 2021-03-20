import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'
import { IoMdTrash, IoMdShare } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { TiArrowUnsorted } from "react-icons/ti";
import { IconContext } from "react-icons";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px ;
    width: 200%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding-bottom: 2rem;


      :last-child {
        border-right: 0;
      }
    }
    .myreact-icons { color: red;
                 height: 40px;
               }
  }
`

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    <IconContext.Provider value={{ color: 'grey', size: '16px' }}>
                      <TiArrowUnsorted/>
                    </IconContext.Provider>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      <br />
    </>
  )
}

function App() {
  const columns = React.useMemo(
    () => [

          {
            Header: 'Name',
            accessor: 'firstName',
          },
          {
            Header: 'Description',
            accessor: 'lastName',
    
      },
    ],
    []
  )

  const data = [{"firstName": "Barcelona", "lastName": "Barcelona Squad"}, {"firstName": "Real Madrid", "lastName": "Real Madrid Squad"}, {"firstName": "Milan", "lastName": "Milan Squad"}, {"firstName": "Liverpool", "lastName": "Liverpool Squad"}, {"firstName": "Bayern Munich", "lastName": "Bayern Munich Squad"}, {"firstName": "Lazio", "lastName": "Lazio Squad"}]

  return (
    <Styles>
      <Table columns={columns} data={data} />
      <IoMdTrash/>
      <IoMdShare/>
      <MdEdit/>
    </Styles>
  )
}

export default App
