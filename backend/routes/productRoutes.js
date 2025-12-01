// const express = require("express");
// const Product = require("../models/Product");
// const { protect,admin} = require("../middelware/authMiddelWare");

// const router = express.Router();

// // @route POST /api/product
// // @desc Create a new product
// // @access Private/admin
// router.post("/", protect,admin, async (req, res) => {
//     try {
//         const {
//             name,
//             description,
//             price,
//             discountPrice,
//             countInStock,
//             sku,
//             category,
//             collections,
//             img,
//             rating,
//             numReviews,
//             tags,
//             dimension,
//             weight
//         } = req.body;

//         const product = new Product({
//             name,
//             description,
//             price,
//             discountPrice,
//             countInStock,
//             sku,
//             category,
//             collections,
//             img,
//             rating,
//             numReviews,
//             tags,
//             dimension,
//             weight,
//             user: req.user._id,
//         });

//         const createdProduct = await product.save();
//         res.status(201).json(createdProduct);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error creating product" });
//     }
// });

// // @route GET /api/products/search
// // @desc Search products by name, category, or collections
// // @access Public
// router.get("/search", async (req, res) => {
//     try {
//         const { q } = req.query;
        
//         if (!q || q.trim() === '') {
//             return res.json([]);
//         }

//         const searchQuery = {
//             $or: [
//                 { name: { $regex: q, $options: "i" } },
//                 { category: { $regex: q, $options: "i" } },
//                 { collections: { $regex: q, $options: "i" } },
//                 { description: { $regex: q, $options: "i" } }
//             ]
//         };

//         const products = await Product.find(searchQuery).limit(10);
//         res.json(products);
//     } catch (error) {
//         console.error('Search error:', error);
//         res.status(500).json({ error: "Error searching products" });
//     }
// });

// // @route Put/api/product/:id
// //@desc update an exiting product id
// //@access private/admin
// router.put("/:id",protect,admin,async (req, res) => {
//     try{
//         const {
//             name,
//             description,
//             price,
//             discountPrice,
//             countInStock,
//             sku,
//             category,
//             collections,
//             img,
//             rating,
//             numReviews,
//             tags,
//             dimension,
//             weight
//         } = req.body;
//         const product = await Product.findById(req.params.id);
//         if(product ) {
//             product.name = name ||product.name;
//             product.description = description||product.description;
//             product.price = price ||product.price;
//             product.discountPrice=discountPrice ||product.discountPrice;
//             product.countInStock = countInStock ||product.countInStock;
//             product.sku = sku ||product.sku;
//             product.category = category ||product.category;
//             product.collections = collections ||product.collections;
//             product.img = img ||product.img;
//             product.rating = rating ||product.rating;
//             product.numReviews = numReviews ||product.numReviews;
//             product.tags = tags ||product.tags;
//             product.dimension = dimension ||product.dimension;
//             product.weight = weight ||product.weight;

//             const updateProduct = await product.save()
//             res.json(updateProduct);

//         }
//         else{
//             res.status(404).json({Error:"Product not found"})
//         }
//     }catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error upadting product" });
//     }
// })
// router.delete("/:id",protect,admin,async(req,res)   => {
//     try{
//         const product = await Product.findById(req.params.id);
//         if(product){
//             await product.deleteOne();
//             res.status(200).json({ Message:"Product deleted Succesfully"})
//         }else{
//             res.status(404).json("Product not found")
//         }
//     }catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error deleting product" });
//     }
// })
// // @route get/api/products
// //@desc get as products with optional query filters 
// //@access public
// router.get("/", async (req, res) => {
//     try {
//         const { minPrice, maxPrice, category, collections, rating, numReviews, weight, name } = req.query;
//         let query = {};

//         // Name filter (search by name)
//         if (name) {
//             query.name = { $regex: name, $options: "i" }; // Case-insensitive search
//         }

