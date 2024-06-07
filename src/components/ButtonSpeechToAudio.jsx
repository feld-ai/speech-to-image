import { useEffect, useState } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import clsx from 'clsx';
import { Disc3, Mic } from 'lucide-react';

export const ButtonSpeechToAudio = () => {
  const [recordState, setRecordState] = useState();

  const downHandler = (e) => {
    if (e.key === 'Shift') {
      handleStart();
    }
  }

  const upHandler = (e) => {
    if (e.key === 'Shift') {
      handleStop();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  const handleStart = () => {
    setRecordState(RecordState.START);
  }

  const handleStop = () => {
    setRecordState(RecordState.STOP);
  }

  const onFinish = (audioData) => {
    // TODO: probably handle request here
    console.log('audioData', audioData)
  }

  return (
    <>
      <AudioReactRecorder state={recordState} onStop={onFinish}/>

      <button
        type="button"
        onMouseDown={handleStart}
        onMouseUp={handleStop}
        onMouseLeave={handleStop}
        className={clsx('app-button', 'shadow', { 'app-button--listening': recordState === 'start' })}
      >
        <span>Click and Hold</span>
        <span className="app-button__icon-container">
          <Disc3 className="app-button__icon app-button__icon--active" color="#242424" size={24}/>
          <Mic className="app-button__icon app-button__icon--static" color="#242424" size={24}/>
        </span>
      </button>
    </>
  );
};
