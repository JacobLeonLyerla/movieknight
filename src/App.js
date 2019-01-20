import React, { Component } from "react";

// Importing dependencies axios is used for http request.
import axios from "axios";
// Using reactstrap and deconstructing the Media element
import { Media, Row, Col } from "reactstrap";
import "./App.css";

class App extends Component {
  state = {
    movies: [],
    page: 1,
    totalPages: 0
  };

  // Adding a life cycle method to call the the database when the application is loaded
  componentDidMount() {
    this.fetchMovies();
  }
  fetchMovies = page => {
    // When page is defined it will be set to that param,
    // When its not we will just set it to the local state
    if (page === undefined) page = this.state.page;
    // Making a call to the database to see how the data comes back and testing my key
    // This call will get a list of movies currently in theaters

    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&page=${page}`
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          movies: response.data.results,
          totalPages: response.data.total_pages
        });
      })
      .catch(error => console.log(error));
  };
  // function to display the movies on state
  displayMovies = () => {
    console.log(this.state.movies);
    if (this.state.movies !== []) {
      return this.state.movies.map(movie => (
        <Col md="3" key={movie.title}>
          <div style={{ fontSize: "1.3vw" }}>{movie.title}</div>
          {/* Using my reactstrap Media component in order to render the jpg image that is stored,
          inside of the movie object, this is just a test however i would like to use this
          on the movie view, where we will show the single movie and it's details */}

          <Media
            style={{ width: "16vw" }}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          />
        </Col>
      ));
    }
  };

  render() {
    return (
      <div className="App">
        <Row>{this.displayMovies()}</Row>
        {/* Display the local total number of pages for the data that was gotten in data base request */}
        <div>{this.state.totalPages}</div>
        {/* First we display the current page */}
        <div>
          {this.state.page}
          {/* When we click this div it will fire an on click event
          This event will first change add to the value on state,
          than it will run fetch movies passing in the same value that we just set.
          our fetch has a catch saying if a value is passed in than use that value.
          if not it just uses our state */}
          <div
            onClick={() => [
              this.setState({ page: this.state.page + 1 }),
              this.fetchMovies(this.state.page + 1)
            ]}
          >
            up
          </div>
        </div>
      </div>
    );
  }
}

export default App;
