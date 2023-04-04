import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./products/products.slice";
import cartSlice from "./cart/cart.slice";
import productSlice from "./product/product.slice";

export default combineReducers({
  products: productsSlice,
  cart: cartSlice,
  product: productSlice,
});
