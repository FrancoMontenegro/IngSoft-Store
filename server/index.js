const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");


//middleware
app.use(cors());
app.use(express.json());

//Rutas

//crear usuario
//obtener usuario
//actualizar usuario
//eliminar usuario

//crear producto
//obtener producto
//actualizar producto
//eliminar producto


app.listen(5000, () => {
    console.log("server has startd on port 5000");

}); 