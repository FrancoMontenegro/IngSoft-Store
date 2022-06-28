const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    rut: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido_p: { type: String, required: true },
    apellido_m: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    celular: { type: String, required: true },
    direccion: { type: String, required: true },
    comuna: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);