import 'regenerator-runtime/runtime'
import { useEffect } from 'react';
import { Mic, Disc3 } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import clsx from 'clsx';

export const ButtonSpeechToText = () => {
  const {
    transcript,
    listening,
    // resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const keyDownHandler = (e) => {
    if (e.key === 'Shift') {
      startListening();
    }
  }

  const keyUpHandler = (e) => {
    if (e.key === 'Shift') {
      stopListening();
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

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'de-DE' });
  const stopListening = () => SpeechRecognition.stopListening();

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
