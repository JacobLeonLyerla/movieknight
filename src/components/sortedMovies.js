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
// importing Link from react router to route my application
import { Link } from "react-router-dom";
class SortedMovies extends Component {
  // This function renders the array of objects we receive from our context provider
  displayMovies = () => {
    // first we make sure the data is define to prevent any errors
    if (this.props.context.movieData.movies !== undefined) {
      // than we return the context data as we map over it
      return this.props.context.movieData.movies.map(movie => (
        // the Col element from reactstrap it is shourt for column and it limits the size of the data rendered
        // the per row is 12 so setting this to md(medium) of 3 means it will show 4
        // columns per row
        <Col key={movie.id} md="3" className="movieImg-container">
          {/* this is a link from react router dom, I wrapped the whole thing in a Link
        and used a template literal also known as a template string
        to add the id of the object being mapped to the link address
        Also I added a bit of basic in-line styles to just get rid of some of the default styles from Link */}
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/details/${movie.id}`}
          >
            {/* This uses a ternary and it checks if the movie is missing,
           and if the movie has a poster, if there is a poster than it will use the Media tag
           and a template string to render it,if it does not it will render
           a basic div I styled with the title inside */}

            {movie.poster_path ? (
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
  // for pagination I have never done this before so I had to come up with something creative
  // this function will render pagination when called.
  renderPagination = () => {
    // set a variable for our context data so we don't need to call the whole string
    const movieData = this.props.context.movieData;
    // set up an empty array
    const paginationArry = [];

    for (let index = 0; index < 9; index++) {
      // we iterate up to 10 and add the index to the current page pushing that into our empty pagination array
      // this will mean the first number will always just be whatever the page is
      paginationArry.push(movieData.page + index);
    }
    // we map over our newly created pagination array
    return paginationArry.map(pagination => {
      return (
        // fragment alows us to not have to wrapp this in a container
        // because I didn't want to have to wrap my ternary
        <Fragment key={pagination}>
          {/* when the pagination is less than or equal to the total pages
            we will the pagination will stop rendering,
            so pagination is the page + 9 so when if the page is only 8 away from the end of the list
            it will stop rendering anything above the total pages number  
            */}
          {pagination <= movieData.totalPages ? (
            // when you click one of the pagination, the value of it will be set on the page
            // after we call fetch movies allowing the page to be changed without resetting the type or search
            <PaginationItem
              key={pagination}
              onClick={() => [
                this.props.context.actions.setPage(pagination),
                this.props.context.actions.fetchMovies(pagination)
              ]}
            >
              <PaginationLink>{pagination}</PaginationLink>
            </PaginationItem>
          ) : null}
        </Fragment>
      );
    });
  };

  render() {
    return (
      <div className="movies-container">
        {/* we wrapped our display movies component with a row, the row holds the columns
        keeping everything neat  we also called display movies so it would be rendered*/}
        <Row className="movieImgs-container">{this.displayMovies()}</Row>
        {/* this only renders if you are not on the first page
         and it is used to go back a page  */}
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
            ) : null}
            {/* this is where our pagination is being rendered */}
            {this.renderPagination()}
            {/* this is the pagination item will select the next page  */}
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
          // so if there is no pagination this div will render so the height is maintained
          // and the buttons will not move, it kinda just fills in the gap
          <div style={{ height: "5.9vh" }} />
        )}
        {/* here is my row of buttons for selecting a category */}
        <Row className="movieBtn-container">
          {/* 
            onClick the buttons call handleType that will take the name and value
            and that will be set on our context state */}
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
