import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "./Actions/AuthActions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Header(props) {
  let history = useHistory();
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut(), history);
  };

  const userData = useSelector((state) => state.userLoginInfo);
  const { userLoginInfo } = userData;

  return (
    <>
      {userLoginInfo ? (
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal">
            Ticket Generator
          </h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <Link className="p-2 text-dark" to="/">
              Dashboard
            </Link>
            <Link className="p-2 text-dark" to="/tickets">
              Tickets
            </Link>
            <div className="dropdown">
              <Link to="#">
                {userLoginInfo.email}
                <i className="fa fa-caret-down"></i>{" "}
              </Link>
              <ul className="dropdown-content">
                <Link to="#signout" onClick={signOutHandler}>
                  Sign Out
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
