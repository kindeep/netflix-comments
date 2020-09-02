import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useRecoilState } from "recoil";
import displayState from "../../atoms/displayState";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {
  const classes = useStyles();

  const [display, setDisplay] = useRecoilState(displayState);

  const hide = () => {
    const netflix = document.querySelector(".sizing-wrapper");

    if (netflix) {
      netflix.style.right = 0;
    }
    setDisplay(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={hide}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Comments
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
