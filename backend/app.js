const express = require("express");
const { conexionDB } = require("./database/config");
const authRouter = require("./router/auth");
const taskRouter = require("./router/task");
require('dotenv').config();
const cors = require("cors");

const app = express();

/* Obtener el puerto del archivo .env. */
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cors());

/* Conexión a la base de datos. */

conexionDB();

app.use("/auth", authRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send('public/home.html');
});

/* Escuchando el puerto que está definido en el archivo .env. */
app.listen(port, () => {
  console.log(`Tasklist is running on port ${port}`);
});
