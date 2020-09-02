import { atom } from "recoil";

const displayState = atom({
  key: "displayState", // unique ID (with respect to other atoms/selectors)
  default: true,
});

export default displayState;