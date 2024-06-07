import { useEffect } from 'react';

export const useKeys = (handleStart, handleStop) => {
  const keyDownHandler = (e) => {
    if (e.key === 'Shift') {
      handleStart();
    }
  }

  const keyUpHandler = (e) => {
    if (e.key === 'Shift') {
      handleStop();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, []);
};
