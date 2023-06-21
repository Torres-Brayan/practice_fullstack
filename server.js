// necessary modules to import
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

// const pool = new Pool ({
//     user: 'brayantorres',
//     port: 5432,
//     host: 'localhost',
//     database: 'todos'
// });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// middle ware
app.use(express.json());
app.use(express.static("public"));
dotenv.config();
app.use(cors());

app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    if (!result.rows[0]) {
      return res.status(404).send("N0 todo at given id.");
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { todo_body } = req.body;
    if (!todo_body) {
      return res.status(400).send("Check body for todo.");
    }
    const result = await pool.query(
      "INSERT INTO todos (todo_body) VALUES ($1) RETURNING *",
      [todo_body]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo_body } = req.body;
    if (!todo_body) {
      return res.status(400).send("Check body for todo.");
    }
    const result = await pool.query(
      "UPDATE todos SET todo_body = $1 WHERE id = $2 RETURNING *",
      [todo_body, id]
    );
    if (!result.rows[0]) {
      return res.status(404).send("N0 todo at given id.");
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );
    if (!result.rows[0]) {
      return res.status(404).send("N0 todo at given id.");
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening On PORT: ${process.env.PORT}`);
});
