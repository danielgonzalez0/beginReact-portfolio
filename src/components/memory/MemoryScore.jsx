import React from 'react';
import { useMemoryContext } from './MemoryProvider';

const MemoryScore = () => {
  const { score, isFinished } = useMemoryContext();

  if (isFinished) return <p>You <strong>finished</strong> the memory in {score} times !</p>;

  return (
    <p>
      You try {`${score} time${score > 1 ? 's' : ''}`}

    </p>
  );
};

export default MemoryScore;