import React from 'react';

const CommentError = ({error}) => {

if(!error) return null;

  return (
    <p className='text-xs text-red-600'>
      {error}
    </p>
  );
};

export default CommentError;