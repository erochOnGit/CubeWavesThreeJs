import React from "react";
import Hello from "./Hello";
import ThreeContainer from "./ThreeContainer/ThreeContainer";
import "./style.css";

const App = props => {
  return (
    <div>
      <Hello name="toto" />
      <ThreeContainer />
    </div>
  );
};
export default App;
