import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { getTickets } from "../../Actions/AddTicketActions";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";

const Ticket = (props) => {
  const dispatch = useDispatch();

  const getAllTicketsData = useSelector((state) => state.addedTickets);
  const { allTickets } = getAllTicketsData;
  const userLoginInfo = useSelector((state) => state.userLoginInfo);

  useEffect(() => {
    if (!userLoginInfo) {
      props.history.push("/login");
    }
    dispatch(getTickets());
  }, [props.history, dispatch, userLoginInfo]);

  const columns = [
    {
      name: "#",
      selector: (allTickets) => allTickets._id,
      sortable: true,
    },
    {
      name: "Ticket Name",
      selector: (allTickets) => allTickets.ticketName,
      sortable: true,
    },
    {
      name: "Ticket Status",
      selector: (allTickets) =>
        allTickets.isActive === 1 ? "Active" : "Inactive",
      sortable: true,
      right: true,
    },
    {
      name: "Created Date",
      selector: (allTickets) => allTickets.createdDate,
      sortable: true,
      right: true,
    },
    {
      name: "Ticket Description",
      selector: (allTickets) => allTickets.ticketDescription,
      sortable: true,
      right: true,
    },
  ];

  return (
    <Container>
      <DataTable
        title="Tickets"
        columns={columns}
        data={allTickets}
        defaultSortField="title"
        pagination
      />
      {}
    </Container>
  );
};

export default Ticket;
