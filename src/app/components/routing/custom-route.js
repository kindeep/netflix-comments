import React from "react";
import { useRecoilState } from "recoil";
import routeState from "../../atoms/routeState";

export default function CustomRoute({ children, route }) {
  const [currentRoute] = useRecoilState(routeState);
  return (
    <>
      {currentRoute.slug === route.slug && children}
    </>
  );
}
