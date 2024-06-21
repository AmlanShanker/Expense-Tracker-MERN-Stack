import bcrypt from "bcrypt";
import Account from "../models/Account.js"; // Ensure correct model import

/* UPDATE USER */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request parameters
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
    } = req.body;

    // Find existing user by ID
    const user = await Account.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found." });

    // Update user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
    }
    if (picturePath) user.picturePath = picturePath;
    if (location) user.location = location;
    if (occupation) user.occupation = occupation;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ error: err.message });
  }
};
