import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Use backend URL from env
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/checkout`;

// Async thunk to create checkout session
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, checkoutData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating checkout:", error);
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong during checkout" }
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCheckout: (state) => {
      state.checkout = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Checkout failed";
      });
  },
});

export const { clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
