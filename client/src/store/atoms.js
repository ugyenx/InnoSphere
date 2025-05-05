// atoms/counterAtom.js
import { atom } from "recoil";

 const cartIncrease = atom({
  key: "cartIncrease", // unique ID
  default: 0,          // initial value
});


const cartItem = atom({
  key: "cartItem", 
  default: [],          
});

export {cartIncrease, cartItem};
