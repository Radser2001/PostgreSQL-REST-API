//express
const express = require("express");
const app = express();
const cors = require("cors");
//pool to run queries on postgres
const pool = require("./config/db");

//middleware
app.use(cors());
//get data from client side using req.body
//gives access to req.body
app.use(express.json());

//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
  try {
    //data from client side
    const { description } = req.body;
    //write sql queries
    //await -> because it might take sometime
    const newTodo = await pool.query(
      //RETURNING * -> return back the data which will be created, updated or deleted
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get all
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo ORDER BY todo_id ASC"
    );
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated");
  } catch (error) {
    console.log(error.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json("Todo was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

//start server
app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
