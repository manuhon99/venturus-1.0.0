import Head from "next/head";
import styles from "../styles/Home.module.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Link from "next/link";
import App from "./components/TableSavedTeams";
import Delete from "./components/Delete";
import Edit from "./components/Edit";
import Todos from "./components/GetLocalStorage";


export default function Home() {
  

  return (
    <div>

      <Head>
        <title>Squad Management Tool</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/icons/logo.svg" />
      </Head>

      <Navbar></Navbar>
 
      <div className={styles.container}>

        <div className={styles.myTeamCard}>
          <div className={styles.myTeamTopBar}>
            <h1>My teams</h1>
            
            

            <Link href="/newteam">
            <button className={styles.myTeamCardButton}>+</button>
            </Link>
            

          </div>
          <hr></hr>

          <Todos></Todos>
          
          
          <div className={styles.myTeamlist}>
          
            
            <App></App>
            <Delete></Delete>
            <Edit></Edit>
          </div>
          
        </div>

        <div className={styles.topContainer}>
          <div className={styles.average}>
            <div className={styles.myTopBar}>
              <h1>Top 5</h1>
            </div>
            <hr></hr>
            <div className={styles.myToplist}>
                <p>Highest avg age</p>
                <p>Lowest avg age</p>
            </div>
          </div>

          <div className={styles.pick}>
            <div className={styles.pickMost}>
              <h1>Most picked player</h1>
              <img src="/icons/grayguy.svg" className={styles.img} alt="player1"/>
            </div>
            <div className={styles.pickLess}>
              <h1>Less picked player</h1>
              <img src="/icons/blondeguy.svg" className={styles.img} alt="player2"/>
            </div>
          </div>

        </div>

      </div>

      <Footer></Footer>

    </div>
  );
}
  
  