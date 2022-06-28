import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productos: [],
    cantidad: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.cantidad += 1;
      state.productos.push(action.payload);
      state.total += action.payload.precio * action.payload.cantidad;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;