import { selector } from "recoil";
import { articleRecoil } from "../atoms/name";

export const getLatestArticles = selector({
  key: "getLatestArticles", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const name = get(nameState);
    const lengthOfName = name.length;
    return lengthOfName;
  },
});