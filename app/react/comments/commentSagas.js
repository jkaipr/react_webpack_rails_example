import { routerActions } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import commentActions, { commentActionTypes } from './commentActions';
import {
  fetchComments as fetchCommentsApi,
  fetchNewComment as fetchNewCommentAPI
} from './commentApi';

//import { loadListFactory } from '../app/factories/sagas';
//export const loadComments = (fetchComments, jwtAccessor) =>
//  loadListFactory(commentActionTypes, commentActions, fetchComments, jwtAccessor);

export const loadComments = (fetchComments, getState) => function* fetchCommentsSaga() {
  const state = getState();
  const {
    error,
    comments
    } = yield call(fetchComments, state.tickets.ticket, state.auth.token);

  if (error) {
    yield put(commentActions.list.failure(error));
  } else {
    yield put(commentActions.list.success(comments));
  }
};

export const newComment = (fetchNewComment, getState) => function* newCommentSaga() {
  const state = getState();
  const {
    error,
    comment
    } = yield call(fetchNewComment, state.comments.comment, state.auth.token);

  if (error) {
    yield put(commentActions.comment.failure(error));
  } else {
    yield put(commentActions.comment.success(comment));
    yield put(routerActions.push(`/tickets/${comment.ticket_id}`));
  }
};

const sagas = function* sagas(getState) {
  yield [
    takeLatest(commentActionTypes.list.REQUEST, loadComments(fetchCommentsApi, getState)),
    takeLatest(commentActionTypes.comment.REQUEST, newComment(fetchNewCommentAPI, getState))
  ];
};

export default sagas;
