import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Navbar from "../layout/navbar/Navbar";
import RegisterModal from "../layout/navbar/RegisterModal";
import LoginModal from "../layout/navbar/LoginModal";
import AddStock from "./AddStock";
import RemoveStock from "./RemoveStock";

import { get_stock, get_UserStock } from "../../actions/stockAction";

import Loading from "../../resources/Images/loading.gif";

const Home = ({
  get_stock,
  get_UserStock,
  stock: { loading, user_stock, error },
}) => {
  useEffect(() => {
    get_stock();
    get_UserStock();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <Navbar />
      <RegisterModal />
      <LoginModal />
      <div className="container">
        <div className="row row-cols-1 justify-content-center">
          {loading ? (
            <div className="col-3">
              <img
                src={Loading}
                style={{ width: "250px" }}
                className="mx-auto"
                alt="loading"
              />
            </div>
          ) : (
            <Fragment>
              <AddStock />
              {user_stock && <RemoveStock />}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Home.propTypes = {
  get_stock: PropTypes.func.isRequired,
  get_UserStock: PropTypes.func.isRequired,
  stock: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps, { get_stock, get_UserStock })(Home);
