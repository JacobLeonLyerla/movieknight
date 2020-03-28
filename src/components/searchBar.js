import React, { Component } from "react";
import { Link } from "react-router-dom";
class SearchBar extends Component {
  state = {
    search: ""
  };
  // simple handle change function takes the name from the event listener and the value and uses that to set up our state
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      // our form has an unsubmit that calls handle search and resets the search bar data
      <form
        className="container"
        onSubmit={event => [
          this.props.handleSearch(event, this.state.search),
          this.setState({
            search: ""
          }),
          this.props.history.push("/")
        ]}
      >
        {/* this is the logo that is set on the left corner of the page */}{" "}
        <Link
          style={{
            textDecoration: "none",
            color: "black"
          }}
          to="/"
        >
          <div className="logo">
            {" "}
            <i className="fas fa-chess-knight fa-2x" />
            <p> Movie Knight </p>{" "}
          </div>{" "}
        </Link>{" "}
        {/* when you type into the input the listener will hear it and that will call the handle change
                handle change will than take the name and value of the search and set that on state  */}{" "}
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
        </button>{" "}
      </form>
    );
  }
}

export default SearchBar;
