import {
  ADD_TICKET_REQUEST,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  SHOW_TICKET_REQUEST,
  SHOW_TICKET_SUCCESS,
  SHOW_TICKET_FAIL,
} from "../Constants/AddTicketConstants";

export const createTickets = (
  state = { loading: false, allTickets: [] },
  action
) => {
  switch (action.type) {
    case ADD_TICKET_REQUEST:
      return {
        loading: true,
      };
    case ADD_TICKET_SUCCESS:
      return {
        loading: false,
        allTickets: action.payload,
      };
    case ADD_TICKET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case SHOW_TICKET_REQUEST:
      return {
        loading: true,
      };
    case SHOW_TICKET_SUCCESS:
      return {
        loading: false,
        allTickets: action.payload,
      };
    case SHOW_TICKET_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
