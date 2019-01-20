import React, { Component } from "react";
// Importing dependencies axios is used for http request.
import axios from "axios";
// Exporting our context
export const MovieContext = React.createContext({});

class MovieProvider extends Component {
  // This state will act as our context state,
  // we will have access to this inside of all the routes
  // that we pass our context into
  state = {
    movies: [],
    page: 1,
    totalPages: 0
  };
  // this will set up our context whenever our app is loaded
  // allowing for our data to be rendered
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
  // this function allows me to change the state of my context provider by callling this inside of my route
  setPage = () => {
    this.setState({ page: this.state.page + 1 });
  };
  render() {
    // setting the state object to a movieData variables, this will allow me to access it through that name
    const movieData = this.state;

    return (
      // Setup context provider to pass the data on state. And too pass the methods on class as actions
      <MovieContext.Provider
        value={{
          movieData,
          actions: { fetchMovies: this.fetchMovies, setPage: this.setPage }
        }}
      >
        {this.props.children}
      </MovieContext.Provider>
    );
  }
}

export default MovieProvider;
