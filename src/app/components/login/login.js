import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { googleSignIn, firebaseApp, db } from "./../../../firebaseApp";
import { useRecoilState } from "recoil";
import authState from "../../atoms/authState";
import routeState, { HOME } from "../../atoms/routeState";

export default function Login() {
  const [auth, setAuth] = useRecoilState(authState);
  const [route, setRoute] = useRecoilState(routeState);

  useEffect(() => {
    if(auth.uid) {
      setRoute(HOME);
    }
  }, [auth, setRoute]);

  const loginWithGoogle = async () => {
    await googleSignIn();
  }

  return (
    <div style={{ padding: 8 }}>
      {!auth.uid && (
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={loginWithGoogle}
        >
          Login with Google
        </Button>
      )}
    </div>
  );
}
