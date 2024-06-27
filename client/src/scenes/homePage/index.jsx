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
  TableSortLabel,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "asc",
  });
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/get");
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        setExpenses(data);
        calculateTotalAmount(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    getExpenses();
  }, []);

  const calculateTotalAmount = (expenses) => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalAmount(total);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);

    const filteredExpenses = month
      ? expenses.filter(
          (expense) => new Date(expense.date).getMonth() === parseInt(month)
        )
      : expenses;

    calculateTotalAmount(filteredExpenses);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const filteredExpenses = selectedMonth
    ? expenses.filter(
        (expense) =>
          new Date(expense.date).getMonth() === parseInt(selectedMonth)
      )
    : expenses;

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortConfig.key === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      return 0;
    }
  });

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
          <Box>
            <Typography
              textAlign="center"
              fontWeight="bold"
              fontSize="32px"
              color="primary"
            >
              Expense Table
            </Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="month-select-label">Month</InputLabel>
              <Select
                labelId="month-select-label"
                value={selectedMonth}
                onChange={handleMonthChange}
                label="Month"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="0">January</MenuItem>
                <MenuItem value="1">February</MenuItem>
                <MenuItem value="2">March</MenuItem>
                <MenuItem value="3">April</MenuItem>
                <MenuItem value="4">May</MenuItem>
                <MenuItem value="5">June</MenuItem>
                <MenuItem value="6">July</MenuItem>
                <MenuItem value="7">August</MenuItem>
                <MenuItem value="8">September</MenuItem>
                <MenuItem value="9">October</MenuItem>
                <MenuItem value="10">November</MenuItem>
                <MenuItem value="11">December</MenuItem>
              </Select>
            </FormControl>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortConfig.key === "date"}
                      direction={sortConfig.direction}
                      onClick={() => handleSort("date")}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedExpenses.map((expense) => (
                  <TableRow key={expense._id}>
                    <TableCell>{formatDate(expense.date)}</TableCell>
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/monthlyreport")}
                style={{ marginLeft: "10px" }}
              >
                Monthly Report
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
