const express = require("express");
const cors = require("cors");
const pool = require("./db/connection");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API funcionando" });
});

app.get("/atletas", async (req, res) => {
  const result = await pool.query("SELECT * FROM atletas ORDER BY id");
  res.json(result.rows);
});

app.post("/atletas", async (req, res) => {
  const { nome, esporte, pais } = req.body;
  const result = await pool.query(
    "INSERT INTO atletas(nome, esporte, pais) VALUES($1,$2,$3) RETURNING *",
    [nome, esporte, pais]
  );
  res.status(201).json(result.rows[0]);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("Servidor rodando"));
}

module.exports = app;
