import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddBook.css"

const AddBook = () => {
  const navigate = useNavigate();
  const validateForm = (formData) => {
    var errors = {};
    if (formData.booktitle === "") errors.booktitle = "booktitle is Required";
    if (formData.price === "") errors.price = "price is Required";
    if (formData.author === "") errors.author = "author is Required";
    return errors;
  };
  const handleSubmit = async (formData, { resetForm }) => {
    console.log(formData);
    resetForm();
    const response = await axios.post(
      `https://63209503e3bdd81d8efdb0f9.mockapi.io/uses`,
      {
        booktitle: formData.booktitle,
        price: formData.price,
        author: formData.author,
      }
    );
    console.log(response.data);
    navigate("/")
  };
  return (
    <div className="addbook">
     <div className="container">
        <div className="row">
          <div className="col-lg-12">
      <Formik
        initialValues={{
          booktitle: "",
          price: "",
          author: "",
        }}
        validate={(formData) => validateForm(formData)}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "30ch" },
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="booktitle"
              label="booktitle"
              variant="standard"
              booktitle="booktitle"
              value={values.booktitle}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>{touched.booktitle && errors.booktitle}</span>
            <br />
            <TextField
              id="price"
              label="price"
              variant="standard"
              type="number"
              booktitle="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>
              {touched.price && errors.price}
            </span>
            <br />
            <TextField
              id="author"
              type="author"
              label="author"
              variant="standard"
              booktitle="author"
              value={values.author}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <span style={{ color: "red" }}>
              {touched.author && errors.author}
            </span>
            <br /> <br />
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Button variant="contained" type="button" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        )}
      </Formik>
      </div></div></div>
    </div>
  );
};

export default AddBook;
