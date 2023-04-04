import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, getTotal } from "./products.actions";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  total: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
      state.data = [];
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(getTotal.pending, (state) => {});

    builder.addCase(getTotal.fulfilled, (state, action) => {
      state.total = action.payload;
    });
    builder.addCase(getTotal.rejected, (state, action) => {
      state.total = 0;
    });
  },
});

export default productsSlice.reducer;
