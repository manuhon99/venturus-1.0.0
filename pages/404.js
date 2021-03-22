// 404.js
import styles from "../styles/Error.module.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function FourOhFour() {
  return (
    
    <div>
      <Navbar> </Navbar>
    <div className={styles.error}>
      <h1>404 - Page not found</h1>
      <img src="/confused.gif" alt="lost"  className={styles.gif}/>
    </div>
    <Footer></Footer>
    </div>
  )
}