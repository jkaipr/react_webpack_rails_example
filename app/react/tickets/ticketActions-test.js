import ticketActions, { ticketActionTypes } from './ticketActions';

describe('ticketActions', () => {
  it('ticketActions.list.request should return the correct action', () => {
    expect(ticketActions.list.request()).to.deep.equal({
      type: ticketActionTypes.list.REQUEST,
      payload: undefined
    });
  });

  it('ticketActions.list.success should return the correct action', () => {
    expect(ticketActions.list.success([{ id: 1 }])).to.deep.equal({
      type: ticketActionTypes.list.SUCCESS,
      payload: [{ id: 1 }]
    });
  });

  it('ticketActions.list.failure should return the correct action', () => {
    const error = new Error('It broke !');
    expect(ticketActions.list.failure(error)).to.deep.equal({
      type: ticketActionTypes.list.FAILURE,
      payload: error,
      error: true
    });
  });

  it('ticketActions.item.request should return the correct action', () => {
    expect(ticketActions.item.request()).to.deep.equal({
      type: ticketActionTypes.item.REQUEST,
      payload: undefined
    });
  });

  it('ticketActions.item.success should return the correct action', () => {
    expect(ticketActions.item.success({ id: 1 })).to.deep.equal({
      type: ticketActionTypes.item.SUCCESS,
      payload: { id: 1 }
    });
  });

  it('ticketActions.item.failure should return the correct action', () => {
    const error = new Error('It broke !');
    expect(ticketActions.item.failure(error)).to.deep.equal({
      type: ticketActionTypes.item.FAILURE,
      payload: error,
      error: true
    });
  });

  it('ticketActions.create.request should return the correct action', () => {
    expect(ticketActions.create.request()).to.deep.equal({
      type: ticketActionTypes.create.REQUEST,
      payload: undefined
    });
  });

  it('ticketActions.create.success should return the correct action', () => {
    expect(ticketActions.create.success({ id: 1 })).to.deep.equal({
      type: ticketActionTypes.create.SUCCESS,
      payload: { id: 1 }
    });
  });

  it('ticketActions.create.failure should return the correct action', () => {
    const error = new Error('It broke !');
    expect(ticketActions.create.failure(error)).to.deep.equal({
      type: ticketActionTypes.create.FAILURE,
      payload: error,
      error: true
    });
  });

  it('ticketActions.update.request should return the correct action', () => {
    expect(ticketActions.update.request()).to.deep.equal({
      type: ticketActionTypes.update.REQUEST,
      payload: undefined
    });
  });

  it('ticketActions.update.success should return the correct action', () => {
    expect(ticketActions.update.success({ id: 1 })).to.deep.equal({
      type: ticketActionTypes.update.SUCCESS,
      payload: { id: 1 }
    });
  });

  it('ticketActions.update.failure should return the correct action', () => {
    const error = new Error('It broke !');
    expect(ticketActions.update.failure(error)).to.deep.equal({
      type: ticketActionTypes.update.FAILURE,
      payload: error,
      error: true
    });
  });

  it('ticketActions.destroy.request should return the correct action', () => {
    expect(ticketActions.destroy.request()).to.deep.equal({
      type: ticketActionTypes.destroy.REQUEST,
      payload: undefined
    });
  });

  it('ticketActions.destroy.success should return the correct action', () => {
    expect(ticketActions.destroy.success({ id: 1 })).to.deep.equal({
      type: ticketActionTypes.destroy.SUCCESS,
      payload: { id: 1 }
    });
  });

  it('ticketActions.update.failure should return the correct action', () => {
    const error = new Error('It broke !');
    expect(ticketActions.destroy.failure(error)).to.deep.equal({
      type: ticketActionTypes.destroy.FAILURE,
      payload: error,
      error: true
    });
  });
});
