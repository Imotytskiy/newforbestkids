import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  //   _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true }, // Масив URL-ів зображень
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: [String], required: true }, // Масив розмірів
  bestseller: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const productMOdel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default Product;
