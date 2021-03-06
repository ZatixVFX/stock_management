import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { setAlert } from "../../../actions/alertAction";
import { login, loadUser, clearErrors } from "../../../actions/authAction";
import { hideModal } from "../../../actions/modalAction";

import { Modal } from "react-bootstrap";

const LoginModal = ({
  alerts,
  setAlert,
  hideModal,
  modal: { loginModal },
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
      setUser({
        email: email,
        password: "",
      });
      loadUser();
      hideModal("login");
      history.push("/");
    }
    if (error === "Invalid Credentials") {
      setAlert(error, "danger");
      clearErrors();
    } else if (error === "This email is not registered yet") {
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
    } else {
      login({
        email,
        password,
      });
    }
  };
  return (
    <Modal show={loginModal} onHide={() => hideModal("login")} id="Login">
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alerts &&
          alerts.map((alert, index) => (
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
      </Modal.Body>
    </Modal>
  );
};

LoginModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
  auth: state.auth,
  modal: state.modal,
});

export default connect(mapStateToProps, {
  setAlert,
  hideModal,
  login,
  loadUser,
  clearErrors,
})(LoginModal);
