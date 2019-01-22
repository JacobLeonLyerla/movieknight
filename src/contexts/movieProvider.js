import React, { Component } from "react";
// Importing dependencies axios is used for http request.
import axios from "axios";
// Exporting our context
export const MovieContext = React.createContext({});

class MovieProvider extends Component {
  /* This state will act as our context state,
   we will have access to this inside of all the routes
   that we pass our context into */
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
    // if the page passed in is greater than current pages than it resets it the page count back to 1
    if (page > this.state.totalPages) page = 1;
    // When page is defined it will be set to that param,
    // When its not we will just set it to the local state
    if (page === undefined) page = this.state.page;
    if (type === undefined) type = this.state.type;
    if (search === undefined) search = this.state.search;
    /* ternary if the search is not an empty string
       it will set our url to the search url
       when it is an empty string than we will use the url for just finding now playing, top rated and popular movies
    */
    let url;
    search !== ""
      ? (url = `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&query=${search}&page=${page}&include_adult=false`)
      : (url = `https://api.themoviedb.org/3/movie/${type}?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }&language=en-US&page=${page}&include_adult=false`);
    /* axios.get will make a get request to the server if the request is successfull
     we will get the data from the api back in the form of an object, if it is unsuccessfull
     we will console.log the error */
    axios
      .get(url)
      .then(response => {
        this.setState({
          movies: response.data.results,
          totalPages: response.data.total_pages
        });
      })
      .catch(err => console.log(err));
  };
  // this function allows me to change the state of my context provider by callling this inside of my route
  setPage = value => {
    /* when the value if greater than the total pages
      this will catch it and reset it back to 1
      if it's not than we just set the page to the value passed in */
    if (value > this.state.totalPages) {
      this.setState({ page: 1 });
    } else {
      this.setState({ page: value });
    }
  };
  /* this will take my name and value from my button and use the name to pic the key on state,
   setting the value onto that key
   after it calls fetch movies to change the items rendered */
  handleType = e => {
    this.setState({ [e.target.name]: e.target.value, page: 1 });
    this.fetchMovies(1, e.target.value, "");
  };
  // when we search for smething this is the function that is called on submit
  handleSearch = (e, search) => {
    // prevent default helped clear out some errors the application was having
    e.preventDefault();
    // the user enters stings with spaces we remove them and make them pluses for the search request
    search = search.replace(" ", "+");
    // we set search on state to the same thing as the search passed in
    this.setState({ search });
    // call fetch movies to update the component.
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
