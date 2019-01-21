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
    totalPages: 0,
    type: "now_playing",
    search: ""
  };
  // this will set up our context whenever our app is loaded
  // allowing for our data to be rendered
  componentDidMount() {
    this.fetchMovies();
  }
  fetchMovies = (page, type, search) => {
    // When page is defined it will be set to that param,
    // When its not we will just set it to the local state
    if (page === undefined) page = this.state.page;
    if (type === undefined) type = this.state.type;
    let url;
    search
      ? (url = `https://api.themoviedb.org/3/${type}/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&query=${search}`)
      : (url = `https://api.themoviedb.org/3/movie/${type}?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&page=${page}`);
    // Making a call to the database to see how the data comes back and testing my key
    // This call will get a list of movies currently in theaters
    axios.get(url).then(response => {
      console.log(response.data)
      this.setState({
        movies: response.data.results,
        totalPages: response.data.total_pages
      });
    });
  };
  // this function allows me to change the state of my context provider by callling this inside of my route
  setPage = () => {
    this.setState({ page: this.state.page + 1 });
  };
  // this will take my name and value from my button and use the name to pic the key on state,
  // setting the value onto that key
  // after it calls fetch movies to change the items rendered
  handleType = e => {
    this.setState({ [e.target.name]: e.target.value, page: 1 });
    this.fetchMovies(1, e.target.value);
  };

  handleSearch = (e, search) => {
    e.preventDefault();
    search = search.replace(" ", "+");
    this.setState({ search });
    this.fetchMovies(1, "search", search);
  };

  render() {
    // setting the state object to a movieData variables, this will allow me to access it through that name
    const movieData = this.state;

    return (
      // Setup context provider to pass the data on state. And too pass the methods on class as actions
      <MovieContext.Provider
        value={{
          movieData,
          actions: {
            fetchMovies: this.fetchMovies,
            setPage: this.setPage,
            handleType: this.handleType,
            handleSearch: this.handleSearch
          }
        }}
      >
        {this.props.children}
      </MovieContext.Provider>
    );
  }
}

export default MovieProvider;
