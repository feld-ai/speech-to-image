import 'regenerator-runtime/runtime'
import { Mic, Disc3 } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import clsx from 'clsx';
import { useKeys } from '../useKeys.js';

export const ButtonSpeechToText = () => {
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'de-DE' });
  const stopListening = () => SpeechRecognition.stopListening();
  useKeys(startListening, stopListening);

  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  return (
    <>
      <button
        type="button"
        onMouseDown={startListening}
        onMouseUp={stopListening}
        onMouseLeave={stopListening}
        className={clsx('app-button', 'shadow', { 'app-button--listening': listening })}
      >
        <span>Click and Hold</span>
        <span className="app-button__icon-container">
          <Disc3 className="app-button__icon app-button__icon--active" color="#242424" size={24} />
        <Mic className="app-button__icon app-button__icon--static" color="#242424" size={24} />
        </span>
      </button>
      <p>{ transcript }</p>

      {!browserSupportsSpeechRecognition && <p>Speech recognition is not supported in this browser.</p>}
    </>
  )
    ;
};
