import React, { Component,Fragment } from "react";
import axios from "axios";
import { Media,Col,Row } from "reactstrap";
class SingleMovie extends Component {
  state = {
    movie: {}
  };
  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }`
      )
      .then(response => {
        this.setState({ movie: response.data });
      });
  }
  showBasicInfo = () => {
    if (this.state.movie !=={}){
    const movie = this.state.movie;
    return (
      <Col key={movie.id} md="4" className="movieImg-container">
      
        <Media     
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        />
        <div>{movie.title}</div>
        <div>{movie.tagline}</div>
        {movie.genres?(<div className="movieGenre-container">{movie.genres.map(genre=>(<div key={genre.name} className="movie-genre">
             {genre.name},

       </div>
         
        ))}</div>):null}
      </Col>
    );
        }
  };
  render() {
    console.log(this.state.movie)
    return  (<div className="movies-container"> <Row className="movieImgs-container">{this.showBasicInfo()}</Row></div>);
  }
}

export default SingleMovie;
