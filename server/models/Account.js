import mongoose from "mongoose";

// Define the schema for the Account collection
const AccountSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Define and export the Account model
const Account = mongoose.model("Account", AccountSchema);
export default Account;
