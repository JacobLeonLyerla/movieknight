// Added Fragment to the boilder import of create-react-app
// this allows me to create returns that are not wrapped locally with proper JSX
import React, { Component, Fragment } from "react";
// importing route from react-router-dom
import { Route } from "react-router-dom";
// Importing in the context provider
import MovieProvider, { MovieContext } from "./contexts/movieProvider";
// Importing my components here, these will be rendered in the routes section below
import NewReleases from "./components/newReleases";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Wrapping my routes in my provider and context Consumer */}
        <MovieProvider>
          <MovieContext.Consumer>
            {/* this is a child of Consumer, it is a render prop I called it context just to keep it simple */}
            {context => (
              <Fragment>
                <Route
                  exact
                  path="/"
                  render={() => <NewReleases context={context} />}
                />
              </Fragment>
            )}
          </MovieContext.Consumer>
        </MovieProvider>
      </div>
    );
  }
}

export default App;
