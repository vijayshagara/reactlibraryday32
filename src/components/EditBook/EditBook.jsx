import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


const EditBook = () => {
  const params = useParams();
  
  const [editedData, setEditedData] = useState({
    id: "",
    booktitle: "",
    price: "",
    author: "",
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    async function Apidata() {
      console.log(params.id);
      const response = await axios.get(
        `https://63209503e3bdd81d8efdb0f9.mockapi.io/uses/${params.id}`
      );
      // setGet(response.data);
      setEditedData(response.data);
      console.log(response.data);
    }
    Apidata();
  }, [params.id]);

  const navigate = useNavigate();
  const validateForm = (formData) => {
    var errors = {};
    if (formData.booktitle === "") errors.booktitle = "booktitle is Required";
    if (formData.price === "") errors.price = "price is Required";
    if (formData.author === "") errors.author = "author is Required";
    return errors;
  };
  const handleSubmit = async (formData) => {
    //console.log(formData);

    const response = await axios.put(
      `https://63209503e3bdd81d8efdb0f9.mockapi.io/uses/${params.id}`,
      {
        ...data,
      }
    );
    console.log(response.data);
    let users = [...data];
    let index = data.findIndex((row) => row.id === editedData.id);
    users[index] = response.data;
    setData(users);
    navigate("/");
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Formik
              initialValues={editedData}
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
                    type="text"
                    id="booktitle"
                    label="booktitle"
                    variant="standard"
                    name="booktitle"
                    value={values.booktitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <br />
                  <span style={{ color: "red" }}>
                    {touched.booktitle && errors.booktitle}
                  </span>
                  <br />
                  <TextField
                    id="price"
                    label="price"
                    variant="standard"
                    type="number"
                    name="price"
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
                    type="text"
                    label="author"
                    variant="standard"
                    name="author"
                    value={values.author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <br />
                  <span style={{ color: "red" }}>
                    {touched.author && errors.author}
                  </span>
                  <br /> <br />
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    type="button"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Box>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
