import { ticketActionTypes } from './ticketActions';
import { extend } from 'lodash';

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
    case ticketActionTypes.destroy.REQUEST:
      return {
        ...state,
        loading: true
      };
    case ticketActionTypes.create.REQUEST:
    case ticketActionTypes.update.REQUEST:
      return {
        ...state,
        ticket: extend(Object.create(state.ticket), {
          subject: payload.subject,
          description: payload.description
        }),
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
