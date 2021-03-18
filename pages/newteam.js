import React, { Fragment, useState } from "react";
import Head from "next/head";
import styles from "../styles/components/CreateNewTeam.module.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DraggableComponent from "./components/Draggble";
import Example from "./components/Tag";
import App from "./components/SelectFormation";
import Draggable from "react-draggable";


export default function NewTeam({data}) {

  function Filter() {
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
           {searchTerm &&
            (searchResults.map(item => (
              <Draggable>
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

  return (
    <div>
      <Head>
        <title>Squad Management Tool</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>

      <Navbar></Navbar>
      
      <div className={styles.createContainer}>
        <div className={styles.createTopBar}>
          <h1>Create your team</h1>
          
        </div>
        <hr/>

        <div className={styles.titleArea}>
        <h1>TEAM INFORMATION</h1>
        </div>
        

        <div className={styles.teamInformationContainer}>
          <div className={styles.left}>

            <label htmlFor="name">Team name</label>
            <input id="name" name="name" type="text" placeholder="Insert team name" required/>
            <label htmlFor="name">Description</label>
            <input className={styles.description} description="description" type="text" height="50rem"/>


          </div>
          <div className={styles.right}>
            <label htmlFor="website">Team website</label>
            <input className={styles.noTag} id="website" name="website" type="url" pattern="https?://.+" placeholder="http://myteam.com" required/>

            <label className={styles.teamTypeLabel} htmlFor="name">Team type</label>
            <div className={styles.teamType} required>
              <section>
                <label className={styles.teamTypeRadioButton}>
                  <p>Real</p>
                  <input type="radio" name="choice" />
                  <span className={styles.checkMark}></span>
                </label>
                <label className={styles.teamTypeRadioButton}>
                  <p>Fantasy</p>
                  <input type="radio" name="choice"/>
                  <span className={styles.checkMark}></span>
                </label>
              </section>
            </div>
            
            <label className={styles.tagInputLabel} htmlFor="name">Tags</label>
            <Example></Example>
          </div>
          
        </div>

        <div className={styles.titleArea}>
        <h1>CONFIGURE SQUAD</h1>
        </div>

        <div className={styles.configureSquadContainer}>
          <div className={styles.formation}>
            <App></App>
            <button>Save</button>
          </div>
          <div className={styles.players}>           
            <label htmlFor="search">Search Players</label>

            <Filter/>
            <hr></hr>
            
          </div>          
        </div>

      </div>      
      <Footer></Footer>
    </div>
  );
}


NewTeam.getInitialProps = async (ctx) => {
  var myHeaders = new Headers();
  myHeaders.append("X-Auth-Token", "c6c5ead4f76549e5bc06ed2971336fc0");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  let list = []
  let jsonList = []
  for(let i=1;i<5;i++){
    let id=i
    const res = await fetch(`https://api.football-data.org/v2/players/${id}`, requestOptions)
    const json = await res.json()
    jsonList.push(json)
  }
  console.log(jsonList)
  jsonList.map((player) => {
    list.push(player.name)
  })
  console.log(list)
  
  return{ data: list}
}
