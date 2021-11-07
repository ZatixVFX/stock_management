import React, { Fragment } from "react";

import Navbar from "../layout/navbar/Navbar";
import RegisterModal from "../layout/navbar/RegisterModal";
import LoginModal from "../layout/navbar/LoginModal";
import AddStock from "./AddStock";

const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <RegisterModal />
      <LoginModal />
      <div className="container">
        <div className="row row-cols-1">
          <AddStock />
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
