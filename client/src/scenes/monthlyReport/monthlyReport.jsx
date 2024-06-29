import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Navbar from "scenes/navBar";

const MonthlyReport = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const theme = useTheme();
  const COLORS = [
    theme.palette.primary.main,
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/get");
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    getExpenses();
  }, []);

  const filteredExpenses = useMemo(() => {
    return selectedMonth
      ? expenses.filter(
          (expense) =>
            new Date(expense.date).getMonth() === parseInt(selectedMonth)
        )
      : expenses;
  }, [selectedMonth, expenses]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const chartData = useMemo(() => {
    return filteredExpenses.map((expense) => ({
      name: expense.name,
      amount: expense.amount,
      value: expense.amount,
    }));
  }, [filteredExpenses]);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography
          textAlign="center"
          fontWeight="bold"
          fontSize="24px"
          color="primary"
        >
          Monthly Report
        </Typography>
        <Typography
          textAlign="center"
          fontWeight="bold"
          fontSize="24px"
          color="primary"
        >
          Bar Graph
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
        <BarChart
          width={600}
          height={400}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#187795" />
        </BarChart>{" "}
        <Typography
          textAlign="center"
          fontWeight="bold"
          fontSize="24px"
          color="primary"
        >
          Pie Chart
        </Typography>
        <PieChart width={600} height={400}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill={theme.palette.primary.main}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        <Box display="flex" justifyContent="center" width="100%" mt="10px">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/home")}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MonthlyReport;
