import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Navbar from "scenes/navBar";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell } from "recharts";

const MonthlyReport = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showBarChart, setShowBarChart] = useState(true);
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
    }));
  }, [filteredExpenses]);

  const handleShowBarChart = () => {
    setShowBarChart(true);
  };

  const handleShowPieChart = () => {
    setShowBarChart(false);
  };

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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          mt="20px"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowBarChart}
            style={{ marginRight: "10px" }}
            disabled={showBarChart}
          >
            Show Bar Graph
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowPieChart}
            disabled={!showBarChart}
          >
            Show Pie Chart
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" width="100%" mt="20px">
          {showBarChart ? (
            <Box style={{ width: isNonMobileScreens ? "80%" : "100%" }}>
              <Typography
                textAlign="center"
                fontWeight="bold"
                fontSize="20px"
                color="primary"
              >
                Bar Graph
              </Typography>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BarChart
                  width={isNonMobileScreens ? 800 : 500}
                  height={500}
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis type="number" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#187795" />
                </BarChart>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={isNonMobileScreens ? "50%" : "100%"}
              style={{ height: "400px", position: "relative" }}
            >
              <Typography
                textAlign="center"
                fontWeight="bold"
                fontSize="20px"
                color="primary"
                style={{ position: "absolute", top: 0, width: "100%" }}
              >
                Pie Chart
              </Typography>
              <PieChart width={400} height={400}>
                <Pie
                  data={chartData}
                  dataKey="amount"
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
            </Box>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          mt="20px"
          gap="10px"
        >
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
