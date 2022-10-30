import { atom } from "recoil";

export const loginModal = atom({
  key: "loginModal", // unique ID (with respect to other atoms/selectors)
  default: false
});