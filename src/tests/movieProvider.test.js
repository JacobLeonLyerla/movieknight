import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieProvider from "../contexts/movieProvider";

Enzyme.configure({ adapter: new Adapter() });

describe("<MovieProvider />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<MovieProvider />, div);
  });
  it("check snapshot", () => {
    let element = shallow(<MovieProvider />);
    expect(element).toMatchSnapshot();
  });
  it("correct number of children", () => {
    const wrapper = shallow(<MovieProvider />);
    expect(wrapper).toHaveLength(1);
  });
it("state set as expected",()=>{
  const wrapper = shallow(<MovieProvider/>)
  expect(typeof wrapper.state("page")).toBe('number')
  expect(typeof wrapper.state("totalPages")).toBe('number')
  expect(typeof wrapper.state("movies")).toBe('object')
})

 it("fetchMovies is a function",()=>{
   const wrapper = shallow(<MovieProvider/>)
   wrapper.instance().fetchMovies()
 })
 
 it("setPage is a function",()=>{
  const wrapper = shallow(<MovieProvider/>)
  wrapper.instance().setPage()
})
});
