import React, { Component, Fragment } from "react";
// Using reactstrap and deconstructing the elements i want to use
import {
  Media,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { Link } from "react-router-dom";
class SortedMovies extends Component {
  displayMovies = () => {
    if (this.props.context.movieData.movies !== undefined) {
      return this.props.context.movieData.movies.map(movie => (
        <Col key={movie.id} md="3" className="movieImg-container">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/details/${movie.id}`}
          >
            {/* Using my reactstrap Media component in order to render the jpg image that is stored,
          inside of the movie object, this is just a test however i would like to use this
          on the movie view, where we will show the single movie and it's details */}
            {movie.poster_path !== null ? (
              <Fragment>
                <Media
                  src={`https://image.tmdb.org/t/p/original${
                    movie.poster_path
                  }`}
                />
              </Fragment>
            ) : (
              <div className="movieImg-missing">
                <p>{movie.title}</p>
              </div>
            )}
          </Link>
        </Col>
      ));
    }
  };
  renderPagination = () => {
    let page = this.props.context.movieData.page;
    const paginationArry = [];
    for (let index = 0; index < 9; index++) {
      paginationArry.push(page + index);
    }

    return paginationArry.map(pagination => {
      return (
        <Fragment>
          {pagination <= this.props.context.movieData.totalPages ? (
            <PaginationItem
              key={pagination}
              onClick={() => [
                this.props.context.actions.setPage(pagination),
                this.props.context.actions.fetchMovies(pagination)
              ]}
            >
              <PaginationLink>{pagination}</PaginationLink>
            </PaginationItem>
          ) : (
            <div />
          )}
        </Fragment>
      );
    });
  };

  render() {
    return (
      <div className="movies-container">
        <Row className="movieImgs-container">{this.displayMovies()}</Row>
        {this.props.context.movieData.totalPages > 1 ? (
          <Pagination>
            {this.props.context.movieData.page - 1 > 0 ? (
              <PaginationItem>
                <PaginationLink
                  previous
                  onClick={() => [
                    this.props.context.actions.setPage(
                      this.props.context.movieData.page - 1
                    ),
                    this.props.context.actions.fetchMovies(
                      this.props.context.movieData.page - 1
                    )
                  ]}
                />
              </PaginationItem>
            ) : (
              <div />
            )}
            {this.renderPagination()}
            <PaginationItem>
              <PaginationLink
                next
                onClick={() => [
                  this.props.context.actions.setPage(
                    this.props.context.movieData.page + 1
                  ),
                  this.props.context.actions.fetchMovies(
                    this.props.context.movieData.page + 1
                  )
                ]}
              />
            </PaginationItem>
          </Pagination>
        ) : (
          <div style={{ height: "5.9vh" }} />
        )}
        <Row className="movieBtn-container">
          <Col md="3">
            <button
              name="type"
              value="now_playing"
              onClick={this.props.context.actions.handleType}
              className="btn btn-sm animated-button thar-three"
            >
              Now playing
            </button>{" "}
          </Col>
          <Col md="3">
            <button
              name="type"
              value="top_rated"
              onClick={this.props.context.actions.handleType}
              className="btn btn-sm animated-button thar-three"
            >
              Top Rated
            </button>{" "}
          </Col>
          <Col md="3">
            <button
              name="type"
              value="popular"
              onClick={this.props.context.actions.handleType}
              className="btn btn-sm animated-button thar-three"
            >
              Popular
            </button>{" "}
          </Col>
        </Row>
      </div>
    );
  }
}

export default SortedMovies;
