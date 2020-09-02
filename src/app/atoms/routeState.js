import { atom } from "recoil";

export const HOME = { slug: "home", title: 'Home' };
export const LOGIN = { slug: "login", title: 'Login' };

const routeState = atom({
  key: "routeState", // unique ID (with respect to other atoms/selectors)
  default: HOME,
});

export default routeState;
