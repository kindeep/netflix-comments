import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Comments from "./comments";

alert('yus');

const COMMENTS_EL_ID = "comments";

const createCommentsEl = () => {
  console.log(document.body);
  const el = document.createElement("div");
  el.id = COMMENTS_EL_ID;
  document.body.appendChild(el);
};

let commentsEl = document.getElementById(COMMENTS_EL_ID) ?? createCommentsEl();

ReactDOM.render(
  <React.StrictMode>
    <Comments />
  </React.StrictMode>,
  commentsEl
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
