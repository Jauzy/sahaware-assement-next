import { atom } from "recoil";

export const registerModal = atom({
  key: "registerModal", // unique ID (with respect to other atoms/selectors)
  default: false
});