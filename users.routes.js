import express from "express";
import { readDB, writeDB } from "../helpers/fileHandler.js";

const router = express.Router();

// CREATE USER
router.post("/add", (req, res) => {
  const db = readDB();
  const newUser = { id: Date.now(), ...req.body };

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({
    message: "User created successfully",
    user: newUser
  });
});

// GET ALL USERS
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.users);
});

// GET SINGLE USER
router.get("/:userId", (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id == req.params.userId);

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

// UPDATE USER
router.put("/update/:userId", (req, res) => {
  const db = readDB();
  const { userId } = req.params;

  const userIndex = db.users.findIndex(u => u.id == userId);
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  db.users[userIndex] = { ...db.users[userIndex], ...req.body };
  writeDB(db);

  res.json({ message: "User updated successfully", user: db.users[userIndex] });
});

// DELETE USER
router.delete("/delete/:userId", (req, res) => {
  const db = readDB();
  const { userId } = req.params;

  const userIndex = db.users.findIndex(u => u.id == userId);
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  const deletedUser = db.users.splice(userIndex, 1);
  writeDB(db);

  res.json({ message: "User deleted successfully", deletedUser });
});

export default router;
