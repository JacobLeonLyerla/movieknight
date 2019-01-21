import React, { Component, Fragment } from "react";
import axios from "axios";
import { Media } from "reactstrap";
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
    const movie = this.state.movie;
    return (
      <div>
        {movie.title}
        <Media
          style={{ width: "5vw", margin: "0 auto" }}
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        />
      </div>
    );
  };
  render() {
    return <Fragment>{this.showBasicInfo()}</Fragment>;
  }
}

export default SingleMovie;
