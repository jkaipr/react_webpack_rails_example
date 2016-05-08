import { rteActionTypes } from './rteActions';
import { createEmptyValue } from 'react-rte';

const initialState = {
  value: createEmptyValue(),
  initialized: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case rteActionTypes.clear.CLEAR_RTE:
      return {
        ...state,
        value: createEmptyValue(),
        initialized: false
      };

    case rteActionTypes.initialize.INIT_RTE:
      return {
        ...state,
        value: payload,
        initialized: true
      };

    case rteActionTypes.update.UPDATE_RTE:
      return {
        ...state,
        value: payload
      };

    default:
      return state;
  }
}
