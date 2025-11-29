// // Entry Point
// const express = require("express");
// const cors = require("cors");
// const dotenv =require("dotenv");
// const connectDB=require("./config/db");
// const userRoutes=require("./routes/userRoutes.js");

// const app = express();
// app.use(express.json());
// app.use(cors());
// dotenv.config();


// const PORT =process.env.PORT || 3000;

// app.get("/",(req,res)=>{
//     res.send("Welcome to suvarnarup");
// })
// // coonection
// connectDB();
// app.listen(PORT, ()=>{
//     console.log("Server is running");
// })

// // API ROutes
// app.use("/api/users",userRoutes);
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes.js");

// dotenv.config(); // Load environment variables early

// const app = express();

// // ✅ Configure CORS correctly
// app.use(cors({
//     origin: "http://localhost:5173", // Allow frontend to access API
//     credentials: true, // Allow cookies, authorization headers
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
// }));

// app.use(express.json()); // Middleware to parse JSON

// const PORT = process.env.PORT || 9000;

// // ✅ Define routes before starting the server
// app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//     res.send("Welcome to SuvarnaRup");
// });

// // ✅ Connect to Database
// connectDB();

// // ✅ Start the Server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js")
const checkoutRoutes = require("./routes/checkOutRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const subscribeRoutes = require("./routes/subsribeRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js")

// ✅ Load environment variables
dotenv.config();

// Set JWT secret if not provided
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'your_jwt_secret_key_here_12345';
    console.log('JWT_SECRET not found in .env, using default');
}

// Set MongoDB URL if not provided
if (!process.env.MONGO_URL) {
    process.env.MONGO_URL = 'mongodb://localhost:27017/suvarnarup';
    console.log('MONGO_URL not found in .env, using default');
}

const app = express();

// ✅ Configure CORS correctly
const allowedOrigins = ["http://localhost:3000","http://localhost:5173", "http://localhost:5174","http://suvarnarup-ecommerce.imcc.com"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

const PORT = process.env.PORT || 9000;

// ✅ Connect to Database
connectDB();

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to SuvarnaRup");
});

// ✅ Start the Server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});