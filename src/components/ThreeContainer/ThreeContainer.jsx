import React from "react";
import EnhanceThreeContainer from "./EnhanceThreeContainer"
const ThreeContainer = props => {
  return (
    <div className="ThreeContainer">
      threejs training
    </div>
  );
};
export default EnhanceThreeContainer()(ThreeContainer);
