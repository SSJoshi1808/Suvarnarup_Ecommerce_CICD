// import { createSlice, createAsyncThunk, __DO_NOT_USE__ActionTypes } from "@reduxjs/toolkit";
// import axios from "axios";


// export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrders",async(__DO_NOT_USE__ActionTypes,
//     {rejectWithValue})=>{
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
//                 {
//                     headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        
//                     }
//                 });
//             return response.data;
    
//         } catch (error) {
//             console.error(error);
//             return rejectWithValue(error.response.data);
//         }
//     })

// export const updateOrderStatus = createAsyncThunk("adminOrders/updateOrderStatus",async({id,status},
//     {rejectWithValue})=>{
//         try {
//             const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,{status},
//                 {
//                     headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                        
//                     }
//                 });
//             return response.data;
    
//         } catch (error) {
//             console.error(error);
//             return rejectWithValue(error.response.data);
//         }
//     })


//     export const deleteOrder = createAsyncThunk("adminOrders/deleteOrder",async({id},
//         {rejectWithValue})=>{
//             try {
//                 await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
//                     {
//                         headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                            
//                         }
//                     });
//                 return id;
        
//             } catch (error) {
//                 console.error(error);
//                 return rejectWithValue(error.response.data);
//             }
//         })
    

// const adminOrderSlice = createSlice({
//     name:"adminOrder",
//     initialState:{
//         adminOrders:[],
//         totalOrders:0,
//         totalSales:0,
//         loading:false,
//         error:null,
//     },
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder
//         .addCase(fetchAllOrders.pending,(state)=>{
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(fetchAllOrders.fulfilled,(state,action)=>{
//             state.loading = false;
//             state.error = action.payload;
//             state.totalOrders = action.payload.length;

//             const totalSales =action.payload.reduce((acc,order)=>{
//                 return acc + order.totalPrice;
//             },0)
//             state.totalSales = totalSales;
//         })
//         .addCase(fetchAllOrders.rejected,(state,action)=>{
//             state.loading = false;
//             state.error = action.payload.message;
//         })

//         .addCase(updateOrderStatus.fulfilled,(state,action)=>{
//             state.loading = false;
//             state.error = action.payload;
//             const updateOrder = action.payload;
//             const orderIndex =state.findIndex((order)=>order._id===updateOrder._id);
//             if(orderIndex!==1){
//                 state.orders[orderIndex]=updateOrder
//             }
//         })
//         .addCase(deleteOrder.fulfilled,(state,action)=>{
//             state.order = state.order.findIndex((order)=>order._id!==action.payload)
//         })
//     }
// })
// export default adminOrderSlice.reducer;



//2)
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchAllOrders = createAsyncThunk(
//   "adminOrders/fetchAllOrders",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const updateOrderStatus = createAsyncThunk(
//   "adminOrders/updateOrderStatus",
//   async ({ id, status }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const deleteOrder = createAsyncThunk(
//   "adminOrders/deleteOrder",
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       return id;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const adminOrderSlice = createSlice({
//   name: "adminOrder",
//   initialState: {
//     adminOrders: [],
//     totalOrders: 0,
//     totalSales: 0,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.adminOrders = action.payload;
//         state.totalOrders = action.payload.length;
//         state.totalSales = action.payload.reduce(
//           (acc, order) => acc + order.totalPrice,
//           0
//         );
//         state.error = null;
//       })
//       .addCase(fetchAllOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Failed to fetch orders';
//       })
//       .addCase(updateOrderStatus.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateOrderStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedOrder = action.payload;
//         const orderIndex = state.adminOrders.findIndex(
//           (order) => order._id === updatedOrder._id
//         );
//         if (orderIndex !== -1) {
//           state.adminOrders[orderIndex] = updatedOrder;
//         }
//         state.error = null;
//       })
//       .addCase(updateOrderStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Failed to update order status';
//       })
//       .addCase(deleteOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.adminOrders = state.adminOrders.filter(
//           (order) => order._id !== action.payload
//         );
//         state.totalOrders = state.adminOrders.length;
//         state.totalSales = state.adminOrders.reduce(
//           (acc, order) => acc + order.totalPrice,
//           0
//         );
//         state.error = null;
//       })
//       .addCase(deleteOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Failed to delete order';
//       });
//   },
// });

// export default adminOrderSlice.reducer;


//Test
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from .env (works in local + Docker CI/CD)
const API = import.meta.env.VITE_BACKEND_URL;

// ------------------ Thunks ------------------ //

export const fetchAllOrders = createAsyncThunk(
  "adminOrders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ fetchAllOrders error:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to fetch orders" });
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "adminOrders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API}/api/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ updateOrderStatus error:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to update order status" });
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "adminOrders/deleteOrder",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      return id;
    } catch (error) {
      console.error("❌ deleteOrder error:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to delete order" });
    }
  }
);

// ------------------ Slice ------------------ //

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    adminOrders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = action.payload || [];
        state.totalOrders = state.adminOrders.length;
        state.totalSales = state.adminOrders.reduce(
          (acc, order) => acc + (order.totalPrice || 0),
          0
        );
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })

      // Update order
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.adminOrders.findIndex((o) => o._id === updatedOrder._id);
        if (index !== -1) {
          state.adminOrders[index] = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update order status";
      })

      // Delete order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.adminOrders = state.adminOrders.filter((o) => o._id !== action.payload);
        state.totalOrders = state.adminOrders.length;
        state.totalSales = state.adminOrders.reduce(
          (acc, order) => acc + (order.totalPrice || 0),
          0
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete order";
      });
  },
});

export default adminOrderSlice.reducer;
