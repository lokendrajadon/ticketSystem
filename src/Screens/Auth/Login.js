import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../Actions/AuthActions";
import "./register.css";
import "../../../node_modules/font-awesome/css/font-awesome.min.css";
import { Validation } from "../../Utils/Validation";
import LoadingBox from "../../Components/MessageBox";
import MessageBox from "../../Components/LoadingBox";

const Login = (props) => {
  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formDataError, setFormDataError] = useState({});
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userLoginInfo);
  const { loading, error, userLoginInfo } = userData;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await setFormDataError(Validation(formData));
    if (!Validation(formData).email && !Validation(formData).password) {
      await dispatch(userLogin(formData.email, formData.password));
    }
  };

  useEffect(() => {
    if (userLoginInfo) {
      props.history.push("/");
      setFormData({});
    }
  }, [props.history, userLoginInfo]);
  return (
    <>
      <div className="container">
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-3 text-center">Login Account</h4>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            <form onSubmit={onSubmitHandler}>
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
                  value={formData.email}
                  placeholder="Email address"
                  type="text"
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
                  value={formData.password}
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
                  Login{" "}
                </button>
              </div>
              <p className="text-center">
                Don't Have an account? <Link to="register">Register</Link>{" "}
              </p>
            </form>
          </article>
        </div>
      </div>
    </>
  );
};

export default Login;
