import { createAction } from 'redux-actions';
import createRequestActionTypes from '../app/factories/createRequestActionTypes';

export const commentActionTypes = {
  list: createRequestActionTypes('COMMENTS'),
  comment: createRequestActionTypes('NEW_COMMENT')
};

export default {
  list: {
    request: createAction(commentActionTypes.list.REQUEST),
    success: createAction(commentActionTypes.list.SUCCESS),
    failure: createAction(commentActionTypes.list.FAILURE)
  },
  comment: {
    request: createAction(commentActionTypes.comment.REQUEST),
    success: createAction(commentActionTypes.comment.SUCCESS),
    failure: createAction(commentActionTypes.comment.FAILURE)
  }
};
