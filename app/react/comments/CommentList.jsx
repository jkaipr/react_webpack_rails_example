import React, { PropTypes } from 'react';

import Loading from './../app/Loading';
import Comment from './Comment';

const CommentList = ({ comments, loading }) => {
  if (loading || !comments) {
    return <Loading />;
  }

  let idx = 0;
  return (
    <div className="comment-list">
      <h3>Comments</h3>
      {comments.map((comment) => <Comment key={idx++} {...comment} />)}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array,
  loading: PropTypes.bool.isRequired
};

export default CommentList;
