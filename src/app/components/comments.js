import React, { useEffect } from "react";
import AddComment from "./add-comment/add-comment";
import { useRecoilState } from "recoil";
import commentsState from "../atoms/commentsState";
import Comment from "./comment";
import videoState from "../atoms/videoState";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import "./comments.css";
import { Box } from "@material-ui/core";
import { db } from "../../firebaseApp";

function Comments() {
  const [comments, setComments] = useRecoilState(commentsState);
  const [video] = useRecoilState(videoState);

  useEffect(() => {
    db.collection(`videos/${video.key}/comments`).onSnapshot(
      async (querySnapshot) => {
        const newComments = [];
        const commentDocs = [];
        querySnapshot.forEach((doc) => {
          commentDocs.push(doc);
        });
        for (let doc of commentDocs) {
          const newData = doc.data();
          const user = await newData.user.get();

          newData.user = user.data();
          newData.key = doc.id;
          newComments.push(newData);
        }
        setComments(newComments);
      }
    );
  }, [setComments, video]);

  return (
    <List className="comments-list">
      {comments.map((comment) => (
        <div key={comment.key}>
          <Comment comment={comment} key={comment.key}></Comment>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}

export default Comments;
