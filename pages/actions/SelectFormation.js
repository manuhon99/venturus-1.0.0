import React from 'react';
import Select from 'react-select';
import styles from "../../styles/actions/SelectFormation.module.css";

//tatic formation list
const options = [
  { value: '3-2-2-3', label: '3-2-2-3' },
  { value: '3-2-3-2', label: '3-2-3-2' },
  { value: '3-4-3', label: '3-4-3' },
  { value: '3-5-2', label: '3-5-2' },
  { value: '4-2-3-1', label: '4-2-3-1' },
  { value: '4-3-2-1', label: '4-3-2-1' },
  { value: '4-3-3', label: '4-3-3' },
  { value: '4-4-2', label: '4-4-2' },
  { value: '4-5-1', label: '4-5-1' },
  { value: '5-4-1', label: '5-4-1' },
];

//according the tatic a SVG is showed on screen
const List = ({formation}) => (
  <div>
    <img src={`/taticFormation/${formation}.svg`} alt="tatic"/>
  </div>
);

let formation = '3-4-3'

class App extends React.Component {

  state = {
    selectedOption:  { value: '3-4-3', label: '3-4-3' },
  };

  //handle the change of select formation option
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    formation = selectedOption.value;
  };

  //Render a select input with tatic formation options and the field image with 
  //players displayed according
  render() {
    const { selectedOption } = this.state;
    
    return (
      <div>
        <div className={styles.topItems}>Formation
          <Select className={styles.select}
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            defaultValue='3-4-3'
          />
        </div>

        <div className={styles.field}>
          <List formation={formation}></List>
        </div>
       
     </div> 
    );
  }
}

export default App