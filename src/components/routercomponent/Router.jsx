import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GetBook from "../GetBook/GetBook";
import AddBook from "../AddBook/AddBook";
import EditBook from "./../EditBook/EditBook";

const Router = () => {
  //console.log(data);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetBook />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/editbook/:id" element={<EditBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
