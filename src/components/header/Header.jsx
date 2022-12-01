import React from "react";
import "./header.css";

const Header = () => {
  return (
    <div className="container" id="top">
      <div className="row">
        <div className="col-lg-12">
          <div className="header">
            <a href="/">
              <button className="header_left">Home</button>
            </a>
            <span className="center">Book Details</span>
            <a href="/addbook">
              <button className="header_right">Add Book</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
