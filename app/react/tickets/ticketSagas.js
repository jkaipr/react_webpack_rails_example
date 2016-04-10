import { routerActions } from 'react-router-redux';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import ticketActions, { ticketActionTypes } from './ticketActions';
import {
  fetchTicket as fetchTicketApi,
  fetchTickets as fetchTicketsApi,
  createTicket as createTicketAPI,
  updateTicket as updateTicketAPI,
  destroyTicket as destroyTicketAPI
} from './ticketApi';
import { loadListFactory, loadItemFactory } from '../app/factories/sagas';

export const loadTickets = (fetchTickets, jwtAccessor) =>
  loadListFactory(ticketActionTypes, ticketActions, fetchTickets, jwtAccessor);

export const loadTicket = (fetchTicket, jwtAccessor) =>
  loadItemFactory(ticketActionTypes, ticketActions, fetchTicket, jwtAccessor);

export const createTicket = (ticketCreate, getState) => function* createTicketSaga() {
  const state = getState();
  const {
    error,
    ticket
    } = yield call(ticketCreate, state.ticket.ticket, state.auth.token);

  if (error) {
    yield put(ticketActions.create.failure(error));
  } else {
    yield put(ticketActions.create.success(ticket));
    yield put(routerActions.push(`/tickets/${ticket.id}`));
  }
};

export const updateTicket = (ticketUpdate, getState) => function* updateTicketSaga() {
  const state = getState();
  const {
    error,
    ticket
    } = yield call(ticketUpdate, state.ticket.ticket, state.auth.token);

  if (error) {
    yield put(ticketActions.update.failure(error));
  } else {
    yield put(ticketActions.update.success(state.ticket.ticket));
    yield put(routerActions.push(`/tickets/${ticket.id}`));
  }
};

export const destroyTicket = (ticketDestroy, getState) => function* destroyTicketSaga() {
  const state = getState();
  const {
    error,
    success
    } = yield call(ticketDestroy, state.ticket.ticket, state.auth.token);

  if (error) {
    yield put(ticketActions.destroy.failure(error));
  } else {
    yield put(ticketActions.destroy.success(success));
    yield put(routerActions.push('/tickets'));
  }
};

const sagas = function* sagas(getState) {
  const jwtAccessor = () => getState().auth.token;
  yield [
    takeLatest(ticketActionTypes.list.REQUEST, loadTickets(fetchTicketsApi, jwtAccessor)),
    takeLatest(ticketActionTypes.item.REQUEST, loadTicket(fetchTicketApi, jwtAccessor)),
    takeLatest(ticketActionTypes.create.REQUEST, createTicket(createTicketAPI, getState)),
    takeLatest(ticketActionTypes.update.REQUEST, updateTicket(updateTicketAPI, getState)),
    takeLatest(ticketActionTypes.destroy.REQUEST, destroyTicket(destroyTicketAPI, getState))
  ];
};

export default sagas;
