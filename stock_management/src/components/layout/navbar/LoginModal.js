import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import { Redirect } from "react-router";

import { setAlert } from "../../../actions/alertAction";
import { login, loadUser, clearErrors } from "../../../actions/authAction";

const LoginModal = ({
  alerts,
  setAlert,
  auth: { isAuthenticated, error },
  login,
  loadUser,
  clearErrors,
}) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please enter all fields", "warning");
      console.log(alerts);
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <div
      class="modal fade"
      tabIndex="-2"
      id="Login"
      aria-labelledby="LoginLabel"
      aria-hidden="true"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {alerts.map((alert, index) => (
              <div
                className={`alert alert-${alert.type} alert-dismissible`}
                role="alert"
                key={index}
              >
                <i class="fas fa-times"></i> {alert.msg}
              </div>
            ))}
            <form action="" onSubmit={onSubmit}>
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
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAlert,
  login,
  loadUser,
  clearErrors,
})(LoginModal);
