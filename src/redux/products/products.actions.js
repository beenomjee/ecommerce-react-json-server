import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (urlWithHost) => {
    const response = await axios.get(`http://localhost:3000${urlWithHost}`);
    return [...response.data];
  }
);

export const getTotal = createAsyncThunk("products/getTotal", async (data) => {
  try {
    console.log(data);
    let url = "http://localhost:3000/products";
    if (data[0]) url += "?category=" + data[0];
    if (data[1]) url += "?&q=" + data[1];
    const response = await axios.get(url);
    return response.data.length;
  } catch (err) {
    return;
  }
});
