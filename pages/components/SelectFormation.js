import React from 'react';
import Select from 'react-select';

const options = [
  { value: '3-4-3', label: '3-4-3' },
  { value: '4-4-3', label: '4-4-3' },
  { value: '4-4-2', label: '4-4-2' },
];


const List = ({formation}) => (
  <div>
  <img src={`/taticFormation/${formation}.svg`} alt="player"/>
  </div>
);

let formation = null

class App extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    formation = selectedOption.value;
    
  };
  render() {
    const { selectedOption } = this.state;
    

    return (
     
      <div>
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
     <List  formation={formation}></List>
       
      </div>

      
    );
  }
}

export default App