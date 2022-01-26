import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../../actions/authAction";
import { clearUserStock } from "../../../actions/stockAction";
import { showModal } from "../../../actions/modalAction";

const Navbar = ({
  logout,
  clearUserStock,
  showModal,
  auth: { isAuthenticated, user },
}) => {
  const [user_name, setUserName] = useState("");
  const buttonStyle = {
    backgroundColor: "transparent",
    border: "0px",
  };
  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }

    // eslint-disable-next-line
  }, [user]);
  return (
    <nav className={`navbar navbar-expand-lg navbar-fixed-top`} id="Navbar">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="navbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse`} id="navbar">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <Fragment>
                <li className="nav-item">
                  <p className="my-2">Welcome {user_name}</p>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    style={buttonStyle}
                    onClick={() => {
                      clearUserStock();
                      logout();
                    }}
                    className="nav-link"
                  >
                    Logout
                  </button>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <button
                    type="button"
                    style={buttonStyle}
                    className="nav-link"
                    data-bs-toggle="modal"
                    data-bs-target="#Register"
                    onClick={() => showModal("register")}
                  >
                    Register
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    style={buttonStyle}
                    className="nav-link"
                    data-bs-toggle="modal"
                    data-bs-target="#Login"
                    onClick={() => showModal("login")}
                  >
                    Sign in
                  </button>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  clearUserStock: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, clearUserStock, showModal })(
  Navbar
);
