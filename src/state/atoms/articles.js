import { atom } from "recoil";

export const articleRecoil = atom({
  key: "articleRecoil", // unique ID (with respect to other atoms/selectors)
  default: [
    
  ], // default value (aka initial value)
});

export const currentArticleRecoil = atom({
  key: "currentArticleRecoil", // unique ID (with respect to other atoms/selectors)
  default: {
  }
});