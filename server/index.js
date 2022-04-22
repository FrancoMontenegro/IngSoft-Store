const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");


// middleware
app.use(cors());
app.use(express.json());

//Rutas

//crear usuario
app.post("/usuarios", async (req, res) => {
    try {
      const { correo, nombre, apellido_p, apellido_m } = req.body;
      const newUsuario = await pool.query(
        "INSERT INTO usuarios (correo, nombre, apellido_p, apellido_m, fecha_ingreso) VALUES($1, $2, $3, $4, now()) RETURNING usuarios.id",
        [correo, nombre, apellido_p, apellido_m]
      );
      res.json(newUsuario.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
//crear administrador
app.post("/admins", async (req, res) => {
    try {
      const {usuario_id, password} = req.body;
      const newAdmin = await pool.query(
        "INSERT INTO administradores (usuario_id, password) VALUES($1, $2) RETURNING administradores.id",
        [usuario_id, password]
      );
      res.json(newAdmin.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

//crear cliente
app.post("/clientes", async (req, res) => {
  try {
    const {rut, usuario_id, password, celular, direccion, comuna} = req.body;
    const newCliente = await pool.query(
      "INSERT INTO clientes (rut, usuario_id, password, celular, direccion, comuna, estado) VALUES($1, $2, $3, $4, $5, $6, TRUE) RETURNING clientes.rut",
      [rut, usuario_id, password, celular, direccion, comuna]
    );
    res.json(newCliente.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});




app.listen(3000, () => {
    console.log("server has startd on port 3000");

}); 