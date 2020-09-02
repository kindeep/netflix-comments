import { atom } from "recoil";

const commentsState = atom({
  key: "commentsState", // unique ID (with respect to other atoms/selectors)
  default: [],
});

export default commentsState;