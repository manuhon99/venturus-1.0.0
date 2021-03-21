import React, {useState} from 'react';
import Link from 'next/link';
import { MdEdit } from "react-icons/md";
import { IconContext } from "react-icons";
import { TiArrowUnsorted } from "react-icons/ti";
import { useTable, useSortBy } from 'react-table';
import { IoMdTrash, IoMdShare } from "react-icons/io";
import useLocalStorageState from "use-local-storage-state";
import styles from '../../styles/components/TabledSavedTeams.module.css';


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

  // render 20 lines
  const firstPageRows = rows.slice(0, 8);

  const [isClick, setClick] = useState(false);

  function handleClick(){ 
    // Changing state 
    setClick(!isClick)
    console.log(isClick)
  } 

  return (
    
    <>
      <table className={styles.table} {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <span>   
                    {column.render('Header')}
                    
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
                <tr {...row.getRowProps()} onClick={() => handleClick()} >              
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

//function that creates the table
function TableTeams() {

  //this will be used later, to get the local storage saved team data
  const [times] = useLocalStorageState('times') 

  const makeData = [{"name": "Barcelona", "description": "Barcelona Squad"}, {"name": "Real Madrid", "description": "Real Madrid Squad"}, {"name": "Milan", "description": "Milan Squad"}, {"name": "Liverpool", "description": "Liverpool Squad"}, {"name": "Bayern Munich", "description": "Bayern Munich Squad"}, {"name": "Lazio", "description": "Lazio Squad"}]
  const [data, setData] = React.useState(React.useMemo(() => makeData, []));
  const columns = React.useMemo(
    () => [
          {
            Header: () => (
              <IconContext.Provider value={{ color: 'var(--text-list)', size: '14px' }}>
                Name
                <TiArrowUnsorted style={{marginLeft: '2rem'}} />
                <hr style={{transform: 'rotate(90deg)', width:'1.5rem', marginTop: '0rem'}}></hr>
              </IconContext.Provider>
            ),
            accessor: 'name',
          },
          {
            Header: () => ( 
              <p>
                Description
              </p>
 
            ),
            accessor: 'description',        
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
                <IoMdTrash style={{color: 'var(--text-list)'}}/>
              </span>
            )
          },
          {
            accessor: 'share', 
            Cell: () => (
              <span             
              >
                <IoMdShare style={{color: 'var(--text-list)'}}/>
              </span>
            )           
          },
          {
            Header: () => ( 
              <IconContext.Provider value={{ color: 'var(--text-list)', size: '14px'}}>
                <TiArrowUnsorted style={{marginLeft:'1rem'}}/>
              </IconContext.Provider>
            ),
            accessor: 'edit', 
            Cell: () => (
              <span  style={{marginRLeft:'10rem'}}>
                <Link href={`/teamConfig/${data.name}`}>
                  <a style={{color: 'var(--text-list)'}}>
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
      <Table columns={columns} data={data}></Table> 
  )
}

export default TableTeams
