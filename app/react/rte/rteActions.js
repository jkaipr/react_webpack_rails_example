import { createAction } from 'redux-actions';

const CLEAR_RTE = 'CLEAR_RTE';
const INIT_RTE = 'INIT_RTE';
const UPDATE_RTE = 'UPDATE_RTE';

export const rteActionTypes = {
  clear: { CLEAR_RTE: 'CLEAR_EDITOR_VALUE' },
  initialize: { INIT_RTE: 'INIT_EDITOR_VALUE' },
  update: { UPDATE_RTE: 'UPDATE_EDITOR_VALUE' }
};

export default {
  clear: createAction(rteActionTypes.clear.CLEAR_RTE),
  initialize: createAction(rteActionTypes.initialize.INIT_RTE),
  update: createAction(rteActionTypes.update.UPDATE_RTE)
}
