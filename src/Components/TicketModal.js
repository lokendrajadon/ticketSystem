import React from "react";
import "../Screens/Auth/register.css";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import LoadingBox from "./MessageBox";
import MessageBox from "./LoadingBox";
export default function TicketModal({
  onChangeHandler,
  ticketData,
  onSubmitHandler,
  formDataError,
  loading,
  error
}) {

  return (
    <div
      className="modal fade"
      id="modalLoginForm"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header text-center">
            <h4 className="modal-title w-100 font-weight-bold">
              Add New Ticket
            </h4>
            <button
              type="button"
              className="close aaaaaaaaaaa"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          <div className="modal-body mx-3">
            <form onSubmit={onSubmitHandler}>
              <div className="row mb-4">
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="ticketName">
                      Ticket Name
                    </label>
                    <input
                      type="text"
                      name="ticketName"
                      id="ticketName"
                      className={
                        formDataError.ticketName
                          ? "form-control errorField"
                          : "form-control"
                      }
                      value={ticketData.ticketName}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-outline">
                    <label className="form-label" htmlFor="ticketNumber">
                      Ticket Status
                    </label>
                    <select   id="ticketNumber"
                      name="ticketNumber"
                      className={
                        formDataError.ticketNumber
                          ? "form-control errorField"
                          : "form-control"
                      }
                      onChange={onChangeHandler}>
                      <option>Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>

                    </select>
                    {/* <input
                      type="text"
                      id="ticketNumber"
                      name="ticketNumber"
                      className={
                        formDataError.ticketNumber
                          ? "form-control errorField"
                          : "form-control"
                      }
                      value={ticketData.ticketNumber}
                      onChange={onChangeHandler}
                    /> */}
                  </div>
                </div>
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="createdAt">
                  Created At
                </label>
                <input
                  type="date"
                  id="createdAt"
                  name="ticketDate"
                  className={
                    formDataError.ticketDate
                      ? "form-control errorField"
                      : "form-control"
                  }
                  value={ticketData.ticketDate}
                  onChange={onChangeHandler}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="ticketDescription">
                  Ticket Description
                </label>
                <textarea
                  className={
                    formDataError.ticketDescription
                      ? "form-control errorField"
                      : "form-control"
                  }
                  id="ticketDescription"
                  rows="4"
                  name="ticketDescription"
                  value={ticketData.ticketDescription}
                  onChange={onChangeHandler}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">
                Create Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
