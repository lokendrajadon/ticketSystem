import axios from "axios";
import {
  ADD_TICKET_REQUEST,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  SHOW_TICKET_REQUEST,
  SHOW_TICKET_SUCCESS,
  SHOW_TICKET_FAIL,
} from "../Constants/AddTicketConstants";
let allTickets = JSON.parse(localStorage.getItem("allTickets")) || [];

export const addTicket =
  (
    { ticketName, ticketNumber, ticketDate, ticketDescription },
    setTicketData,
    initialTicketData,
    ticketData
  ) =>
  async (dispatch, getState) => {
    dispatch({
      type: ADD_TICKET_REQUEST,
      loading: true,
    });
    const userSignin = getState().userLoginInfo;
    const { userLoginInfo } = userSignin;

    try {
      const { data } = await axios.post(
        "/user/addTicket",
        { ticketName, ticketNumber, ticketDate, ticketDescription },
        {
          headers: { Authorization: `Bearer ${userLoginInfo.token}` },
        }
      );
      allTickets.push(data.createTicket);
      dispatch({
        type: ADD_TICKET_SUCCESS,
        payload: allTickets,
      });
      setTicketData(initialTicketData);
      localStorage.setItem("allTickets", JSON.stringify(allTickets));
    } catch (error) {
      dispatch({
        type: ADD_TICKET_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getTickets = () => async (dispatch, getState) => {
  dispatch({
    type: SHOW_TICKET_REQUEST,
    loading: true,
  });

  const userSignin = getState().userLoginInfo;
  const { userLoginInfo } = userSignin;

  try {
    const { data } = await axios.get("/user/tickets", {
      headers: { Authorization: `Bearer ${userLoginInfo.token}` },
    });

    dispatch({
      type: SHOW_TICKET_SUCCESS,
      payload: data.allTickets,
    });

    localStorage.setItem("allTickets", JSON.stringify(data.allTickets));
  } catch (error) {
    dispatch({
      type: SHOW_TICKET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
