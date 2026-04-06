const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,    
  getSummary,
  getFilteredTransactions
} = require("../controllers/transaction.controller");


//Create (Admin only)
router.post("/", protect, authorize("admin"), addTransaction);

//Get all (All roles)
router.get("/", protect, authorize("viewer", "analyst", "admin"), getTransactions);

//Update (Admin only)
router.put("/:id", protect, authorize("admin"), updateTransaction);

//Delete (Admin only)
router.delete("/:id", protect, authorize("admin"), deleteTransaction);

//Summary (Analyst + Admin)
router.get("/summary", protect, authorize("analyst", "admin"), getSummary);

// Filter (Analyst + Admin)
router.get("/filter", protect, authorize("analyst", "admin"), getFilteredTransactions);


module.exports=router;