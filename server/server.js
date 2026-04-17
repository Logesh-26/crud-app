const express = require("express");
const cors = require("cors");
const mongoosh = require("mongoose");
const bcrypt = require("bcrypt");
const { type } = require("node:os");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoosh.connect("mongodb://localhost:27017/Scholar")
    .then(console.log("mongoDB connected successfully"));

const scholarSchema = new mongoosh.Schema({
    name: { type: String },
    email: { type: String },
    age: { type: Number },
    course: { type: String },
    password: { type: String, require: true },
});

const db = mongoosh.model("scholardatas", scholarSchema);

app.get("/Scholar", async (req, res) => {
    const response = await db.find();
    res.send(response);
});

app.get("/Scholar/:id", async (req, res) => {
    const response = await db.findById(req.params.id);
    res.send(response);
});

app.put("/Scholar/:id", async (req, res) => {
    const response = await db.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "updated", response });
});

app.delete("/Scholar/:id", async (req, res) => {
    const response = await db.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted", response });
});

app.post("/Scholar", async (req, res) => {
    const { body } = req;
    const hashing = await bcrypt.hash(body.password, 10);
    await db.create({ ...body, password: hashing });
    res.status(201).send({ message: "Created successfully" });
});

app.listen(PORT, () => {
    console.log("server listening");
});