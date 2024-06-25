import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import Navbar from "scenes/navBar"; // Import Navbar component

const expenseSchema = yup.object().shape({
  date: yup.date().required("Date is required"),
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  amount: yup.number().required("Amount is required"),
});

const initialValuesExpense = {
  date: "",
  name: "",
  description: "",
  amount: "",
};

const AddExpense = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addExpense = async (values, onSubmitProps) => {
    try {
      const response = await fetch("http://localhost:3001/auth/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      console.log("Request sent to server:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from server:", result);

      onSubmitProps.resetForm();
      navigate("/home");
    } catch (error) {
      console.error("Error adding expense:", error);
      // Handle error, e.g., show a message to the user
    }
  };

  return (
    <>
      <Navbar /> {/* Render Navbar component */}
      <Box p="40px">
        {" "}
        {/* Add padding around the form */}
        <Formik
          onSubmit={addExpense}
          initialValues={initialValuesExpense}
          validationSchema={expenseSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box display="grid" gap="20px" gridTemplateColumns="1fr 1fr">
                <Box>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date}
                    name="date"
                    error={Boolean(touched.date) && Boolean(errors.date)}
                    helperText={touched.date && errors.date}
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={
                      Boolean(touched.description) &&
                      Boolean(errors.description)
                    }
                    helperText={touched.description && errors.description}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amount}
                    name="amount"
                    error={Boolean(touched.amount) && Boolean(errors.amount)}
                    helperText={touched.amount && errors.amount}
                  />
                </Box>
                {/* Example of using Typography */}
                <Typography variant="body2" color="textSecondary">
                  Please fill out the form fields.
                </Typography>
                <Box mt="20px">
                  <Button type="submit" variant="contained">
                    Add Expense
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default AddExpense;