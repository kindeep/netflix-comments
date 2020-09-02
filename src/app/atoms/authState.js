import { atom } from "recoil";

const authState = atom({
  key: "authState", // unique ID (with respect to other atoms/selectors)
  default: {
    user: null
  },
});

export default authState;