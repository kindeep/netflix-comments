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
import { HOME, LOGIN } from "./atoms/routeState";
import CustomRoute from "./components/routing/custom-route";

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
      netflix.style.right = "288px";
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
              <div>Login yes</div>
            </CustomRoute>
          </div>
        </div>
      )}
    </>
  );
}
