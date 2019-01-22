import React, { Component } from "react";
import axios from "axios";
import { Media, Col, Row, Progress } from "reactstrap";
import { Link } from "react-router-dom";
class SingleMovie extends Component {
  state = {
    movie: {}
  };
  componentDidMount() {
    // when the component is rendered it deconstrucs the id from props
    const { id } = this.props.match.params;
    // makes another axios request however this time it gets the movie by the id
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          process.env.REACT_APP_TMDB_API_KEY
        }`
      )
      .then(response => {
        this.setState({ movie: response.data });
      })
      .catch(err => console.log(err));
  }
  // this is where everything on the left inside of the box is being rendered
  poster = () => {
    // this is a check so that this function is not called before state is set up
    // this prevents errors where things try to be rendered before the state is set
    if (this.state.movie !== {}) {
      // set the movie on state into a variable
      const movie = this.state.movie;
      return (
        // this is a col for the left hand side of the row because it's being called first
        <Col
          key={movie.id}
          md="5"
          className="movieImg-container singleImg-container"
        >
          {/* these ternarys just make sure the data was available for the movie,
           if not the data is not rendered */}
          {movie.poster_path ? (
            <Media
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
          ) : null}

          {movie.title ? (
            <div className="movie-title belowMovie-info movie-info">
              {movie.title}
            </div>
          ) : null}
          {movie.tagline ? (
            <div className="movie-tagline belowMovie-info movie-info">
              {movie.tagline}
            </div>
          ) : null}

          {movie.genres ? (
            <div className="movieGenre-container belowMovie-info movie-info mapedInfo-container">
              {/* some of the values on the object are arrays we have to map them out  */}
              {movie.genres.map(genre => (
                <div key={genre.name} className="movie-genre mapped-info">
                  {genre.name},
                </div>
              ))}
            </div>
          ) : null}
          {movie.release_date ? (
            <div className="movie-releaseDate belowMovie-info movie-info">
              {movie.release_date}
            </div>
          ) : null}
          {movie.status ? (
            <div className="movie-status belowMovie-info m movie-info ">
              {movie.status}
            </div>
          ) : null}
        </Col>
      );
    }
  };
  makeCurrency(value) {
    // this function takes  the number passed in
    // converts it to a string and makes it into currancy that string is than returned
    return `$${value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }
  // this is where everything on the right inside of the box is being rendered
  moreInfo = () => {
    if (this.state.movie !== {}) {
      const movie = this.state.movie;
      return (
        <Col md="7" className="moreInfo-container">
          {movie.overview ? (
            <div className="movie-overview  moreInfo-local movie-info ">
              {movie.overview}
            </div>
          ) : null}

          {movie.vote_average ? (
            <div className="movie-rating  moreInfo-local ">
              <div className="text-center">The Movie Database ratings</div>
              {/* adding in a progress bar that has a max of 10
              the number from the Data base comes back btween 0-10 so that will
              allow this progress bar to render correctly */}
              <Progress color="warning" value={movie.vote_average} max={10}>
                {movie.vote_average}
              </Progress>
              Vote Count: {movie.vote_count}
            </div>
          ) : null}

          {movie.production_companies ? (
            <div className="text-center movie-info">
              Prodution Companies
              <div className="  moreInfo-local  mapedInfo-container">
                {movie.production_companies.map(company => (
                  <div key={company.name} className="movie-company mapped-info">
                    {company.name},
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {movie.production_countries ? (
            <div className="text-center movie-info">
              Produced In
              <div className="  moreInfo-local  mapedInfo-container">
                {movie.production_countries.map(country => (
                  <div key={country.name} className="movie-company mapped-info">
                    {country.name},
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {movie.runtime ? (
            <div className="text-center movie-info">
              Runtime
              <div className="movie-revenue  moreInfo-local movie-info ">
                {`${movie.runtime} Minutes`}
              </div>
            </div>
          ) : null}
          {movie.spoken_languages ? (
            <div className="text-center movie-info">
              Spoken Languages
              <div className="  moreInfo-local  mapedInfo-container">
                {movie.spoken_languages.map(language => (
                  <div
                    key={language.name}
                    className="movie-company mapped-info"
                  >
                    {language.name},
                  </div>
                ))}
              </div>{" "}
            </div>
          ) : null}

          {movie.original_language ? (
            <div className="text-center movie-info">
              Original Languages
              <div className="movie-orignalLang  moreInfo-local movie-info ">
                {movie.original_language}
              </div>
            </div>
          ) : null}

          {movie.original_title && movie.original_title !== movie.title ? (
            <div className="text-center movie-info">
              Original title
              <div className="movie-originalTitle  moreInfo-local movie-info ">
                {movie.original_title}
              </div>
            </div>
          ) : null}

          {movie.revenue ? (
            <div className="text-center movie-info">
              Movie Revenue
              <div className="movie-revenue  moreInfo-local movie-info ">
                {/* we pass the value to make currancy in order to return it as a human readable string
              not just a number like 100000000 */}
                {this.makeCurrency(movie.revenue)}
              </div>
            </div>
          ) : null}
          {movie.budget ? (
            <div className="text-center movie-info">
              Movie Budget
              <div className="movie-budget  moreInfo-local movie-info ">
                {this.makeCurrency(movie.budget)}
              </div>
            </div>
          ) : null}
          {movie.belongs_to_collection ? (
            <div className="text-center movie-info">
              Collection
              <div className="movie-collection  moreInfo-local movie-info ">
                {movie.belongs_to_collection.name}
              </div>
            </div>
          ) : null}
          {movie.homepage ? (
            <div className="movie-homepage  moreInfo-local movie-info ">
              {/* we use the data to render a link the user can click it and view that content */}
              <a href={movie.homepage}>{movie.homepage}</a>
            </div>
          ) : null}

          {movie.popularity ? (
            <div className="text-center movie-info">
              Popularity
              <div className="movie-popularity  moreInfo-local movie-info ">
                {movie.popularity}
              </div>
            </div>
          ) : null}
          {movie.backdrop_path ? (
            <div className="movie-backdrop  moreInfo-local movie-info ">
              {/* we use an href and a template string to allow the user to click the text and see the image on the movie database */}
              <a
                href={`https://image.tmdb.org/t/p/original${
                  movie.backdrop_path
                }`}
              >
                View Backdrop
              </a>
            </div>
          ) : null}
          {movie.poster_path ? (
            <div className="movie-poster  moreInfo-local movie-info ">
              <a
                href={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              >
                View Poster
              </a>
            </div>
          ) : null}
        </Col>
      );
    }
  };
  render() {
    return (
      <div className="movies-container singleMovie-container">
        {/* this row is a container for our render functions, that render the left and right half of the box respectively */}
        <Row className="movieImgs-container">
          {this.poster()}
          {this.moreInfo()}
        </Row>
        {/* this is just our home button, its the same as the category buttons
          for styling however this one links the user back to the home page */}
        <Col md="3" style={{ margin: "0 auto" }}>
          <Link to="/">
            {" "}
            <button
              name="type"
              value="popular"
              className="btn btn-sm animated-button thar-three"
            >
              Home
            </button>
          </Link>
        </Col>
      </div>
    );
  }
}

export default SingleMovie;
