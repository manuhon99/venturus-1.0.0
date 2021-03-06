import React from "react";
import TagsInput from "react-tagsinput";

//Tag component
class Example extends React.PureComponent {
  
  constructor() {
    super();
    this.tagsinput = React.createRef();
    this.state = {
      tags: [],
      tag: ""
    };
  }

  handleChange = tags => {
    this.setState({ tags });
  };

  handleInputChange = value => {
    if (value.length > 8) {
      return this.tagsinput.current.accept();
    }
    this.setState({ tag: value });
  };

  render() {
    return (
      <TagsInput
        onlyUnique
        ref={this.tagsinput}
        inputProps={{
          placeholder: "Defense"
        }}
        value={this.state.tags}
        onChange={this.handleChange}
        inputValue={this.state.tag}
        onChangeInput={this.handleInputChange}
      />
    );
  }
}

export default Example;
