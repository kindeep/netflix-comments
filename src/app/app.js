import React, { useEffect } from "react";
import Comments from "./components/comments";
import { useRecoilState } from "recoil";
import { Paper } from "@material-ui/core";
import Nav from "./components/nav/nav";
import AddComment from "./components/add-comment/add-comment";
import videoState from "./atoms/videoState";

export default function App() {
  const [, setVideo] = useRecoilState(videoState);
  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes("netflix")) {
      const key = currentUrl.split("/")[4].split("?")[0];
      setVideo({ key });
    }
  }, [setVideo]);
  return (
    <div class="app-flex">
      <Nav></Nav>
      <Comments></Comments>
      <AddComment></AddComment>
    </div>
  );
}
