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

//Login cliente

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

//CRUD producto

app.post("/productos", async (req, res) => {
  try {
    const { nombre, precio, descripcion, stock, url_imagen } = req.body;
    const newProducto = await pool.query(
      "INSERT INTO productos (nombre, precio, descripcion, stock, url_imagen) VALUES($1, $2, $3, $4, $5) RETURNING productos.id",
      [nombre, precio, descripcion, stock, url_imagen]
    );
    res.json(newProducto.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/productos", async (req, res) => {
  try {
    const allProductos = await pool.query(
      "SELECT * FROM productos order by productos.id"
    );
    res.json(allProductos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await pool.query(
      "SELECT * FROM productos WHERE productos.id = $1",
      [id]
    );

    res.json(producto.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {nombre, precio, descripcion, stock, url_imagen} = req.body;
    const updateProducto = await pool.query(
      "UPDATE productos SET nombre = $1, precio = $2, descripcion = $3, stock = $4, url_imagen = $5 WHERE productos.id = $6",
      [nombre, precio, descripcion, stock, url_imagen, id ]
    );

    res.json("Producto actualizado!");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProducto = await pool.query(
      "DELETE FROM productos WHERE productos.id= $1",
      [id]
    );
    res.json("Producto eliminado!");
  } catch (err) {
    console.log(err.message);
  }
});



app.listen(3000, () => {
    console.log("server has startd on port 3000");

}); 