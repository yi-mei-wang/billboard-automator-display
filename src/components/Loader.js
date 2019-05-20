import React from "react";
import LoaderGif from "../images/spinner.gif";
import "../App.scss";

const Loader = () => {
  return (
    <div className="centerLoader">
      <img src={LoaderGif} alt="Loader gif" />
    </div>
  );
};

export default Loader;
