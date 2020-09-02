import React from "react";
import { useRecoilState } from "recoil";
import routeState from "../../atoms/routeState";
import { Button } from "@material-ui/core";

export default function AppLink({
  children,
  component: Component,
  to,
  ...props
}) {
  const [, setCurrentRoute] = useRecoilState(routeState);
  return (
    <>
      <Component
        {...props}
        onClick={() => {
          setCurrentRoute(to);
        }}
      >
        {children}
      </Component>
    </>
  );
}

AppLink.defaultProps = {
  component: Button,
};
