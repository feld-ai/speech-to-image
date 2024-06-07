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

  const downHandler = (e) => {
    if (e.key === 'Shift') {
      startListening();
    }
  }

  const upHandler = (e) => {
    if (e.key === 'Shift') {
      SpeechRecognition.stopListening();
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

  const startListening = () => SpeechRecognition.startListening({ continuous: true });

  return (
    <>
      <button
        type="button"
        onMouseDown={startListening}
        onMouseUp={SpeechRecognition.stopListening}
        onMouseLeave={SpeechRecognition.stopListening}
        className={clsx('app-button', 'shadow', { 'app-button--listening': listening })}
      >
        <span>Click and Hold</span>
        <span className="app-button__icon-container">
          <Disc3 className="app-button__icon app-button__icon--active" color="#242424" size={24} />
        <Mic className="app-button__icon app-button__icon--static" color="#242424" size={24} />
        </span>
      </button>
      <p>{ transcript }</p>

      {!browserSupportsSpeechRecognition && <p>Browser doesn't support speech recognition.</p>}
    </>
  )
    ;
};
