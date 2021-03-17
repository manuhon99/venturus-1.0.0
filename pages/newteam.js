import React from "react";
import ReactDOM from "react-dom";
import Head from "next/head";
import styles from "../styles/components/CreateNewTeam.module.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
         />
         <ul>
           {searchTerm ? 
            (searchResults.map(item => (
             <li>{item}</li>
            
           )))
            :
            (<li></li>)
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
            <input id="name" name="name" type="text" placeholder="Insert team name"/>
            <label htmlFor="name">Description</label>
            <input id="description" description="description" type="text"/>


          </div>
          <div className={styles.right}>
            <label htmlFor="website">Team website</label>
            <input id="website" name="website" type="text" placeholder="http://myteam.com"/>

            <label htmlFor="name">Team type</label>
            <div className={styles.teamType}>
              <label className={styles.teamTypeRadioButton}>Real
                <input type="radio" name="choice" />
                <span className={styles.checkMark}></span>
              </label>
              <label className={styles.teamTypeRadioButton}>Fantasy
                <input type="radio" name="choice"/>
                <span className={styles.checkMark}></span>
              </label>
            </div>
            
            <label htmlFor="name">Tags</label>
            <input id="tags" description="tags" type="text"/>
          </div>
        </div>

        <div className={styles.titleArea}>
        <h1>CONFIGURE SQUAD</h1>
        </div>

        <div className={styles.configureSquadContainer}>
          <div className={styles.formation}>
            <label htmlFor="formation">Formation</label>
            <input id="name" name="name" type="text" placeholder="Insert team name"/>
            <div className={styles.field}>formation image</div>
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
  const res = await fetch("https://api.football-data.org/v2/teams/18", requestOptions)
  const json = await res.json()

  json.squad.map((player) => {
  [player].filter((name) =>{
    list.push(name.name)
  }
  )})
  console.log(list)
  
  return{ data: list}
}
