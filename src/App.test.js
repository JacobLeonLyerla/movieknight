import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Import new realeases component so i can test it.
import NewReleases from "./components/newReleases";
// Importing router to test that my app is rendering correctly
import { BrowserRouter as Router } from "react-router-dom";
// Importing my context provider to test the routes that require context to work
import MovieProvider, { MovieContext } from "./contexts/movieProvider";
// Cheching that my movie context provider is rendering correctly
it("render movie context without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
      <MovieProvider />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// Testing that my app is rendering 
it("render app without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
// this test is making sure my route is rendering without crashing
it("render new releases component without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MovieProvider>
      <MovieContext.Consumer>
        {context => <NewReleases context={context} />}
      </MovieContext.Consumer>
    </MovieProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
