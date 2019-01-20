import React, { Component } from 'react';

//Importing dependencies axios is used for http request.
import axios from 'axios';
import './App.css';

class App extends Component {
  state={
    movies:[]
  }

  // adding a life cycle method to call the the database when the application is loaded
  componentDidMount(
    ){
   // Making a call to the database to see how the data comes back and testing my key
   // this call will get a list of movies currently in theaters

axios
.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`)
  .then(response =>{
    this.setState({movies:response.data.results})
  })
  .catch(error =>console.log(error))
  }
  // function to display the movies on state
  displayMovies=()=>{
    console.log(this.state.movies)
    if(this.state.movies !==[]){
      return this.state.movies.map(movie =>(
        <div key={movie.title}>
        {movie.title}
        </div>
      ))
    }
  }

  render() {
    return (
      <div className="App">
       {this.displayMovies()}
      </div>
    );
  }
}

export default App;
