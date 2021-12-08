import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { setAlert } from "../../../actions/alertAction";
import { register, loadUser, clearErrors } from "../../../actions/authAction";

const RegisterModal = ({
  alerts,
  setAlert,
  register,
  loadUser,
  auth: { isAuthenticated, error },
  clearErrors,
}) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
    }
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    } else if (error === "Please enter a password with 6 or more characters") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, history]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="Register"
      aria-labelledby="RegisterLabel"
      aria-hidden="true"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {alerts.map((alert, index) => (
              <div
                className={`alert alert-${alert.type} alert-dismissible`}
                role="alert"
                key={index}
              >
                <i className="fas fa-times"></i> {alert.msg}
              </div>
            ))}
            <form onSubmit={onSubmit}>
              <div className="mb-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAlert,
  register,
  loadUser,
  clearErrors,
})(RegisterModal);
