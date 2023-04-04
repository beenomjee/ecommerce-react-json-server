import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      let i = 0;
      if (
        state.find((s, index) => {
          i = index;
          return s.id === action.payload.id;
        })
      )
        state[i] = { ...action.payload, quantity: state[i].quantity + 1 };
      else state.push({ ...action.payload, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(state));
    },

    loadCart(state, action) {
      if (localStorage.getItem("cart")) {
        return [...JSON.parse(localStorage.getItem("cart"))];
      }
    },

    increment(state, action) {
      let i = 0;
      if (
        state.find((s, index) => {
          i = index;
          return s.id === action.payload.id;
        })
      ) {
        state[i] = { ...action.payload, quantity: state[i].quantity + 1 };
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decrement(state, action) {
      let i = 0;
      if (
        state.find((s, index) => {
          i = index;
          return s.id === action.payload.id;
        })
      ) {
        state[i] = { ...action.payload, quantity: state[i].quantity - 1 };
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    empty(state, action) {
      localStorage.setItem("cart", JSON.stringify([]));
      return [];
    },
  },
});

export const { addToCart, loadCart, increment, decrement, empty } =
  CartSlice.actions;

export default CartSlice.reducer;
