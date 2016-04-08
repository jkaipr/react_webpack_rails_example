import commentActions, { commentActionTypes } from './commentActions';

describe('commentAction', () => {
  it('commentAction.list.request should return the correct action', () => {
    expect(commentActions.list.request()).to.deep.equal({
      type: commentActionTypes.list.REQUEST,
      payload: undefined
    });
  });

  it('commentAction.list.success should return the correct action', () => {
    expect(commentActions.list.success([{ id: 1 }])).to.deep.equal({
      type: commentActionTypes.list.SUCCESS,
      payload: [{ id: 1 }]
    });
  });

  it('commentAction.list.failure should return the correct action', () => {
    const error = new Error('It broke !');
    expect(commentActions.list.failure(error)).to.deep.equal({
      type: commentActionTypes.list.FAILURE,
      payload: error,
      error: true
    });
  });

  it('commentAction.comment.request should return the correct action', () => {
    expect(commentActions.comment.request()).to.deep.equal({
      type: commentActionTypes.comment.REQUEST,
      payload: undefined
    });
  });

  it('commentAction.comment.success should return the correct action', () => {
    expect(commentActions.comment.success({ id: 1 })).to.deep.equal({
      type: commentActionTypes.comment.SUCCESS,
      payload: { id: 1 }
    });
  });

  it('commentAction.comment.failure should return the correct action', () => {
    const error = new Error('It broke !');
    expect(commentActions.comment.failure(error)).to.deep.equal({
      type: commentActionTypes.comment.FAILURE,
      payload: error,
      error: true
    });
  });
});
