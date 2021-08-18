import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TicketModal from "../../Components/TicketModal";
import { addTicket, getTickets } from "../../Actions/AddTicketActions";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { ticketValidation } from "../../Utils/Validation";

const Home = (props) => {
  const initialTicketData = {
    ticketName: "",
    ticketNumber: "",
    ticketDate: "",
    ticketDescription: "",
  };
  const [ticketData, setTicketData] = useState(initialTicketData);
  const [formDataError, setFormDataError] = useState({});

  const userLoginInfo = useSelector((state) => state.userLoginInfo);

  const onChangeHandler = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setFormDataError(ticketValidation(ticketData));

    if (
      !ticketValidation(ticketData).ticketName &&
      !ticketValidation(ticketData).ticketNumber &&
      !ticketValidation(ticketData).ticketDate &&
      !ticketValidation(ticketData).ticketDescription
    ) {
      dispatch(
        addTicket(ticketData, setTicketData, initialTicketData, ticketData)
      );
    }
  };

  const getAllTicketsData = useSelector((state) => state.addedTickets);
  const { allTickets, loading, error } = getAllTicketsData;

  useEffect(() => {
    if (!userLoginInfo) {
      props.history.push("/login");
    }
    dispatch(getTickets());
  }, [dispatch, props.history, userLoginInfo]);

  const [open, setOpen] = useState(false);
  return (
    <Container>
      <Row>
        <Col className="text-center mt-5 mb-2">
          <Button
            variant="info"
            onClick={() => setOpen(!open)}
            className="btn btn-default btn-rounded mb-4"
            data-toggle="modal"
            data-target="#modalLoginForm"
            style={{ fontSize: "2rem", padding: "10px 30px" }}
          >
            Add New Ticket
          </Button>
          {/* </Link> */}
        </Col>
      </Row>
      <Row>
        <Col className="text-center  mb-2">
          <div>Total tickets: {allTickets ? allTickets.length : ""}</div>
        </Col>
      </Row>
      <Row>
        <Col className="mt-2">Recently Added tickets</Col>
      </Row>

      <hr />

      <Row>
        <Col className="recent-ticket">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Ticket Status</th>
                <th>Ticket Name</th>
                <th>Ticket Description</th>
                <th>Ticket Created Date</th>
              </tr>
            </thead>
            <tbody>
              {allTickets ? (
                allTickets
                  .slice(0)
                  .reverse()
                  .map(
                    (row, index) =>
                      index < 5 && (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {/* <Link to={`/ticket/${row._id}`}>{row.subject}</Link>  */}
                            {row.isActive === 1 ? "Active" : "Inactive"}
                          </td>
                          <td>{row.ticketName}</td>
                          <td>{row.ticketDescription}</td>

                          <td>{row.createdDate}</td>
                        </tr>
                      )
                  )
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No ticket show{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <TicketModal
        onChangeHandler={onChangeHandler}
        ticketData={ticketData}
        onSubmitHandler={onSubmitHandler}
        formDataError={formDataError}
        loading={loading}
        error={error}
      />
    </Container>
  );
};

export default Home;
