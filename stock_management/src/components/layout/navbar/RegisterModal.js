import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { setAlert } from "../../../actions/alertAction";
import { register, loadUser, clearErrors } from "../../../actions/authAction";
import { hideModal } from "../../../actions/modalAction";

import { Modal } from "react-bootstrap";

const RegisterModal = ({
  alerts,
  setAlert,
  register,
  modal: { registerModal },
  loadUser,
  hideModal,
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
      hideModal("register");
      history.push("/");
    }
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    } else if (error === "Please enter a password with 6 or more characters") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

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
    <Modal
      show={registerModal}
      onHide={() => hideModal("register")}
      id="Register"
    >
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};

RegisterModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
  auth: state.auth,
  modal: state.modal,
});

export default connect(mapStateToProps, {
  setAlert,
  register,
  hideModal,
  loadUser,
  clearErrors,
})(RegisterModal);
