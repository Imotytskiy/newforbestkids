import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

const port = process.env.PORT || 4000;
const app = express();

connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/user", userRouter);

// start server
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server running on port ${port}`);
  } else {
    console.error("Error starting server:", error);
  }
});

// // const mongoose = require("mongoose");
// const multer = require("multer");
// const path = require("path");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const { v4: uuidv4 } = require("uuid");

// const app = express();

// app.use(express.json());
// app.use(cors());

// // Database Connection with MongoDB
// mongoose
//   .connect(
//     "mongodb+srv://forbestkids:iAB1ycDNVBccMFMc@cluster0.w7cpy.mongodb.net/e-commerce"
//   )
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB", err));

// // Multer Storage Engine
// const storage = multer.diskStorage({
//   destination: "./upload/images", // Directory to save uploaded files
//   filename: (req, file, cb) => {
//     // Generate a unique filename
//     const uniqueSuffix = `${Date.now()}${path.extname(file.originalname)}`;
//     cb(null, `${file.fieldname}_${uniqueSuffix}`); // Format: fieldname_timestamp.ext
//   },
// });

// const upload = multer({ storage: storage });
// // Serve images statically
// app.use("/images", express.static("upload/images"));

// // Mongoose Product Schema
// const Product = mongoose.model("Product", {
//   _id: { type: String, required: true },
//   name: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, required: true },
//   images: [{ type: String }], // Updated to "images" array
//   category: { type: String, required: true },
//   subCategory: { type: String },
//   sizes: [{ type: String }],
//   date: { type: Date, default: Date.now },
//   bestseller: { type: Boolean, default: false },
// });

// // Upload Image Endpoint
// app.post("/upload", upload.single("product"), (req, res) => {
//   try {
//     res.json({
//       success: 1,
//       image_url: `http://localhost:${port}/images/${req.file.filename}`,
//     });
//   } catch (error) {
//     console.error("Image upload failed:", error);
//     res.status(500).json({ message: "Image upload failed", error });
//   }
// });

// // Add Product Endpoint
// app.post("/addproduct", async (req, res) => {
//   try {
//     console.log("Received product data:", req.body);

//     // Validate required fields
//     const { name, price, category } = req.body;
//     if (!name || !price || !category) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing required fields" });
//     }

//     // Extract and validate product data
//     const productData = {
//       _id: uuidv4(),
//       name: req.body.name,
//       description: req.body.description,
//       price: Number(req.body.price), // Ensure price is a number
//       images: req.body.image || [], // Ensure "images" matches the schema
//       category: req.body.category,
//       subCategory: req.body.subCategory,
//       sizes: Array.isArray(req.body.sizes)
//         ? req.body.sizes
//         : JSON.parse(req.body.sizes || "[]"), // Ensure sizes is an array
//       bestseller: req.body.bestseller === "true", // Convert to boolean
//     };

//     // Create and save new product
//     const product = new Product(productData);
//     await product.save();

//     // Respond with the saved product
//     res.status(201).json({ success: true, product });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Error adding product", error });
//   }
// });

// app.post("/removeproduct", async (req, res) => {
//   try {
//     const result = await Product.findOneAndDelete({ _id: req.body._id });
//     if (result) {
//       res.json({
//         success: true,
//         message: `Product ${req.body._id} removed successfully`,
//       });
//     } else {
//       res.status(404).json({ success: false, message: "Product not found" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Error removing product", error });
//   }
// });

// // Creating API for getting all products
// app.get("/allproducts", async (req, res) => {
//   try {
//     const products = await Product.find({});
//     console.log("All Products Fetched");
//     res.status(200).json({
//       success: true,
//       message: "Products fetched successfully",
//       data: products,
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching products",
//       error: error.message,
//     });
//   }
// });

// const DeliveryInfo = mongoose.model("DeliveryInfo", {
//   name: {
//     type: String,
//     required: true,
//   },
//   surname: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     match: [/.+@.+\..+/, "Please enter a valid email address"], // Basic email validation
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   country: {
//     type: String,
//     required: true,
//   },
//   postalCode: {
//     type: String,
//     required: false,
//   },
//   phone: {
//     type: Number,
//     required: true,
//   },
//   building: {
//     type: String, // String type to accommodate alphanumeric building numbers
//     required: false, // Not required
//   },
//   appartment: {
//     type: String, // String type to accommodate alphanumeric apartment numbers
//     required: false, // Not required
//   },
//   cartData: {
//     type: String, // String type to accommodate alphanumeric apartment numbers
//     required: false, // Not required
//   },
//   method: {
//     type: String, // String type to accommodate alphanumeric apartment numbers
//     required: false, // Not required
//   },
// });

// // Create the model from the schema

// app.post("/delivery", async (req, res) => {
//   try {
//     console.log("Received delivery info:", req.body); // Log incoming data
//     const deliveryInfo = new DeliveryInfo(req.body);
//     await deliveryInfo.save();
//     res.status(201).send(deliveryInfo);
//   } catch (error) {
//     console.error("Error saving delivery info:", error.message); // Log error message
//     res.status(400).send({ error: "Failed to save delivery information" });
//   }
// });

// app.get("/alldelivery", async (req, res) => {
//   try {
//     const deliveries = await DeliveryInfo.find(); // Find all documents in the DeliveryInfo collection
//     res.status(200).json(deliveries); // Send the retrieved data as a JSON response
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving deliveries", error });
//   }
// });

// app.post("/removeorder", async (req, res) => {
//   const { _id } = req.body;
//   try {
//     const result = await DeliveryInfo.deleteOne({ _id });
//     if (result.deletedCount === 1) {
//       res.status(200).json({ success: true });
//     } else {
//       res.status(404).json({ success: false, message: "Order not found" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Error deleting order", error });
//   }
// });

// const Users = mongoose.model("Users", {
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });
// //endpoint for regis
// app.post("/signup", async (req, res) => {
//   let check = await Users.findOne({ email: req.body.email });
//   if (check) {
//     return res
//       .status(400)
//       .json({ success: false, errors: "existing user found" });
//   }
//   let cart = {};
//   for (let i = 0; i < 300; i++) {
//     cart[i] = 0;
//   }

//   const user = new Users({
//     name: req.user,
//     email: req.body.email,
//     password: req.body.password,
//     cartData: cart,
//   });

//   await user.save();

//   const data = {
//     user: {
//       id: user.id,
//     },
//   };
//   const token = jwt.sign(data, "secret_ecom");
//   res.json({ success: true, token });
// });
// //create endpoint for user login
// app.post("/login", async (req, res) => {
//   try {
//     // Find user by email
//     let user = await Users.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(400).json({ success: false, errors: "Wrong Email Id" });
//     }

//     // Compare the provided password with the stored password
//     const passCompare = req.body.password === user.password;

//     if (!passCompare) {
//       return res.status(400).json({ success: false, errors: "Wrong password" });
//     }

//     // Generate JWT token
//     const data = {
//       user: {
//         id: user.id,
//       },
//     };
//     const token = jwt.sign(data, "secret_ecom");

//     // Send the token as a response
//     res.json({ success: true, token });
//   } catch (error) {
//     // Handle errors
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });
// // Start Server
