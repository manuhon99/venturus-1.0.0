import Link from "next/link";
import Head from "next/head";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import styles from "../styles/Home.module.css";
import TableTeams from "./components/TableSavedTeams";
import TableAverage from "./components/TableAverage";

//Initial page
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
     
          <div className={styles.myTeamlist}>   
            <TableTeams></TableTeams> 
          </div>
          
        </div>

        <div className={styles.topContainer}>
          <div className={styles.average}>

            <div className={styles.myTopBar}>
              <h1>Top 5</h1>
            </div>

            <hr></hr>

            <div className={styles.myToplist}>
              <div className={styles.titleAvg}>
                <p>Highest avg age</p>
                <p>Lowest avg age</p>
              </div>
              <TableAverage></TableAverage>
         
            </div>

          </div>

          <div className={styles.pick}>

            <div className={styles.pickMost}>
              <h1>Most picked player</h1>
              <div>
                <img src="/icons/grayguy.svg" className={styles.img} alt="player1"/>
                <div>
                  <p>75%</p>
                  <hr></hr>
                </div>
              </div>
            </div>

            <div className={styles.pickLess}>
              <h1>Less picked player</h1>
              <div>
                <img src="/icons/blondeguy.svg" className={styles.img} alt="player2"/>
                <div>
                  <p>25%</p>
                  <hr></hr>
                </div>
              </div>
            </div>
            
          </div>

        </div>

      </div>

      <Footer></Footer>

    </div>
    
  );
}
  
  