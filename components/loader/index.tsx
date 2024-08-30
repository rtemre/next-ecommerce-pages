// Loader.js
import React, { CSSProperties } from "react";
import classes from "./loader.module.css"; // Make sure to import the CSS file

type LoaderProps = {
  style?: CSSProperties;
  classNames?: string;
};

const Loader = ({ style, classNames }: LoaderProps) => {
  return (
    <div
      className={`${classes.loader} ${classNames}`}
      style={{ ...style, display: "inline-flex" }}
    ></div>
  );
};

export default Loader;
