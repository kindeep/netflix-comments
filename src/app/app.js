import React, { useEffect, useCallback, useState, useRef } from "react";
import Comments from "./components/comments";
import { useRecoilState } from "recoil";
import { Paper, IconButton } from "@material-ui/core";
import Nav from "./components/nav/nav";
import AddComment from "./components/add-comment/add-comment";
import videoState from "./atoms/videoState";
import displayState from "./atoms/displayState";
import CommentIcon from "@material-ui/icons/Comment";
import { waitForElm } from "../utils/misc";
import routeState, { HOME, LOGIN, PROFILE } from "./atoms/routeState";
import CustomRoute from "./components/routing/custom-route";
import Login from "./components/login/login";
import { firebaseApp, db } from "../firebaseApp";
import authState from "./atoms/authState";
import Profile from "./components/profile/profile";

export default function App() {
  const [, setVideo] = useRecoilState(videoState);
  const [display, setDisplay] = useRecoilState(displayState);
  const [hoverDisplay, setHoverDisplay] = useState(true);
  const attrObserver = useRef(null);

  useEffect(() => {
    attrObserver.current = new MutationObserver((mutations) => {
      mutations.forEach((mu) => {
        if (mu.type !== "attributes" && mu.attributeName !== "class") return;
        setHoverDisplay(
          document
            .querySelector(".nf-player-container")
            .classList.contains("active")
        );
      });
    });
    (async () => {
      await waitForElm(".nf-player-container");
      attrObserver.current.observe(
        document.querySelector(".nf-player-container"),
        {
          attributes: true,
        }
      );
    })();
    return () => {
      attrObserver.current.disconnect();
    };
  }, []);

  const show = useCallback(() => {
    const netflix = document.querySelector(".sizing-wrapper");
    if (netflix) {
      netflix.style.right = "340px";
    }
    setDisplay(true);
  }, [setDisplay]);

  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes("netflix")) {
      const key = currentUrl.split("/")[4].split("?")[0];
      setVideo({ key });
    }
    show();
  }, [setVideo, show]);

  const [route, setRoute] = useRecoilState(routeState);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      console.log("Auth state changed", user);
      if (user) {
        // User is signed in.
        setAuth({ uid: user.uid });
        db.doc(`users/${user.uid}`).onSnapshot((doc) => {
          setAuth((prevAuth) => ({ ...prevAuth, user: doc.data() }));
        });
      } else {
        console.log("null yes");
        // No user is signed in.
        setAuth({ uid: null, user: null });
      }
    });
  }, [setAuth]);

  return (
    <>
      {!display && (
        <div className={`invisible-wrapper ${hoverDisplay ? "active" : ""}`}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={show}
            className="show-button"
            style={{ padding: 20 }}
          >
            <CommentIcon style={{ fontSize: 40 }} />
          </IconButton>
        </div>
      )}
      {display && (
        <div
          className="visible-wrapper"
          style={{ display: display ? "block" : "none" }}
        >
          <div className="app-flex">
            <Nav></Nav>
            <CustomRoute route={HOME}>
              <Comments></Comments>
              <AddComment></AddComment>
            </CustomRoute>
            <CustomRoute route={LOGIN}>
              <Login></Login>
            </CustomRoute>
            <CustomRoute route={PROFILE}>
              <Profile></Profile>
            </CustomRoute>
          </div>
        </div>
      )}
    </>
  );
}
