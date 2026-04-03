const Transaction = require("../models/transaction.model");


//Add Transaction
const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description } = req.body;

    if (!type || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Type, amount, and category are required",
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Type must be income or expense",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      type,
      amount: Number(amount),
      category,
      description: description || "",
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Transactions
const getTransactions = async (req, res) => {
  try {
    let filter = {};

    // Admin sees all, others see their own
    if (req.user.role !== "admin") {
      filter.user = req.user.id;
    }

    const transactions = await Transaction.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: transactions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Owner OR admin
    if (
      transaction.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updated,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // Owner OR admin
    if (
      transaction.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//Summary API
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    });

    let income = 0;
    let expense = 0;
    let categoryTotals = {};

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;

      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }
      categoryTotals[t.category] += t.amount;
    });

    res.status(200).json({
      success: true,
      data: {
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense,
        categoryBreakdown: categoryTotals,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Filter API
const getFilteredTransactions = async (req, res) => {
  try {
    const {
      type,
      category,
      startDate,
      endDate,
      page = 1,
      limit = 5,
      sort = "desc",
    } = req.query;

    let filter = {
      user: req.user.id,
    };

    if (type) filter.type = new RegExp(`^${type}$`, "i");
    if (category) filter.category = new RegExp(`^${category}$`, "i");

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const skip=(page-1)*limit;

    const transactions = await Transaction.find(filter)
      .sort({ createdAt: sort === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: transactions,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,   
  deleteTransaction,
  getSummary,
  getFilteredTransactions,
};