import React from 'react'
import styled from 'styled-components'
import { useTable, useSortBy } from 'react-table'
import { IoMdTrash, IoMdShare } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { TiArrowUnsorted } from "react-icons/ti";
import { IconContext } from "react-icons";
import Link from 'next/link';
import useLocalStorageState from "use-local-storage-state";


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

    th{
      padding-bottom: 2rem;
      :last-child {
        border-right: 0;
      }
    }

    td {
      padding-bottom: 1rem;
      :last-child {
        border-right: 0;
      }

    }

    th span{
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .myreact-icons { color: red;
                 height: 40px;
               }
  }
`

function Table({ columns, data}) {
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
  );
    // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 8);


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
                  <span>   
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    
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
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell')} 

                        
                        <hr></hr>
                      </td>                           
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
  const [todos, setTodos, isPersistent] = useLocalStorageState('todos', ['buy milk'])

  const makeData = [{"firstName": "Barcelona", "lastName": "Barcelona Squad"}, {"firstName": "Real Madrid", "lastName": "Real Madrid Squad"}, {"firstName": "Milan", "lastName": "Milan Squad"}, {"firstName": "Liverpool", "lastName": "Liverpool Squad"}, {"firstName": "Bayern Munich", "lastName": "Bayern Munich Squad"}, {"firstName": "Lazio", "lastName": "Lazio Squad"}]
  const [data, setData] = React.useState(React.useMemo(() => makeData, []));
  const columns = React.useMemo(
    () => [
          {
            Header: () => (
              
              <IconContext.Provider value={{ color: 'grey', size: '16px' }}>
                Name
                      <TiArrowUnsorted/>
                      <hr style={{transform: 'rotate(90deg)', width:'2rem'}}></hr>
                    </IconContext.Provider>
            ),
            accessor: 'firstName',
          },
          {
            Header: () => (
              
              <IconContext.Provider value={{ color: 'grey', size: '16px' }}>
                Description
                      <TiArrowUnsorted/>
                    </IconContext.Provider>
            ),
            accessor: 'lastName',  
          
          },

          {       
            accessor: 'delete', 
            icon: '',
            Cell: (tableProps) => (
              <span
                style={{
                  cursor: "pointer",
                  color: "gray",
                  textDecoration: "none"
                }}
                onClick={() => {
                  // ES6 Syntax use the rvalue if your data is an array.
                  const dataCopy = [...data];
                  // It should not matter what you name tableProps. It made the most sense to me.
                  dataCopy.splice(tableProps.row.index, 1);
                  setData(dataCopy);
                }}
              >
                <IoMdTrash/>
              </span>
            )
          },
          {
            accessor: 'share', 
            Cell: () => (
              <span
              
              >
                <IoMdShare/>
              </span>
            )
            
          },
          {
            accessor: 'edit', 
            Cell: () => (
              <span

              >
                <Link href={`/teamConfig/${todos[1]}`}>
                      <a style={{color: 'black'}}>
                        <MdEdit/>   
                      </a>
                    </Link>
              </span>
            )
            
          }
    ],
    [data]
  )


  return (
    <Styles>
      <Table columns={columns} data={data}></Table> 
    </Styles>
  )
}

export default App
