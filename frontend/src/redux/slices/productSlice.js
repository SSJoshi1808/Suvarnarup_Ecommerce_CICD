import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../config/api";

/* ---------------- FETCH FILTERED PRODUCTS ---------------- */
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({ price_min, price_max, category, collections, rating, numReviews, weight, name }) => {
    const query = new URLSearchParams();

    if (collections) query.append("collections", collections);
    if (price_max) query.append("maxPrice", price_max);
    if (price_min) query.append("minPrice", price_min);
    if (category) query.append("category", category);
    if (rating) query.append("rating", rating);
    if (numReviews) query.append("numReviews", numReviews);
    if (weight) query.append("weight", weight);
    if (name) query.append("name", name);

    const response = await axios.get(`${API}/products?${query.toString()}`);
    return response.data;
  }
);

/* ---------------- FETCH PRODUCT DETAILS ---------------- */
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(`${API}/products/${id}`);
    return response.data;
  }
);

/* ---------------- UPDATE PRODUCT ---------------- */
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${API}/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

/* ---------------- FETCH SIMILAR PRODUCTS ---------------- */
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(`${API}/products/similar/${id}`);
    return response.data;
  }
);

/* ---------------- FETCH BEST SELLER ---------------- */
export const fetchBestSeller = createAsyncThunk(
  "products/fetchBestSeller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/products/best-seller`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch best seller" });
    }
  }
);

/* ---------------- SLICE ---------------- */
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    bestSeller: null,
    loading: false,
    error: null,
    filters: {
      minPrice: "",
      maxPrice: "",
      category: "",
      collections: "",
      rating: "",
      numReviews: "",
      weight: "",
    },
  },

  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        minPrice: "",
        maxPrice: "",
        category: "",
        collections: "",
        rating: "",
        numReviews: "",
        weight: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      /* BEST SELLER */
      .addCase(fetchBestSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSeller = action.payload;
      })
      .addCase(fetchBestSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      /* FILTER PRODUCTS */
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* PRODUCT DETAILS */
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* UPDATE */
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })

      /* SIMILAR PRODUCTS */
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;


//Test

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API = import.meta.env.VITE_BACKEND_URL;

// // ------------------ Thunks ------------------ //

// // Fetch products with filters
// export const featchProductsByFilters = createAsyncThunk(
//   "products/featchByFilters",
//   async (filters, { rejectWithValue }) => {
//     try {
//       const query = new URLSearchParams(filters).toString();
//       const response = await axios.get(`${API}/api/products?${query}`);
//       return response.data;
//     } catch (error) {
//       console.error("❌ featchProductsByFilters error:", error);
//       return rejectWithValue(error.response?.data || { message: "Failed to fetch products" });
//     }
//   }
// );

// // Fetch single product by ID
// export const featchProductDetails = createAsyncThunk(
//   "products/featchProductDetails",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API}/api/products/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("❌ featchProductDetails error:", error);
//       return rejectWithValue(error.response?.data || { message: "Failed to fetch product details" });
//     }
//   }
// );

// // Fetch similar products
// export const featchSimilarProducts = createAsyncThunk(
//   "products/featchSimilarProducts",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API}/api/products/similar/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("❌ featchSimilarProducts error:", error);
//       return rejectWithValue(error.response?.data || { message: "Failed to fetch similar products" });
//     }
//   }
// );

// // ✅ Fetch new arrivals
// export const fetchNewArrivals = createAsyncThunk(
//   "products/fetchNewArrivals",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API}/api/products/new-arrivals`);
//       return response.data;
//     } catch (error) {
//       console.error("❌ fetchNewArrivals error:", error);
//       return rejectWithValue(error.response?.data || { message: "Failed to fetch new arrivals" });
//     }
//   }
// );

// // ✅ Fetch best seller
// export const fetchBestSeller = createAsyncThunk(
//   "products/fetchBestSeller",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API}/api/products/best-seller`);
//       return response.data;
//     } catch (error) {
//       console.error("❌ fetchBestSeller error:", error);
//       return rejectWithValue(error.response?.data || { message: "Failed to fetch best sellers" });
//     }
//   }
// );

// // ------------------ Slice ------------------ //

// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     products: [],
//     selectedProduct: null,
//     similarProducts: [],
//     newArrivals: [],
//     bestSellers: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // filters
//       .addCase(featchProductsByFilters.fulfilled, (state, action) => {
//         state.products = action.payload;
//       })
//       // product details
//       .addCase(featchProductDetails.fulfilled, (state, action) => {
//         state.selectedProduct = action.payload;
//       })
//       // similar
//       .addCase(featchSimilarProducts.fulfilled, (state, action) => {
//         state.similarProducts = action.payload;
//       })
//       // new arrivals
//       .addCase(fetchNewArrivals.fulfilled, (state, action) => {
//         state.newArrivals = action.payload;
//       })
//       // best seller
//       .addCase(fetchBestSeller.fulfilled, (state, action) => {
//         state.bestSellers = action.payload;
//       });
//   },
// });

// export default productSlice.reducer;
