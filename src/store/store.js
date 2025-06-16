import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsSlice.js'
export const store = configureStore({
  reducer: {
    product:productsReducer
  }, 
});
