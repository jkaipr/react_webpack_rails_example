import ticketReducer from './ticketReducer';
import { ticketActionTypes } from './ticketActions';

describe('ticket reducer', () => {
  const initialState = {
    id: null,
    error: null,
    tickets: [],
    ticket: null,
    loading: false
  };

  it('should return its initial state', () => {
    expect(
      ticketReducer(undefined, { type: 'foo' })
    ).to.deep.equal(initialState);
  });

  it('should handle the ticketActionTypes.list.SUCCESS action', () => {
    expect(
      ticketReducer(undefined, { type: ticketActionTypes.list.SUCCESS, payload: [{ id: 1 }] })
    ).to.deep.equal({
      id: null,
      error: null,
      ticket: null,
      tickets: [{ id: 1 }],
      loading: false
    });
  });

  it('should handle the ticketActionTypes.list.FAILURE action', () => {
    const error = new Error('It broke!');
    expect(
      ticketReducer(undefined, {
        type: ticketActionTypes.list.FAILURE,
        payload: error,
        error: true
      })
    ).to.deep.equal({
      error,
      id: null,
      ticket: null,
      tickets: [],
      loading: false
    });
  });

  it('should handle the ticketActionTypes.item.SUCCESS action', () => {
    expect(
      ticketReducer(undefined, { type: ticketActionTypes.item.SUCCESS, payload: { id: 1 } })
    ).to.deep.equal({
      id: null,
      error: null,
      ticket: { id: 1 },
      tickets: [],
      loading: false
    });
  });

  it('should handle the ticketActionTypes.item.FAILURE action', () => {
    const error = new Error('It broke!');
    expect(
      ticketReducer(undefined, {
        type: ticketActionTypes.item.FAILURE,
        payload: error,
        error: true
      })
    ).to.deep.equal({
      error,
      id: null,
      ticket: null,
      tickets: [],
      loading: false
    });
  });

  it('should handle the ticketActionTypes.create.SUCCESS action', () => {
    expect(
      ticketReducer(undefined, { type: ticketActionTypes.create.SUCCESS, payload: { id: 1 } })
    ).to.deep.equal({
      id: null,
      error: null,
      ticket: { id: 1 },
      tickets: [],
      loading: false
    });
  });

  it('should handle the ticketActionTypes.create.FAILURE action', () => {
    const error = new Error('It broke!');
    expect(
      ticketReducer(undefined, {
        type: ticketActionTypes.create.FAILURE,
        payload: error,
        error: true
      })
    ).to.deep.equal({
      error,
      id: null,
      ticket: null,
      tickets: [],
      loading: false
    });
  });

  it('should handle the ticketActionTypes.update.SUCCESS action', () => {
    expect(
      ticketReducer(undefined, { type: ticketActionTypes.update.SUCCESS, payload: { id: 1 } })
    ).to.deep.equal({
      id: null,
      error: null,
      ticket: { id: 1 },
      tickets: [],
      loading: false
    });
  });

  it('should handle the ticketActionTypes.update.FAILURE action', () => {
    const error = new Error('It broke!');
    expect(
      ticketReducer(undefined, {
        type: ticketActionTypes.update.FAILURE,
        payload: error,
        error: true
      })
    ).to.deep.equal({
      error,
      id: null,
      ticket: null,
      tickets: [],
      loading: false
    });
  });

  it('should handle the ticketActionTypes.destroy.SUCCESS action', () => {
    initialState.tickets = [{ id: 1 }];
    expect(
      ticketReducer(initialState, {
        type: ticketActionTypes.destroy.SUCCESS,
        payload: { id: 1 }
      })
    ).to.deep.equal({
      id: null,
      error: null,
      ticket: null,
      tickets: [{ id: 1 }],
      loading: false
    });
  });

  it('should handle the ticketActionTypes.destroy.FAILURE action', () => {
    const error = new Error('It broke!');
    expect(
      ticketReducer(undefined, {
        type: ticketActionTypes.destroy.FAILURE,
        payload: error,
        error: true
      })
    ).to.deep.equal({
      error,
      id: null,
      ticket: null,
      tickets: [],
      loading: false
    });
  });
});
