import { atom } from "jotai";

// Atom to store selected starships
export const selectedStarshipsAtom = atom<string[]>(["", "", ""]);
