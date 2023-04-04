import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id) => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  }
);
