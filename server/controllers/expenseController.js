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

// Remove an expense
export const removeExpense = async (req, res) => {
  try {
    const { name } = req.params;
    const deletedExpense = await Expense.findOneAndDelete({ name });

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
