import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SortedMovies from "../components/sortedMovies";
import MovieProvider, { MovieContext } from "../contexts/movieProvider";
Enzyme.configure({ adapter: new Adapter() });
describe(" <MovieProvider>", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MovieProvider>
        <MovieContext.Consumer>
          {context => <SortedMovies context={context} />}
        </MovieContext.Consumer>
      </MovieProvider>,
      div
    );
  });
  it("check snapshot", () => {
    let element = shallow(
      <MovieProvider>
        <MovieContext.Consumer>
          {context => <SortedMovies context={context} />}
        </MovieContext.Consumer>
      </MovieProvider>
    );
    expect(element).toMatchSnapshot();
  });
  it("correct number of children", () => {
    const wrapper = shallow(
      <MovieProvider>
        <MovieContext.Consumer>
          {context => <SortedMovies context={context} />}
        </MovieContext.Consumer>
      </MovieProvider>
    );
    expect(wrapper).toHaveLength(1);
  });
  it("state set as expected", () => {
    const wrapper = shallow(
      <MovieProvider>
        <MovieContext.Consumer>
          {context => <SortedMovies context={context} />}
        </MovieContext.Consumer>
      </MovieProvider>
    );
    expect(typeof wrapper.props().value.movieData.page).toBe("number")
    expect(typeof wrapper.props().value.movieData.totalPages).toBe("number")
    expect(typeof wrapper.props().value.movieData.movies).toBe("object")
  });

  it("fetchMovies is a function", () => {
    const wrapper = shallow(
      <MovieProvider>
        <MovieContext.Consumer>
          {context => <SortedMovies context={context} />}
        </MovieContext.Consumer>
      </MovieProvider>
    );
    wrapper.instance().fetchMovies();
  });

  it("setPage is a function", () => {
    const wrapper = shallow(
      <MovieProvider>
        <MovieContext.Consumer>
          {context => <SortedMovies context={context} />}
        </MovieContext.Consumer>
      </MovieProvider>
    );
    wrapper.instance().setPage();
  });
});
