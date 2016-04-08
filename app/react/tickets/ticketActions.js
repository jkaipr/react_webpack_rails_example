import { createAction } from 'redux-actions';
import createRequestActionTypes from '../app/factories/createRequestActionTypes';

export const ticketActionTypes = {
  list: createRequestActionTypes('TICKETS'),
  item: createRequestActionTypes('SHOW_TICKET'),
  create: createRequestActionTypes('CREATE_TICKET'),
  update: createRequestActionTypes('UPDATE_TICKET'),
  destroy: createRequestActionTypes('DESTROY_TICKET')
};

export default {
  list: {
    request: createAction(ticketActionTypes.list.REQUEST),
    success: createAction(ticketActionTypes.list.SUCCESS),
    failure: createAction(ticketActionTypes.list.FAILURE)
  },
  item: {
    request: createAction(ticketActionTypes.item.REQUEST),
    success: createAction(ticketActionTypes.item.SUCCESS),
    failure: createAction(ticketActionTypes.item.FAILURE)
  },
  create: {
    request: createAction(ticketActionTypes.create.REQUEST),
    success: createAction(ticketActionTypes.create.SUCCESS),
    failure: createAction(ticketActionTypes.create.FAILURE)
  },
  update: {
    request: createAction(ticketActionTypes.update.REQUEST),
    success: createAction(ticketActionTypes.update.SUCCESS),
    failure: createAction(ticketActionTypes.update.FAILURE)
  },
  destroy: {
    request: createAction(ticketActionTypes.destroy.REQUEST),
    success: createAction(ticketActionTypes.destroy.SUCCESS),
    failure: createAction(ticketActionTypes.destroy.FAILURE)
  }
};
