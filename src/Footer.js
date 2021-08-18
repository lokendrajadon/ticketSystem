import React from "react";
import { useSelector } from "react-redux";

export default function Footer() {
  const userData = useSelector((state) => state.userLoginInfo);
  const { userLoginInfo } = userData;
  return (
    <>
      {userLoginInfo ? (
        <footer className="pt-4 my-md-5 pt-md-5 border-top">
          <div className="row">
            <div className="col-12 col-md">
              <small className="d-block mb-3 text-muted">
                &copy; 2017-2018
              </small>
            </div>
          </div>
        </footer>
      ) : (
        ""
      )}
    </>
  );
}
