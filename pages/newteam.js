import Head from "next/head";
import Filter from "./actions/Filter";
import Example from "./components/Tag"; 
import React, { useState } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import App from "./actions/SelectFormation";
import styles from "../styles/CreateNewTeam.module.css";
import { createLocalStorageStateHook } from "use-local-storage-state";

//New team page
export default function NewTeam({data}) {

  const useEquips = createLocalStorageStateHook("equips", []);

  const [equips, setEquips] = useEquips();
  const [equip, setEquip] = useState("");

  const onClick = () => {
    setEquips([...equips, equip]);
    setEquip("");
  };

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
            <input onChange={e => setEquip({'name': e.target.value})} id="name" name="name" type="text" placeholder="Insert team name" required/>
            <label htmlFor="name">Description</label>
            <input onChange={e => setEquip({'description': e.target.value})} className={styles.description} description="description" type="text" height="50rem"/>
          </div>

          <div className={styles.right}>
            <label htmlFor="website">Team website</label>
            <input onChange={e => setEquip({'website': e.target.value})} className={styles.noTag} id="website" name="website" type="url" pattern="https?://.+" placeholder="http://myteam.com" required/>
            
            <label className={styles.teamTypeLabel} onChange={e => setEquip({'type': e.target.value})} htmlFor="name">Team type</label>
            <div className={styles.teamType}>
              <section>            
                <label className={styles.teamTypeRadioButton}>
                  <p>Real</p>
                  <input type="radio" name="choice" />
                  <span className={styles.checkMark}></span>
                </label>
              </section>

              <section className={styles.fantasy}>
                <label className={styles.teamTypeRadioButton}>
                  <p>Fantasy</p>
                  <input type="radio" name="choice"/>
                  <span className={styles.checkMark}></span>
                </label>
              </section>

              
            </div>
            
            <label className={styles.tagInputLabel} htmlFor="name">Tags</label>
            <Example onChange={e => setEquip({'tag': e.target.value})}></Example>
          </div>
          
        </div>

        <div className={styles.titleArea}>
          <h1>CONFIGURE SQUAD</h1>
        </div>

        <div className={styles.configureSquadContainer}>
          
          <div className={styles.formation} >
            <App onChange={e => setEquip({'tatic': e.target.value})}></App>
            <button onClick={onClick} type="submit">Save</button>
          </div>

          <div className={styles.players}>           
            <label htmlFor="search">Search Players</label>
        
            <Filter data={data}></Filter>

            <hr></hr>
            
          </div>          
        </div>
      </div>      

      <Footer></Footer>

    </div>
  );
}

//api football data with a free token that has a limit of 10 requests per minute
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
  for(let i=40;i<45;i++){
    let id=i
    const res = await fetch(`https://api.football-data.org/v2/players/${id}`, requestOptions)
    const json = await res.json()
    jsonList.push(json)
  }
  jsonList.map((player) => {
    list.push(player.name)
  })
  console.log(list)
  
  return{ data: list}
}
