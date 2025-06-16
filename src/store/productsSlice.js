import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProduct = createAsyncThunk("product", async () => {

  const url = `https://dummyjson.com/products?limit=100 `

  const response = await axios.get(url);
  console.log(response.data, 'redux');

  return response.data.products;
});

const productsSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = "succeed";
      state.product = action.payload
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default productsSlice.reducer;
