// controllers/expenseController.js

import Expense from "../models/Expense.js"; // Ensure you have an Expense model

// Add a new expense
export const addExpense = async (req, res) => {
  try {
    const { date, name, description, amount } = req.body;
    const newExpense = new Expense({
      date,
      name,
      description,
      amount,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
