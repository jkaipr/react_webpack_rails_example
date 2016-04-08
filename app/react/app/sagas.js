import { fork } from 'redux-saga/effects';
import authSagas from '../auth/authSagas';
import commentSagas from '../comments/commentSagas';
import ticketSagas from '../tickets/ticketSagas';

export default function* (getState) {
  yield fork(authSagas, getState);
  yield fork(commentSagas, getState);
  yield fork(ticketSagas, getState);
}
