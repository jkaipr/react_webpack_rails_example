import { commentActionTypes } from './commentActions';

const initialState = {
  ticketComments: [],
  comment: null,
  error: null,
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case commentActionTypes.list.REQUEST:
    case commentActionTypes.comment.REQUEST:
      return {
        ...state,
        loading: true
      };

    case commentActionTypes.list.SUCCESS:
      return {
        ...state,
        ticketComments: payload,
        error: null,
        loading: false
      };

    case commentActionTypes.list.FAILURE:
      return {
        ...state,
        ticketComments: [],
        error: payload,
        loading: false
      };

    case commentActionTypes.comment.SUCCESS:
      return {
        ...state,
        comment: payload,
        error: null,
        loading: false
      };

    case commentActionTypes.comment.FAILURE:
      return {
        ...state,
        comment: null,
        error: payload,
        loading: false
      };

    default:
      return state;
  }
};
