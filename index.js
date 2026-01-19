import express from "express";
import usersRouter from "./routes/users.routes.js";
import todosRouter from "./routes/todos.routes.js";

const app = express();
app.use(express.json());

// Routes
app.use("/users", usersRouter);
app.use("/todos", todosRouter);

// Start Server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
