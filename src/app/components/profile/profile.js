import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { googleSignIn, firebaseApp, db, signOut } from "./../../../firebaseApp";
import { useRecoilState } from "recoil";
import authState from "../../atoms/authState";
import routeState, { HOME } from "../../atoms/routeState";

export default function Profile() {
  const [auth, setAuth] = useRecoilState(authState);
  const [route, setRoute] = useRecoilState(routeState);

  useEffect(() => {
    if (!auth.uid) {
      setRoute(HOME);
    }
  }, [auth, setRoute]);

  return (
    <div style={{ padding: 8 }}>
      {auth.uid && (
        <Button variant="outlined" color="primary" fullWidth onClick={signOut}>
          Sign out
        </Button>
      )}
    </div>
  );
}
