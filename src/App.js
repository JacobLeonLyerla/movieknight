import React, { Component } from "react";

//Importing dependencies axios is used for http request.
import axios from "axios";
import { Media } from "reactstrap";
import "./App.css";

class App extends Component {
  state = {
    movies: [],
    page: 1,
    totalPages: 0
  };

  // adding a life cycle method to call the the database when the application is loaded
  componentDidMount() {
    this.fetchMovies();
  }
  fetchMovies = page => {
    // when page is defined it will be set to that param,
    // when its not we will just set it to the local state
    page ? (page = page) : (page = this.state.page);
    // Making a call to the database to see how the data comes back and testing my key
    // this call will get a list of movies currently in theaters

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
        <div key={movie.title}>
        <div style={{fontSize:"1.3vw"}}>{movie.title}</div>
          
          <Media
            style={{ width: "16vw" }}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          />
   
        </div>
      ));
    }
  };

  render() {
    return (
      <div className="App">
        {this.displayMovies()}
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
