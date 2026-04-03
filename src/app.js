const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running successfully");
});
// DEBUG
const authRoutes = require("./routes/auth.routes");
console.log("Auth Routes:", authRoutes);

app.use("/api/auth", authRoutes);

const transactionRoutes = require("./routes/transaction.routes");

app.use("/api/transactions", transactionRoutes);
module.exports = app;