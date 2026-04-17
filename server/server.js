const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Scholar";

app.use(cors({
    origin: "https://crud-app-client-5rs6.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("mongoDB connected successfully"))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });

const scholarSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  age: { type: Number },
  course: { type: String },
  password: { type: String, required: true },
});

const db = mongoose.model("scholardatas", scholarSchema);

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

app.get("/Scholar", asyncHandler(async (req, res) => {
  const response = await db.find();
  res.json(response);
}));

app.get("/Scholar/:id", asyncHandler(async (req, res) => {
  const response = await db.findById(req.params.id);
  if (!response) return res.status(404).json({ error: "Scholar not found" });
  res.json(response);
}));

app.put("/Scholar/:id", asyncHandler(async (req, res) => {
  const response = await db.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!response) return res.status(404).json({ error: "Scholar not found" });
  res.json({ message: "updated", response });
}));

app.delete("/Scholar/:id", asyncHandler(async (req, res) => {
  const response = await db.findByIdAndDelete(req.params.id);
  if (!response) return res.status(404).json({ error: "Scholar not found" });
  res.json({ message: "Deleted", response });
}));

app.post("/Scholar", asyncHandler(async (req, res) => {
  const { password, ...data } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  const hashing = await bcrypt.hash(password, 10);
  const response = await db.create({ ...data, password: hashing });
  res.status(201).json({ message: "Created successfully", response });
}));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});