import { menuActionTypes } from './menuActions';

const initialState = {
  showMenu: false,
  error: null,
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case menuActionTypes.hide.REQUEST:
      return {
        ...state,
        showMenu: false,
        error: null,
        loading: false
      };

    //case menuActionTypes.hide.SUCCESS:
    //  return {
    //    ...state,
    //    showMenu: false,
    //    error: null,
    //    loading: false
    //  };

    default:
      return state;
  }
};
