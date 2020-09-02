import React, { useState, useRef } from "react";
import { Button, TextField } from "@material-ui/core";
import "./add-comment.css";

export default function AddComment() {
  const [comment, setComment] = useState("");
  const [focused, setFocused] = useState(false);
  const field = useRef(null);
  const commentChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <div className="add-comment-root">
      <TextField
        innerRef={field}
        label="Add a public comment"
        variant="outlined"
        value={comment}
        onChange={commentChange}
        onBlur={() => {
          setFocused(false);
        }}
        onFocus={(e) => {
          e.stopPropagation();
          delete field.current.querySelector('input').blur;
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
