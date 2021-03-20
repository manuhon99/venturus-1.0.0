import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/components/CreateNewTeam.module.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Example from "./components/Tag";
import App from "./actions/SelectFormation";
import { createLocalStorageStateHook } from "use-local-storage-state";
import Filter from "./actions/Filter";

export const useTodos = createLocalStorageStateHook("todos");

export default function NewTeam({data}) {

  const [todos, setTodos] = useTodos();
  const [todo, setTodo] = useState("");

  const onClick = () => {
    setTodos([...todos, todo]);
    setTodo("");
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
            
            <input value={todo} onChange={e => setTodo(e.target.value)} id="name" name="name" type="text" placeholder="Insert team name" required/>
            <label htmlFor="name">Description</label>
            <input onChange={e => setTodo(e.target.value)} className={styles.description} description="description" type="text" height="50rem"/>


          </div>
          <div className={styles.right}>
            <label htmlFor="website">Team website</label>
            <input onChange={e => setTodo(e.target.value)} className={styles.noTag} id="website" name="website" type="url" pattern="https?://.+" placeholder="http://myteam.com" required/>

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
            <Example onChange={e => setTodo(e.target.value)}></Example>
          </div>
          
        </div>

        <div className={styles.titleArea}>
        <h1>CONFIGURE SQUAD</h1>
        </div>

        <div className={styles.configureSquadContainer}>
          <div className={styles.formation}>
            <App></App>
            <button onClick={onClick}>Save</button>
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
  for(let i=1;i<4;i++){
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
