const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Routes and Middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define a mongoose schema
const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
});

// Connect Frontend to Backend
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Create a new todo
app.post("/api/todos", async (req, res) => {
  const newTodo = new Todo({
    task: req.body.task,
    completed: false,
  });

  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

// Update a todo
app.put("/api/todos/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTodo);
});

// Delete a todo
app.delete("/api/todos/:id", async (req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted Successfully!" });
});

const Todo = mongoose.model("Todo", todoSchema);
