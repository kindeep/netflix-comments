import React, { useState, useRef } from "react";
import { Button, TextField } from "@material-ui/core";
import "./add-comment.css";
import { addComment } from "../../../firebaseApp";
import videoState from "../../atoms/videoState";
import authState from "../../atoms/authState";
import { useRecoilState } from "recoil";
import newCommentState from "../../atoms/newCommentState";

export default function AddComment() {
  const [comment, setComment] = useRecoilState(newCommentState);
  const [focused, setFocused] = useState(false);
  const [video, setVideo] = useRecoilState(videoState);
  const [auth] = useRecoilState(authState);
  const field = useRef(null);

  const commentChange = (e) => {
    setComment(e.target.value);
  };

  const validateComment = (comment) => {
    return comment.trim() !== "";
  };

  const handleAddClick = () => {
    addComment(comment, video.key, auth.uid);
  };

  return (
    <div className="add-comment-root">
      <div className="add-comment-input-wrapper">
        <TextField
          disabled={!auth.uid}
          innerRef={field}
          label={auth.uid ? "Add a public comment" : "Login to comment"}
          variant="outlined"
          value={comment}
          onChange={commentChange}
          onBlur={() => {
            setFocused(false);
          }}
          onFocus={(e) => {
            e.stopPropagation();
            delete field.current.querySelector("input").blur;
            setFocused(true);
          }}
          fullWidth
        />
      </div>
      {(auth.uid && (focused || validateComment(comment))) && (
        <div className="add-comment-actions">
          <Button
            color="secondary"
            className="cancel-button"
            onClick={() => {
              setComment("");
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!validateComment(comment)}
            onClick={handleAddClick}
          >
            Comment
          </Button>
        </div>
      )}
    </div>
  );
}
