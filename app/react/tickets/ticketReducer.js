import { ticketActionTypes } from './ticketActions';

const initialState = {
  tickets: [],
  ticket: null,
  error: null,
  loading: false
};

export default (state = initialState, { type, payload }) => {
  const tickets = state.tickets;

  switch (type) {
    case ticketActionTypes.list.REQUEST:
    case ticketActionTypes.item.REQUEST:
    case ticketActionTypes.create.REQUEST:
    case ticketActionTypes.update.REQUEST:
    case ticketActionTypes.destroy.REQUEST:
      return {
        ...state,
        loading: true
      };

    case ticketActionTypes.list.SUCCESS:
      return {
        ...state,
        tickets: payload,
        error: null,
        loading: false
      };

    case ticketActionTypes.list.FAILURE:
      return {
        ...state,
        tickets: [],
        error: payload,
        loading: false
      };

    case ticketActionTypes.item.SUCCESS:
      return {
        ...state,
        ticket: payload,
        error: null,
        loading: false
      };

    case ticketActionTypes.item.FAILURE:
      return {
        ...state,
        ticket: null,
        error: payload,
        loading: false
      };

    case ticketActionTypes.create.SUCCESS:
    case ticketActionTypes.update.SUCCESS:
      return {
        ...state,
        ticket: payload,
        error: null,
        loading: false
      };

    case ticketActionTypes.create.FAILURE:
    case ticketActionTypes.update.FAILURE:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case ticketActionTypes.destroy.SUCCESS:
      return {
        ...state,
        tickets: tickets.filter(ticket => ticket.id !== payload.id),
        error: null,
        loading: false
      };

    case ticketActionTypes.destroy.FAILURE:
      return {
        ...state,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};
