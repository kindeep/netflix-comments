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
import { waitForElm } from "./utils/misc";
import { initFirebase } from "./firebaseApp";

initFirebase();

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

(async () => {
  const COMMENTS_EL_ID = "comments";

  const wrapper = await waitForElm(".nf-kb-nav-wrapper");

  const createCommentsEl = () => {
    const el = document.createElement("div");
    el.id = COMMENTS_EL_ID;
    wrapper.appendChild(el);
    return document.getElementById(COMMENTS_EL_ID);
  };

  let commentsEl =
    document.getElementById(COMMENTS_EL_ID) ?? createCommentsEl();

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
