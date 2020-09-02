import React from "react";
import { useRecoilState } from "recoil";
import routeState from "../../atoms/routeState";
import { Button } from "@material-ui/core";

export default function AppRouteObserver({ children }) {
  const [currentRoute, setCurrentRoute] = useRecoilState(routeState);
  return <>{children(currentRoute)}</>;
}
