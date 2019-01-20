import React, { Component } from 'react';

//Importing dependencies axios is used for http request.
import axios from 'axios';
import './App.css';

class App extends Component {

  // adding a life cycle method to call the the database when the application is loaded
  componentDidMount(
    ){
   // Making a call to the database to see how the data comes back and testing my key
axios
.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=Jack+Reacher`)
  .then(response =>{
    console.log(response.data)
  })
  .catch(error =>console.log(error))
  }

  render() {
    return (
      <div className="App">
     
      </div>
    );
  }
}

export default App;
