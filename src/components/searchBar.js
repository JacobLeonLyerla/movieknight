import React, { Component } from "react";
class App extends Component {
  state = {
    search: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      // Basic search bar for testing purposes
      <form className="container" onSubmit={(e)=>[this.props.handleSearch(e,this.state.search),this.setState({search:""})]}>
        
          <input
            value={this.state.search}
            name="search"
            onChange={this.handleChange}
            type="text"
            className="searchTerm"
            placeholder="Search..."
          />
          <button type="submit" className="searchButton">
            <i className="fa fa-search" />
          </button>
        
      </form>
    );
  }
}

export default App;
