// Added Fragment to the boilder import of create-react-app
// this allows me to create returns that are not wrapped locally with proper JSX
import React, { Component, Fragment } from "react";
// importing route from react-router-dom
import { Route } from "react-router-dom";
// Importing in the context provider
import MovieProvider, { MovieContext } from "./contexts/movieProvider";
// Importing my components here, these will be rendered in the routes section below
import SortedMovies from "./components/sortedMovies";
import SingleMovie from "./components/singleMovie";
import SearchBar from "./components/searchBar";
import "./css/App.css";
import "./css/index.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {" "}
        {/* Wrapping my routes in my provider and context Consumer */}
        <MovieProvider>
          <MovieContext.Consumer>
            {" "}
            {/* this is a child of Consumer, it is a render prop I called it context just to keep it simple */}{" "}
            {context => (
              <Fragment>
                <Route
                  render={props => (
                    <SearchBar
                      handleSearch={context.actions.handleSearch}
                      {...props}
                    />
                  )}
                />{" "}
                <Route
                  exact
                  path="/"
                  render={() => <SortedMovies context={context} />}
                />
              </Fragment>
            )}{" "}
          </MovieContext.Consumer>{" "}
        </MovieProvider>{" "}
        {/* the details component does not need context however it will need props for pulling the id form the params */}{" "}
        <Route
          exact
          path="/details/:id"
          render={props => <SingleMovie {...props} />}
        />
      </div>
    );
  }
}

export default App;
