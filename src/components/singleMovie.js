import React, { Component } from "react";
import axios from "axios";
import { Media, Col, Row,Progress  } from "reactstrap";
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
  poster = () => {
    if (this.state.movie !== {}) {
      const movie = this.state.movie;
      return (
        <Col
          key={movie.id}
          md="5"
          className="movieImg-container singleImg-container"
        >
          <Media
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          />
          <div className="movie-title belowMovie-info movie-info">
            {movie.title}
          </div>
          <div className="movie-tagline belowMovie-info movie-info">
            {movie.tagline}
          </div>
          {movie.genres ? (
            <div className="movieGenre-container belowMovie-info movie-info mapedInfo-container">
              {movie.genres.map(genre => (
                <div key={genre.name} className="movie-genre mapped-info">
                  {genre.name},
                </div>
              ))}
            </div>
          ) : null}
           <div className="movie-releaseDate belowMovie-info movie-info">
            {movie.release_date}
          </div>
        </Col>
      );
    }
  };
  moreInfo = () => {
    if (this.state.movie !== {}) {
      const movie = this.state.movie;
      const langages = movie.spoken_languages
      return(
      <Col   
      md="7"
      className="moreInfo-container"
    >
    <div className="movie-overview  moreInfo-local movie-info ">{movie.overview}</div>
    {movie.production_companies ? (
            <div className="  moreInfo-local movie-info mapedInfo-container">
              {movie.production_companies.map(company => (
                <div key={company.name} className="movie-company mapped-info">
                  {company.name},
                </div>
              ))}
            </div>
          ) : null}<div className="movie-rating  moreInfo-local "> 
                <div className="text-center">Rating</div>
           <Progress color="warning"  value={movie.vote_average} max={10} >{movie.vote_average}</Progress>
    </div>
    {movie.spoken_languages > 1?<div>no</div>:"hi"}
    </Col>)
    }
  };
  render() {
    console.log(this.state.movie);
    return (
      <div className="movies-container singleMovie-container">
        <Row className="movieImgs-container">{this.poster()}
        {this.moreInfo()}
        </Row>
        <Col md="3" style={{ margin: "0 auto" }}>
          <button
            name="type"
            value="popular"
            className="btn btn-sm animated-button thar-three"
          >
            Home
          </button>
        </Col>
      </div>
    );
  }
}

export default SingleMovie;
