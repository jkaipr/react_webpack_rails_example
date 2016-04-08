import 'babel-polyfill';

import { call, put } from 'redux-saga/effects';

import commentActions from './commentActions';

import {
  loadComments as loadCommentsSagaFactory,
  newComment as newCommentSagaFactory
} from './commentSagas';

describe('commentSagas', () => {
  describe('loadComments', () => {
    const fetchComments = sinon.spy();
    const getState = sinon.stub().returns({
      auth: { token: 'blublu' },
      tickets: {
        ticket: {
          id: 3
        }
      }
    });
    const loadCommentsSaga = loadCommentsSagaFactory(fetchComments, getState);

    it('should call the fetchComments function', () => {
      const saga = loadCommentsSaga(commentActions.list.request());

      expect(saga.next().value).to.deep.equal(call(fetchComments, getState().tickets.ticket, 'blublu')); // eslint-disable-line max-len
    });

    it('should put the commentActions.list.success action with comments on successful fetch', () => { // eslint-disable-line max-len
      const saga = loadCommentsSaga(commentActions.list.request());

      saga.next();

      const nextValue = saga.next([]).value;
      const listCommentsPut = put(commentActions.list.success(), getState().tickets.ticket, 'blublu'); // eslint-disable-line max-len
      expect(nextValue).to.deep.equal(listCommentsPut);
    });

    it('should put the commentActions.list.failure action with error on failed fetch', () => {
      const saga = loadCommentsSaga(commentActions.list.request());
      const error = new Error('Saga error expected.');

      saga.next();

      expect(saga.next({
        error
      }).value).to.deep.equal(put(commentActions.list.failure(error)));
    });
  });

  describe('newComment', () => {
    const newComment = sinon.spy();
    const getState = sinon.stub().returns({
      auth: { token: 'blublu' },
      comments: {
        comment: {
          user_id: 1,
          text: 'Comment text'
        }
      }
    });
    const newCommentSaga = newCommentSagaFactory(newComment, getState);

    it('should call the newComment function', () => {
      const saga = newCommentSaga(commentActions.comment.request());

      expect(saga.next().value).to.deep.equal(call(newComment, {
        user_id: 1,
        text: 'Comment text'
      }, 'blublu'));
    });

    it('should put the commentActions.comment.success action with comment on successful fetch', () => { // eslint-disable-line max-len
      const saga = newCommentSaga(commentActions.comment.request());

      saga.next();

      const nextValue = saga.next({
        comment: {
          id: 42,
          text: 'text'
        }
      }).value;
      const listCommentsPut = put(commentActions.comment.success({
        id: 42,
        text: 'text'
      }));
      expect(nextValue).to.deep.equal(listCommentsPut);
    });

    it('should put the commentActions.comment.failure action with error on failed fetch', () => {
      const saga = newCommentSaga(commentActions.comment.request());
      const error = new Error('Saga error expected.');

      saga.next();

      expect(saga.next({
        error
      }).value).to.deep.equal(put(commentActions.comment.failure(error)));
    });
  });

});
