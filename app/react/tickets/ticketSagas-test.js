import 'babel-polyfill';

import { call, put } from 'redux-saga/effects';

import ticketActions from './ticketActions';

import {
  loadTicket as loadTicketSagaFactory,
  loadTickets as loadTicketsSagaFactory,
  createTicket as createTicketSagaFactory,
  updateTicket as updateTicketSagaFactory,
  destroyTicket as destroyTicketSagaFactory
} from './ticketSagas';

describe('ticketSagas', () => {
  describe('loadTickets', () => {
    const fetchTickets = sinon.spy();
    const loadTicketsSaga = loadTicketsSagaFactory(fetchTickets);

    it('should call the fetchTickets function', () => {
      const saga = loadTicketsSaga(ticketActions.list.request());

      expect(saga.next().value).to.deep.equal(call(fetchTickets, undefined));
    });

    it('should put the ticketActions.list.success action with tickets on successful fetch', () => { // eslint-disable-line max-len
      const saga = loadTicketsSaga(ticketActions.list.request());

      saga.next();

      expect(saga.next({
        list: [{
          id: 42
        }]
      }).value).to.deep.equal(put(ticketActions.list.success([{
        id: 42
      }])));
    });

    it('should put the ticketActions.list.failure action with error on failed fetch', () => {
      const saga = loadTicketsSaga(ticketActions.list.request());
      const error = new Error('Saga error expected.');

      saga.next();

      expect(saga.next({
        error
      }).value).to.deep.equal(put(ticketActions.list.failure(error)));
    });
  });

  describe('loadTicket', () => {
    const fetchTicket = sinon.spy();
    const loadTicketSaga = loadTicketSagaFactory(fetchTicket);

    it('should call the fetchTicket function', () => {
      const saga = loadTicketSaga(ticketActions.item.request('id'));

      expect(saga.next().value).to
        .deep.equal(call(fetchTicket, 'id', undefined));
    });

    it('should put the ticketActions.item.success action with ticket on successful fetch', () => { // eslint-disable-line max-len
      const saga = loadTicketSaga(ticketActions.item.request('id'));

      saga.next();

      expect(saga.next({
        item: {
          id: 42
        }
      }).value).to.deep.equal(put(ticketActions.item.success({
        id: 42
      })));
    });

    it('should put the ticketActions.item.failure action with error on failed fetch', () => {
      const saga = loadTicketSaga(ticketActions.item.request());
      const error = new Error('Saga error expected.');

      saga.next();
      expect(saga.next({
        error
      }).value).to.deep.equal(put(ticketActions.item.failure(error)));
    });
  });

  describe('createTicket', () => {
    const createTicket = sinon.spy();
    const getState = sinon.stub().returns({
      auth: { token: 'blublu' },
      tickets: {
        ticket: {
          user_id: 1,
          subject: 'Subject',
          description: 'Description'
        }
      }
    });
    const createTicketSaga = createTicketSagaFactory(createTicket, getState);

    it('should call the createTicket function', () => {
      const saga = createTicketSaga(ticketActions.create.request());

      expect(saga.next().value).to.deep.equal(call(createTicket, {
        user_id: 1,
        subject: 'Subject',
        description: 'Description'
      }, 'blublu'));
    });

    it('should put the ticketActions.create.success action with ticket on successful fetch', () => { // eslint-disable-line max-len
      const saga = createTicketSaga(ticketActions.create.request());

      saga.next();

      expect(saga.next({
        ticket: {
          id: 42
        }
      }).value).to.deep.equal(put(ticketActions.create.success({
        id: 42
      })));
    });

    it('should put the ticketActions.create.failure action with error on failed fetch', () => {
      const saga = createTicketSaga(ticketActions.create.request());
      const error = new Error('Saga error expected.');

      saga.next();
      expect(saga.next({
        error
      }).value).to.deep.equal(put(ticketActions.create.failure(error)));
    });
  });

  describe('updateTicket', () => {
    const updateTicket = sinon.spy();
    const getState = sinon.stub().returns({
      auth: { token: 'blublu' },
      tickets: {
        ticket: {
          user_id: 1,
          subject: 'Subject',
          description: 'Description'
        }
      }
    });
    const updateTicketSaga = updateTicketSagaFactory(updateTicket, getState);

    it('should call the updateTicket function', () => {
      const saga = updateTicketSaga(ticketActions.update.request());

      expect(saga.next().value).to.deep.equal(call(updateTicket, {
        user_id: 1,
        subject: 'Subject',
        description: 'Description'
      }, 'blublu'));
    });

    it('should put the ticketActions.update.success action with ticket on successful fetch', () => { // eslint-disable-line max-len
      const saga = updateTicketSaga(ticketActions.update.request());

      saga.next();

      expect(saga.next({
        ticket: {
          id: 42
        }
      }).value).to.deep.equal(put(ticketActions.update.success({
        id: 42
      })));
    });

    it('should put the ticketActions.update.failure action with error on failed fetch', () => {
      const saga = updateTicketSaga(ticketActions.update.request());
      const error = new Error('Saga error expected.');

      saga.next();
      expect(saga.next({
        error
      }).value).to.deep.equal(put(ticketActions.update.failure(error)));
    });
  });

  describe('destroyTicket', () => {
    const destroyTicket = sinon.spy();
    const getState = sinon.stub().returns({
      auth: { token: 'blublu' },
      tickets: {
        ticket: {
          user_id: 1,
          subject: 'Subject',
          description: 'Description'
        },
        tickets: [{ id: 1 }]
      }
    });
    const destroyTicketSaga = destroyTicketSagaFactory(destroyTicket, getState);

    it('should call the destroyTicket function', () => {
      const saga = destroyTicketSaga(ticketActions.destroy.request());

      const nextValue = saga.next().value;
      const destroyTicketCall = call(destroyTicket, getState().tickets.ticket, 'blublu');
      expect(nextValue).to.deep.equal(destroyTicketCall);
    });

    it('should put the ticketActions.destroy.success action on successful fetch', () => { // eslint-disable-line max-len
      const saga = destroyTicketSaga(ticketActions.destroy.request());

      const nextValue = saga.next().value;
      const destroyTicketPut = put(ticketActions.destroy.success(getState().tickets.ticket));

      expect(nextValue.CALL.args[0]).to.deep.equal(destroyTicketPut.PUT.payload);
    });

    it('should put the ticketActions.destroy.failure action with error on failed fetch', () => {
      const saga = destroyTicketSaga(ticketActions.destroy.request());
      const error = new Error('Saga error expected.');

      saga.next();
      expect(saga.next({
        error
      }).value).to.deep.equal(put(ticketActions.destroy.failure(error)));
    });
  });
});
