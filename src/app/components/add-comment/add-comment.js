import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./add-comment.css";

export default function AddComment() {
  const [comment, setComment] = useState("");
  const [focused, setFocused] = useState(true);
  const commentChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <div className="add-comment-root">
      <TextField
        label="Add a public comment"
        variant="outlined"
        value={comment}
        onChange={commentChange}
        onBlur={() => {
          setFocused(false);
        }}
        onFocus={() => {
          setFocused(true);
        }}
        fullWidth
      />
      {focused && (
        <div className="add-comment-actions">
          <Button color="secondary" className="cancel-button">
            Cancel
          </Button>
          <Button color="primary" variant="contained">
            Comment
          </Button>
        </div>
      )}
    </div>
  );
}
