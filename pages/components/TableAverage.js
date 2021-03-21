import styles from "../../styles/Components/TableAverage.module.css";

export default function TableAverage(){

return(
  <div className={styles.tables}>
    <table className={styles.tableHighest}>
      <tr>
        <td><p>Inter Milan</p>  <b>31.9</b></td>
      </tr>
      <tr>
        <td><p>APOEL Nicosia</p> <b>31.7</b></td>
      </tr>
      <tr>
        <td><p>AC Milan</p><b>31.6</b></td>
      </tr>
      <tr>
        <td><p>Besiktas JK</p> <b>31.4</b></td>
      </tr>
      <tr>
        <td><p>Olympiacos Piraeus</p><b>31.3</b></td>
      </tr>
    </table>
    
    <table className={styles.tableLowest}>
      <tr>
        <td><p>Zalgiris Vilnius</p><b>21.1</b></td>                  
      </tr>
      <tr>
        <td><p>Arsenal FC</p><b>21.6</b></td>                
      </tr>
      <tr>
        <td><p>Ajax Amsterdam</p><b>22.0</b></td>
      </tr>
      <tr>
        <td><p>FC Nantes</p><b>22.1</b></td>
      </tr>
      <tr>
        <td><p>CSKA Moskow</p><b>22.5</b></td>
      </tr>
    </table>
  </div>
)
}