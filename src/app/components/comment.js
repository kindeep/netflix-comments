import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ms from "ms";


export default function Comment({ comment }) {
  return (
    <>
      <ListItem alignItems="flex-start" className="comments-list">
        <ListItemAvatar>
          <Avatar alt={comment.user.displayName} src={comment.user.photoURL} />
        </ListItemAvatar>
        <div>
          <ListItemText disableTypography>
            <Typography variant="caption" gutterBottom>
              {comment.user.displayName}{comment.created && ` - ${ms(new Date() - comment.created.toDate(), {long: true})} ago`}
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
