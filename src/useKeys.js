import { useEffect } from 'react';

export const useKeys = (handleStart, handleStop) => {
  const keyDownHandler = (e) => {
    console.log(e);
    if (e.key === 'Shift') {
      handleStart();
    }
  };

  const keyUpHandler = (e) => {
    console.log(e);
    if (e.key === 'Shift') {
      handleStop();
    }
  };

  const mouseDownHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);

    if (e.button === 2) return;

    if (e.button === 0) {
      handleStart();
    }

    if (e.button === 1) {
      window.location.reload();
    }
  };

  const mouseUpHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);

    if (e.button === 2) return;

    if (e.button === 0) {
      handleStop();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    window.addEventListener('mousedown', mouseDownHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);

      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, []);
};
