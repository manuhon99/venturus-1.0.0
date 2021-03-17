import React from 'react';
import Head from "next/head";
import styles from "../styles/components/CreateNewTeam.module.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function NewTeam({data}) {
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
            <input id="search" description="search" type="text"/>
            <div>{data}</div>
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