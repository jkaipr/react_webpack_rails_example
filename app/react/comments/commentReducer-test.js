import commentReducer from './commentReducer';
import { commentActionTypes } from './commentActions';

describe('comment reducer', () => {
  const initialState = {
    error: null,
    ticketComments: [],
    comment: null,
    loading: false
  };

  it('should return its initial state', () => {
    expect(
      commentReducer(undefined, { type: 'foo' })
    ).to.deep.equal(initialState);
  });

  it('should handle the commentActionTypes.list.SUCCESS action', () => {
    expect(
      commentReducer(initialState, { type: commentActionTypes.list.SUCCESS, payload: [{ id: 1 }] })
    ).to.deep.equal({
      error: null,
      comment: null,
      ticketComments: [{ id: 1 }],
      loading: false
    });
  });

  it('should handle the commentActionTypes.list.FAILURE action', () => {
    const error = new Error('It broke!');
    expect(
      commentReducer(undefined, {
        type: commentActionTypes.list.FAILURE,
        payload: error,
        error: true
      })
    ).to.deep.equal({
      error,
      comment: null,
      ticketComments: [],
      loading: false
    });
  });

  it('should handle the commentActionTypes.comment.SUCCESS action', () => {
    expect(
      commentReducer(undefined, { type: commentActionTypes.comment.SUCCESS, payload: { id: 1 } })
    ).to.deep.equal({
      error: null,
      comment: { id: 1 },
      ticketComments: [],
      loading: false
    });
  });

  it('should handle the commentActionTypes.comment.FAILURE action', () => {
    const error = new Error('It broke!');
    expect(
      commentReducer(undefined, {
        type: commentActionTypes.comment.FAILURE,
        payload: error,
        error: true
      })
    ).to.deep.equal({
      error,
      comment: null,
      ticketComments: [],
      loading: false
    });
  });
});
