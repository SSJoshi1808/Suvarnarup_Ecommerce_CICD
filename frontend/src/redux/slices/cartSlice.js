import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Use backend from env (works in Docker too)
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch the cart from user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL, {
        params: { userId, guestId },
      });
      return response.data || { products: [] };
    } catch (error) {
      console.error("Error fetching cart:", error);
      return { products: [] }; // fallback
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, category, collections, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(API_URL, {
        productId,
        quantity,
        category,
        collections,
        guestId,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || { message: "Failed to add to cart" });
    }
  }
);

// Update cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, guestId, userId, category, collections },
    { rejectWithValue }
  ) => {
    try {
      if (!productId || !category || !collections) {
        return rejectWithValue({ message: "Missing required fields" });
      }

      const parsedQuantity = parseInt(quantity);
      if (isNaN(parsedQuantity)) {
        return rejectWithValue({ message: "Quantity must be a valid number" });
      }
      if (parsedQuantity < 0) {
        return rejectWithValue({ message: "Quantity cannot be negative" });
      }
      if (parsedQuantity > 99) {
        return rejectWithValue({ message: "Quantity cannot exceed 99 items" });
      }

      const response = await axios.put(API_URL, {
        productId,
        quantity: parsedQuantity,
        category,
        collections,
        guestId,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to update cart item" });
    }
  }
);

// Remove an item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, guestId, userId, category, collections }, { rejectWithValue, getState }) => {
    try {
      if (!productId || !category || !collections) {
        return rejectWithValue({ message: "Missing required fields for cart item removal" });
      }

      const response = await axios.delete(API_URL, {
        data: { productId, guestId, userId, category, collections },
      });

      if (response.data?.cart) {
        saveCartToStorage(response.data.cart);
        return response.data.cart;
      }

      // fallback: update locally
      const currentState = getState();
      const updatedProducts = currentState.cart.cart.products.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.category === category &&
            item.collections === collections
          )
      );
      const updatedCart = {
        ...currentState.cart.cart,
        products: updatedProducts,
        totalPrice: updatedProducts.reduce(
          (acc, item) => acc + parseFloat(item.price) * item.quantity,
          0
        ),
      };
      saveCartToStorage(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      return getState().cart.cart; // fallback to current state
    }
  }
);

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/merge`,
        { guestId, userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || { message: "Failed to merge cart" });
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
      })

      // addToCart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })

      // updateCartItemQuantity
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })

      // removeFromCart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })

      // mergeCart
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
