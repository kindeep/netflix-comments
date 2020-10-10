import { atom } from "recoil";

export const HOME = { slug: "home", title: 'Home' };
export const LOGIN = { slug: "login", title: 'Login' };
export const PROFILE = { slug: "profile", title: 'Profile' };
export const SIGNUP = { slug: "signup", title: 'Sign Up' };

const routeState = atom({
  key: "routeState", // unique ID (with respect to other atoms/selectors)
  default: HOME,
});

export default routeState;
