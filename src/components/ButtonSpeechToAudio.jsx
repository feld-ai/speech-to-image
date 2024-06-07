import { useState } from 'react';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import clsx from 'clsx';
import { Disc3, Mic } from 'lucide-react';

import { uploadBlob } from '../utils.js';
import { useKeys } from '../useKeys.js';

export const ButtonSpeechToAudio = () => {
  const [recordState, setRecordState] = useState();
  const [audioUrl, setAudioUrl] = useState('');

  const handleRecordingStart = () => {
    setRecordState(RecordState.START);
  };

  const handleRecordingStop = () => {
    setRecordState(RecordState.STOP);
  };

  useKeys(handleRecordingStart, handleRecordingStop);


  // const keyDownHandler = (e) => {
  //   if (e.key === 'Shift') {
  //     handleRecordingStart();
  //   }
  // }
  //
  // const keyUpHandler = (e) => {
  //   if (e.key === 'Shift') {
  //     handleRecordingStop();
  //   }
  // }
  //
  // useEffect(() => {
  //   window.addEventListener('keydown', keyDownHandler);
  //   window.addEventListener('keyup', keyUpHandler);
  //
  //   return () => {
  //     window.removeEventListener('keydown', keyDownHandler);
  //     window.removeEventListener('keyup', keyUpHandler);
  //   };
  // }, []);

  const onFinish = (audioData) => {
    uploadBlob(audioData.blob, audioData.type)
      .then(
        success => console.log(success)
      ).catch(
      error => console.log(error)
    );
  }

  return (
    <>
      <AudioReactRecorder state={recordState} onStop={onFinish}/>

      <button
        type="button"
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
