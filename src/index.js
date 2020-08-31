import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Comments from "./comments";

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

(async () => {
  const COMMENTS_EL_ID = "comments";

  const wrapper = await waitForElm(".nf-kb-nav-wrapper");

  const createCommentsEl = () => {
    console.log(document.body);
    const el = document.createElement("div");
    el.id = COMMENTS_EL_ID;
    wrapper.appendChild(el);
    return document.getElementById(COMMENTS_EL_ID);
  };

  let commentsEl =
    document.getElementById(COMMENTS_EL_ID) ?? createCommentsEl();

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
})();
