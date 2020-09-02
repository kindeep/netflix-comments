import { atom } from "recoil";



const videoState = atom({
  key: "videoState", // unique ID (with respect to other atoms/selectors)
  default: {
    key: 'test',
  },
});

export default videoState;