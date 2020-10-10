import React, { useEffect, useState } from "react";
import { Button, OutlinedInput, Snackbar, TextField } from "@material-ui/core";
import { signIn, firebaseApp, db } from "../../../../firebaseApp";
import { useRecoilState } from "recoil";
import authState from "../../../atoms/authState";
import routeState, { HOME, SIGNUP } from "../../../atoms/routeState";
import AppLink from "../../routing/app-link";
import "./login.css";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CloseIcon from "@material-ui/icons/Close";

export default function Login() {
  const [auth, setAuth] = useRecoilState(authState);
  const [route, setRoute] = useRecoilState(routeState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (auth.uid) {
      setRoute(HOME);
    }
  }, [auth, setRoute]);

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch ({ code, message }) {
      setError(`${message}`);
    }
  };
  const handleClose = () => {
    setError(null);
  };

  return (
    <div style={{ padding: 8 }} className="login-wrapper">
      <Snackbar
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={handleClose}
        message={error}
        open={!!error}
      ></Snackbar>
      {!auth.uid && (
        <>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className="login-item"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <FormControl variant="outlined" fullWidth className="login-item">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleLogin}
            className="login-item"
          >
            Login
          </Button>

          <AppLink
            variant="outlined"
            color="primary"
            fullWidth
            component={Button}
            to={SIGNUP}
            className="login-item"
          >
            Sign Up
          </AppLink>
        </>
      )}
    </div>
  );
}
