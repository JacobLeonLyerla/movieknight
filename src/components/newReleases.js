import React, { Component } from "react";
// Using reactstrap and deconstructing the elements i want to use
import { Media, Row, Col } from "reactstrap";

class NewReleases extends Component {
  displayMovies = () => {
    console.log(this.props.context.movieData.movies);
    if (this.props.context.movieData.movies !== undefined) {
      return this.props.context.movieData.movies.map(movie => (
        <Col key={movie.title} md="1" style={{ minHeight: "25vh" }}>
          {/* Using my reactstrap Media component in order to render the jpg image that is stored,
          inside of the movie object, this is just a test however i would like to use this
          on the movie view, where we will show the single movie and it's details */}

          <Media
            style={{ width: "5vw", margin: "0 auto" }}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          />
          <div style={{ fontSize: "1vw", minHeight: "7vh" }}>{movie.title}</div>
        </Col>
      ));
    }
  };

  render() {
    console.log(this.props.context.movieData.movies);
    return (
      <div>
        <Row>{this.displayMovies()}</Row>
        {/* Display the local total number of pages for the data that was gotten in data base request */}
        <div>{this.props.context.movieData.totalPages}</div>
        {/* First we display the current page */}
        <div>
          {this.props.context.movieData.page}
          {/* When we click this div it will fire an on click event
          This event will first change add to the value on state,
          than it will run fetch movies passing in the same value that we just set.
          our fetch has a catch saying if a value is passed in than use that value.
          if not it just uses our state */}
          <div
            onClick={() => [
              this.props.context.actions.setPage(),
              this.props.context.actions.fetchMovies(
                this.props.context.movieData.page + 1
              )
            ]}
          >
            up
          </div>
        </div>
      </div>
    );
  }
}

export default NewReleases;
