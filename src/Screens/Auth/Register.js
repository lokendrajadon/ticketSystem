import React, { useState, useEffect } from "react";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";

import { userRegister } from "../../Actions/AuthActions";
import { Validation } from "../../Utils/Validation";
import LoadingBox from "../../Components/MessageBox";
import MessageBox from "../../Components/LoadingBox";
const Register = (props) => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  const [newUser, setNewUser] = useState(initialFormData);
  const [formDataError, setFormDataError] = useState({});
  const dispatch = useDispatch();

  const { loading, error, userRegisterData } = useSelector(
    (state) => state.userRegisterInfo
  );
  const userData = useSelector((state) => state.userLoginInfo);
  const { userLoginInfo } = userData;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await setFormDataError(Validation(newUser));

    if (
      !Validation(newUser).email &&
      !Validation(newUser).password &&
      !Validation(newUser).phone &&
      !Validation(newUser).password
    ) {
      dispatch(userRegister(newUser));
      // clear form data
      if (error) {
        setNewUser(initialFormData);
      }
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  useEffect(() => {
    if (userRegisterData || userLoginInfo) {
      props.history.push("/login");
    }
  }, [props.history, userRegisterData, userLoginInfo]);

  return (
    <>
      <div className="container">
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Create Account</h4>
            <p className="text-center">Get started with your free account</p>

            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}

            <form onSubmit={onSubmitHandler}>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-user"></i>{" "}
                  </span>
                </div>
                <input
                  name="name"
                  className={
                    formDataError.name
                      ? "form-control errorField"
                      : "form-control"
                  }
                  value={newUser.name}
                  placeholder="Full name"
                  type="text"
                  onChange={onChangeHandler}
                />
              </div>
              {formDataError ? (
                <p className="errorText">{formDataError.name}</p>
              ) : (
                " "
              )}

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-envelope"></i>{" "}
                  </span>
                </div>
                <input
                  name="email"
                  className={
                    formDataError.email
                      ? "form-control errorField"
                      : "form-control"
                  }
                  value={newUser.email}
                  placeholder="Email address"
                  type="email"
                  onChange={onChangeHandler}
                />
              </div>
              {formDataError ? (
                <p className="errorText">{formDataError.email}</p>
              ) : (
                " "
              )}

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-phone"></i>{" "}
                  </span>
                </div>

                <input
                  name="phone"
                  className={
                    formDataError.phone
                      ? "form-control errorField"
                      : "form-control"
                  }
                  value={newUser.phone}
                  placeholder="Phone number"
                  type="text"
                  onChange={onChangeHandler}
                />
              </div>
              {formDataError ? (
                <p className="errorText">{formDataError.phone}</p>
              ) : (
                " "
              )}

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {" "}
                    <i className="fa fa-lock"></i>{" "}
                  </span>
                </div>
                <input
                  name="password"
                  className={
                    formDataError.password
                      ? "form-control errorField"
                      : "form-control"
                  }
                  value={newUser.password}
                  placeholder="Create password"
                  type="password"
                  onChange={onChangeHandler}
                />
              </div>
              {formDataError ? (
                <p className="errorText">{formDataError.password}</p>
              ) : (
                " "
              )}

              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  {" "}
                  Create Account{" "}
                </button>
              </div>
              <p className="text-center">
                Have an account? <Link to="login">Log In</Link>{" "}
              </p>
            </form>
          </article>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default Register;
