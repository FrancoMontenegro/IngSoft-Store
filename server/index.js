const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");


// middleware
app.use(cors());
app.use(express.json());

//Rutas

//crear administrador y cliente

app.post("/admins", async (req, res) => {
    try {
      const {rut ,correo, password, nombre, apellido_p, apellido_m, celular, direccion, comuna} = req.body;
      const newAdmin = await pool.query(
        "INSERT INTO usuarios (rol, rut ,correo, password, nombre, apellido_p, apellido_m, celular, direccion, comuna, estado, fecha_ingreso) VALUES('administrador',$1, $2, $3, $4, $5, $6, $7, $8, $9, TRUE, now()) RETURNING usuarios.id",
        [rut, correo, password, nombre, apellido_p, apellido_m, celular, direccion, comuna]
      );
      res.json(newAdmin.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

app.post("/clientes", async (req, res) => {
  try {
    const {rut ,correo, password, nombre, apellido_p, apellido_m, celular, direccion, comuna} = req.body;
    const newCliente = await pool.query(
      "INSERT INTO usuarios (rol, rut ,correo, password, nombre, apellido_p, apellido_m, celular, direccion, comuna, estado, fecha_ingreso) VALUES('cliente',$1, $2, $3, $4, $5, $6, $7, $8, $9, TRUE, now()) RETURNING usuarios.id",
        [rut, correo, password, nombre, apellido_p, apellido_m, celular, direccion, comuna]
      );
    res.json(newCliente.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//Actualizar usuario

app.put("/clientes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {correo, password, celular, direccion, comuna} = req.body;
    const updateCliente = await pool.query(
      "UPDATE usuarios SET correo = $1, password = $2, celular = $3, direccion = $4, comuna = $5 WHERE usuarios.id = $6",
      [correo, password, celular, direccion, comuna, id]
    );

    res.json("Cliente actualizado!");
  } catch (err) {
    console.error(err.message);
  }
});

//Dar de baja usuario

app.put("/clientes/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateCliente = await pool.query(
      "UPDATE usuarios SET estado = FALSE WHERE usuarios.id = $1",
      [id]
    );

    res.json("Cliente de Baja!");
  } catch (err) {
    console.error(err.message);
  }
});

//obtener todos los clientes activos

app.get("/clientes", async (req, res) => {
  try {
    const allClientes = await pool.query(
      "SELECT * FROM usuarios WHERE usuarios.rol = 'cliente' AND usuarios.estado = 'TRUE' order by usuarios.id"
    );
    res.json(allClientes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Login admin

app.post("/admins/login", async (req, res) => {
  try {
    const { correo,password } = req.body;
    const administrador = await pool.query("select * from usuarios where usuarios.rol = 'administrador' and usuarios.correo = $1 and usuarios.password = $2", [
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
    const cliente = await pool.query("select * from usuarios where usuarios.rol = 'cliente' and usuarios.correo = $1 and usuarios.password = $2", [
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
    const { nombre, precio, categoria, descripcion, stock, url_imagen } = req.body;
    const newProducto = await pool.query(
      "INSERT INTO productos (nombre, precio, categoria, descripcion, stock, url_imagen) VALUES($1, $2, $3, $4, $5, $6) RETURNING productos.id",
      [nombre, precio, categoria, descripcion, stock, url_imagen]
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



app.listen(3001, () => {
    console.log("server has startd on port 3001");

}); 