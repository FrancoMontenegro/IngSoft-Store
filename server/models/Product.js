const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: {
        type: Boolean,
        default: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);