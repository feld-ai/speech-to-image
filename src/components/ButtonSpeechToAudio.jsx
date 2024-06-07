import { useState } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import clsx from 'clsx';
import { Disc3, Mic } from 'lucide-react';

import { uploadBlob } from '../utils.js';
import { useKeys } from '../useKeys.js';

export const ButtonSpeechToAudio = () => {
  const [recordState, setRecordState] = useState();
  const [loading, setLoading] = useState(false);

  const handleRecordingStart = () => {
    setRecordState(RecordState.START);
  };

  const handleRecordingStop = () => {
    setRecordState(RecordState.STOP);
  };

  useKeys(handleRecordingStart, handleRecordingStop);

  const onFinish = (audioData) => {
    setLoading(true);
    uploadBlob(audioData.blob, audioData.type)
      .then(
        (success) => {
          setLoading(false);
          console.log(success);
        }
      ).catch(
      (error) => {
        setLoading(false);
        console.log(error);
      }
    );
  }

  return (
    <>
      <AudioReactRecorder state={recordState} onStop={onFinish}/>

      <button
        type="button"
        disabled={loading}
        onMouseDown={handleRecordingStart}
        onMouseUp={handleRecordingStop}
        onMouseLeave={handleRecordingStop}
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
