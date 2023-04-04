import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "./product.actions";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