//         // Price range filter
//         if (minPrice || maxPrice) {
//             query.price = {};
//             if (minPrice) query.price.$gte = Number(minPrice);
//             if (maxPrice) query.price.$lte = Number(maxPrice);
//         }

//         // Category filter
//         if (category && category.toLowerCase() !== "all") {
//             query.category = category;
//         }

//         // Collections filter
//         if (collections && collections.toLowerCase() !== "all") {
//             query.collections = collections;
//         }

//         // Rating filter
//         if (rating) {
//             query.rating = { $gte: Number(rating) };
//         }

//         // Number of Reviews filter
//         if (numReviews) {
//             query.numReviews = { $gte: Number(numReviews) };
//         }

//         // Weight filter (assuming weight is stored as a number)
//         if (weight) {
//             query.weight = { $gte: Number(weight) };
//         }

//         // Fetch filtered products
//         const products = await Product.find(query);
//         if(!products){
//             res.json("No product found")
//         }
//         res.json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error filtering products" });
//     }
// });
// // @route get/api/products/best-seller
// //@desc best seller
// //@access public
// router.get("/best-seller",async(req,res)=>{
   
//     try{
//        const bestSeller = await Product.findOne().sort({rating:-1});
//        if(bestSeller){
//         res.json(bestSeller)
//        }
//        else
//         {
//             res.status(404).json("Product not found");
//         }
//     }catch(error){
//         console.error(error);
//         res.status(500).json({ error: "Error in similar productt" });
   
//     }
// });
// // @route get/api/products/new-arrivals
// //@descnew arrivals based on created-date 
// //@access public
// router.get("/new-arrivals",async(req,res)=>{
//     try{
//         const product = await Product.find().sort({createdAt:-1}).limit(8);
//         if(product){
//           res.json(product);  
            
//         }
//         else{
//             res.status(404).json("Product not found");
//         }
//     }catch(error){
//         console.error(error);
//         res.status(500).json({ error: "Error getting single product" });
//     }
// })

// // @route get/api/products/:id
// //@desc get a single product by id
// //@access public
// router.get("/:id",async(req,res)=>{
//     const { id } = req.params;
//     try{
//         const product = await Product.findById(id);
//         if(product){
//           res.json(product);  
            
//         }
//         else{
//             res.status(404).json("Product not found");
//         }
//     }catch(error){
//         console.error(error);
//         res.status(500).json({ error: "Error getting single product" });
//     }
// })
// // @route get/api/products/similar/:id
// //@desc similar product based on category and collection
// //@access public
// router.get("/similar/:id",async(req,res)=>{
//     const {id}=req.params;
//     try{
//         const product= await Product.findById(id);
//         if(!product){
//             res.status(404).json("Product not found"); 
//         }
//         const similarProduct = await Product.find({
//             _id:{$ne:id},
//             collections:product.collections,
//             category:product.category
//         }).limit(4)
//         res.json(similarProduct);
//     }catch(error){
//         console.error(error);
//         res.status(500).json({ error: "Error in similar productt" });
   
//     }
// })

// module.exports = router;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../config/api";
import {API} from "../config/"  // <-- using fixed backend URL

// ==============================
// Fetch products with filters
// ==============================
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

    const response = await axios.get(`${API}/api/products?${query.toString()}`);
    return response.data;
  }
);

// ==============================
// Fetch single product
// ==============================
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(`${API}/api/products/${id}`);
    return response.data;
  }
);

// ==============================
// Update product
// ==============================
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${API}/api/products/${id}`,
      productData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
      }
    );
    return response.data;
  }
);

// ==============================
// Fetch similar products
// ==============================
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(`${API}/api/products/similar/${id}`);
    return response.data;
  }
);

// ==============================
// Fetch Best Seller
// ==============================
export const fetchBestSeller = createAsyncThunk(
  "products/fetchBestSeller",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/api/products/best-seller`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch best seller" });
    }
  }
);

// ==============================
// Slice
// ==============================
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

      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.products.findIndex(p => p._id === updated._id);
        if (index !== -1) state.products[index] = updated;
      })

      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
