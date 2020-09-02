import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Comments from "./app/components/comments";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import App from "./app/app";
import * as firebase from "firebase/app";
import "firebase/firestore";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

const firebaseConfig = {
  apiKey: "AIzaSyA9dW1g1hRTm_W7n8ByqmhwmM3GCf2tK9w",
  authDomain: "netflix-comments.firebaseapp.com",
  databaseURL: "https://netflix-comments.firebaseio.com",
  projectId: "netflix-comments",
  storageBucket: "netflix-comments.appspot.com",
  messagingSenderId: "678514319671",
  appId: "1:678514319671:web:010925e266749bde27fab2",
  measurementId: "G-NVCQ63DKWH",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

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

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

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

  console.log("Ahh plz dont get called more than once");
  ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>
          <App />
        </ThemeProvider>
      </RecoilRoot>
    </React.StrictMode>,
    commentsEl
  );

})();

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
