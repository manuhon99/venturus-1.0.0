import React, { useState } from "react";
import Draggable from "react-draggable";
import styles from "../../styles/actions/Filter.module.css";

//Function to filter searched data on search player input and make items draggable
export default function Filter({data}) {

  const [isActive, setActive] = useState(false);
  const state = {
    deltaXyPos: {
      x: 0, 
      y: 0
    }
  };
  let position = null
  
  //get x y position of item while dragging it
  //chage state that indicates when element is dragging
  const handleDrag = (e, d) => {
    const { x, y } = state.deltaXyPos;
    const setState = ({
      deltaXyPos: {
        x: x + d.deltaX,
        y: y + d.deltaY,
      }
    });
    position=setState
    //console.log(position);  
    setActive(true)
  };
  
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [isSearching, setSearching] = useState(false);
  //when the input value changes the search term is update
  const handleChange = event => {
     setSearchTerm(event.target.value);
     setSearching(!isSearching)
   };
   //the search result is saved on "results"
   //toLowerCase() converts all types to lower (when typing upper the result will appear anyway)
  React.useEffect(() => {
     const results = data.filter(filtered =>
       filtered.toLowerCase().includes(searchTerm.toLowerCase())
     );
     setSearchResults(results);
   }, [searchTerm]);

   //an input field is render with an unnorder list to show the data filtered
   //each result item is draggable
   return (
     <div className="App">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
        className={styles.inputFilter}
      />
      <ul className={ isSearching ? styles.playersListNone : styles.show} >  
        <div className={styles.playersList}>
          <div className={styles.nameNacionality}>
            <li>Name: <p>Cristiano Ronaldo</p></li>
            <li>Nacionality: <p>Portugal</p></li>
          </div>
          <div className={styles.age}>
            <li>Age: <p>32</p></li>
          </div>
        </div>
        <div className={styles.playersList}>
          <div className={styles.nameNacionality}>
            <li>Name: <p>Ronaldo Luiz de Alves</p></li>
            <li>Nacionality: <p>Brasil</p></li>
          </div>
          <div className={styles.age}>
            <li>Age: <p>28</p></li>
          </div>
        </div>
        <div className={styles.playersList}>
          <div className={styles.nameNacionality}>
            <li>Name: <p>Ronaldo da Silva de Souza</p></li>
            <li>Nacionality: <p>Brazil</p></li>
          </div>
          <div className={styles.age}>
            <li>Age: <p>18</p></li>
          </div>
        </div>
      </ul>

      <ul>    
         {searchTerm &&
          (searchResults.map(item => (
            <Draggable
            onStop={handleDrag}
            >
            <div className={styles.playersList}>
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