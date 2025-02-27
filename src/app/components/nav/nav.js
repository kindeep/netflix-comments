import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import { useRecoilState } from "recoil";
import displayState from "../../atoms/displayState";
import AppLink from "../routing/app-link";
import routeState, { LOGIN, HOME, PROFILE } from "../../atoms/routeState";
import AppRouteObserver from "../routing/app-route-observer";
import authState from "../../atoms/authState";
import { Avatar } from "@material-ui/core";

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
  const [route, ] = useRecoilState(routeState);
  const [auth, setAuth] = useRecoilState(authState);

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
          {!auth.user && (
            <AppLink color="inherit" component={Button} to={LOGIN}>
              Login
            </AppLink>
          )}
          {auth.user && (
            <AppLink
              component={IconButton}
              color="inherit"
              aria-label="profile"
              onClick={hide}
              style={{ marginRight: -12 }}
              to={PROFILE}
            >
              <Avatar src={auth.user.photoURL}></Avatar>
            </AppLink>
          )}
        </Toolbar>
      </AppBar>
      <AppRouteObserver>
        {({ slug }) =>
          slug !== HOME.slug && (
            <AppBar
              color="inherit"
              position="static"
              style={{ minHeight: 45, height: 45 }}
            >
              <Toolbar style={{ minHeight: 45, height: 45 }}>
                <AppLink
                  component={IconButton}
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="subnav"
                  to={HOME}
                  style={{ fontSize: 20 }}
                >
                  <HomeIcon />
                </AppLink>
                <Typography variant="subtitle1" className={classes.title}>
                  {route.title}
                </Typography>
              </Toolbar>
            </AppBar>
          )
        }
      </AppRouteObserver>
    </div>
  );
}
