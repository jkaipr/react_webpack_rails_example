import { menuActionTypes } from './menuActions';

const initialState = {
  showMenu: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case menuActionTypes.hide.REQUEST:
      return {
        ...state,
        showMenu: false
      };

    case menuActionTypes.show.REQUEST:
      return {
        ...state,
        showMenu: true
      };

    default:
      return state;
  }
};
