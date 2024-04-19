import React from 'react';
import { Button } from '../atom/Button';
import { useMemoryContext } from './MemoryProvider';

const MemoryReset = () => {

  const { resetGame } = useMemoryContext();
  return (
    <Button onClick={resetGame}>
      Reset
    </Button>
  );
};

export default MemoryReset;