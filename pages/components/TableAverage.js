import styles from "../../styles/Components/TableAverage.module.css";

export default function TableAverage(){

return(
  <div className={styles.tables}>
    <table>
      <tr>
        <td><p>Inter Milan</p>  <p>31.9</p></td>
      </tr>
      <tr>
        <td><p>APOEL Nicosia</p> <p>31.7</p></td>
      </tr>
      <tr>
        <td><p>AC Milan</p><p>31.6</p></td>
      </tr>
      <tr>
        <td><p>Besiktas JK</p> <p>31.4</p></td>
      </tr>
      <tr>
        <td><p>Olympiacos Piraeus</p><p>31.3</p></td>
      </tr>
    </table>
    
    <table>
      <tr>
        <td><p>Zalgiris Vilnius</p><p>21.1</p></td>                  
      </tr>
      <tr>
        <td><p>Arsenal FC</p><p>21.6</p></td>                
      </tr>
      <tr>
        <td><p>Ajax Amsterdam</p><p>22.0</p></td>
      </tr>
      <tr>
        <td><p>FC Nantes</p><p>22.1</p></td>
      </tr>
      <tr>
        <td><p>CSKA Moskow</p><p>22.5</p></td>
      </tr>
    </table>
  </div>
)
}