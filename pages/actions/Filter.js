import React, { useState } from "react";
import Draggable from "react-draggable";
import styles from "../../styles/components/CreateNewTeam.module.css";


export default function Filter({data}) {

  const [isactive, setActive] = useState(false);

  const eventControl = (event, info) => {
    console.log('Event name: ', event.type);
    console.log(event, info);
  }
  const state = {
    deltaXyPos: {
      x: 0, 
      y: 0
    }
  };
  let position = null
  
  const handleDrag = (e, d) => {
    const { x, y } = state.deltaXyPos;
    const setState = ({
      deltaXyPos: {
        x: x + d.deltaX,
        y: y + d.deltaY,
      }
    });
    position=setState
    console.log(position);  
    setActive(!isactive)
    
  };
  
  //takes the value from the user and saves it into the state
  const [searchTerm, setSearchTerm] = React.useState("");
  //set the search result
  const [searchResults, setSearchResults] = React.useState([]);
  //takes the event object as the arguement and sets the current value of the 
  //form to the searchTerm state using setSearchTerm method provided by 
  //React.useState method
  const handleChange = event => {
     setSearchTerm(event.target.value);
   };
   //whenever the value of the dependencies in the React.useEffect hook 
   //changes the function in its first argument execute
  React.useEffect(() => {
    //if the name in the names's list includes the searchTerm then return 
    //true otherwise return false
     const results = data.filter(filtered =>
       filtered.toLowerCase().includes(searchTerm.toLowerCase())
     );
     setSearchResults(results);
   }, [searchTerm]);

   return (
     <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className={styles.inputFilter}
      />
      <ul>  
        {data.map(item => (
          <div className={styles.playersList}>
            <div className={styles.nameNacionality}>
              <li>Name: {item}</li>
              <li>Nacionality: {item}</li>
            </div>
            <div className={styles.age}>
              <li>Age: {item}</li>
            </div>
          </div>
        ))
        }
      </ul>
      <ul>
         
         {searchTerm &&
          (searchResults.map(item => (
            
            <Draggable
            onStart={eventControl}
            onStop={handleDrag}
            >
            <div onDrag={() => setActive(isactive)} className={ isactive ? styles.playersList : styles.playericon}>
              <div className={styles.nameNacionality}>
                <li>Name: {item}</li>
                <li>Nacionality: {item}</li>
              </div>
              <div className={styles.age}>
                <li>Age: {item}</li>
              </div>
            </div>
            </Draggable>
          )))
            }
      </ul>
     </div>
   );
 }