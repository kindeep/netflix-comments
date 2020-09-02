import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";


export default function Comment({ comment }) {
  return (
    <>
      <ListItem alignItems="flex-start" className="comments-list">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <div>
          <ListItemText disableTypography>
            <Typography variant="caption" gutterBottom>
              {comment.user.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {comment.text}
            </Typography>
          </ListItemText>
        </div>
      </ListItem>
    </>
  );
}
