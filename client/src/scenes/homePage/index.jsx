import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  useMediaQuery,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "scenes/navBar";
import UserWidget from "scenes/widgets/UserWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Fetch expenses from backend
    const getExpenses = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/get"); // Fetch expenses endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        setExpenses(data); // Assuming data is an array of expenses objects
        calculateTotalAmount(data); // Calculate total amount after fetching expenses
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    getExpenses();
  }, []); // Run only once on component mount

  // Function to calculate total amount
  const calculateTotalAmount = (expenses) => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalAmount(total);
  };

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "74%" : undefined}>
          <Box marginTop="1rem">
            <Typography
              textAlign="center"
              fontWeight="bold"
              fontSize="32px"
              color="primary"
            >
              Expense Table
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>{expense.name}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} align="right">
                    <Typography variant="subtitle1" fontWeight="bold">
                      Total Amount Spent:
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {totalAmount}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Box marginTop="1rem" textAlign="center">
              <Button
                variant="contained"
                onClick={() => navigate("/addexpense")}
              >
                Add Expense
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
