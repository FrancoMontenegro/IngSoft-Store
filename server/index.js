const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");


// middleware
app.use(cors());
app.use(express.json());

//Rutas

//crear usuario, administrador y cliente

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

//Login admin

app.post("/admins/login", async (req, res) => {
  try {
    const { correo,password } = req.body;
    const administrador = await pool.query("select * from usuarios, administradores where usuarios.id = administradores.usuario_id and usuarios.correo = $1 and administradores.password = $2", [
      correo,password
    ]);

    res.json(administrador.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}); 

//Login admin

app.post("/clientes/login", async (req, res) => {
  try {
    const { correo,password } = req.body;
    const cliente = await pool.query("select * from usuarios, clientes where usuarios.id = clientes.usuario_id and usuarios.correo = $1 and clientes.password = $2", [
      correo,password
    ]);

    res.json(cliente.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
}); 


app.listen(3000, () => {
    console.log("server has startd on port 3000");

}); 