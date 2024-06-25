import mongoose from "mongoose";

// Define the schema for the Expense collection
const ExpenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 500,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Define and export the Expense model
const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
