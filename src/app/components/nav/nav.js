import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useRecoilState } from "recoil";
import displayState from "../../atoms/displayState";
import AppLink from "../routing/app-link";
import { LOGIN, HOME } from "../../atoms/routeState";
import AppRouteObserver from "../routing/app-route-observer";

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
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="nav"
            onClick={hide}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Comments
          </Typography>
          <AppLink color="inherit" component={Button} to={LOGIN}>
            Login
          </AppLink>
        </Toolbar>
      </AppBar>
      <AppRouteObserver>
        {({ slug }) =>
          slug !== HOME.slug && (
            <AppBar
              color="inherit"
              position="static"
              style={{ minHeight: 35, height: 35 }}
            >
              <Toolbar style={{ minHeight: 35, height: 35 }}>
                <AppLink
                  component={IconButton}
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="subnav"
                  to={HOME}
                  style={{ fontSize: 20 }}
                >
                  <ArrowBackIcon />
                </AppLink>
                <Typography variant="subtitle" className={classes.title}>
                  Login
                </Typography>
              </Toolbar>
            </AppBar>
          )
        }
      </AppRouteObserver>
    </div>
  );
}
