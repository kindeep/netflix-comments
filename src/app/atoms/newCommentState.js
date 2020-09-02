import { atom } from "recoil";

const newCommentState = atom({
  key: "newCommentState", // unique ID (with respect to other atoms/selectors)
  default: ''
});

export default newCommentState;