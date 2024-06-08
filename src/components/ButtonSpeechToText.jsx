import 'regenerator-runtime/runtime'
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Mic, Disc3 } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import clsx from 'clsx';

import { useKeys } from '../useKeys.js';
import { fetchContent } from '../utils.js';

export const ButtonSpeechToText = () => {
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'de-DE' });
  const stopListening = () => SpeechRecognition.stopListening();
  useKeys(startListening, stopListening);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [loading, setLoading] = useState(false);
  const [debouncedTranscript] = useDebounce(transcript, 750);

  const [imgSrc, setImgSrc] = useState('');
  const [yt, setYt] = useState({ link: '', description: '' });

  useEffect(() => {
    function validateImageResponse(response) {
      console.log('validateImageResponse', response)
      if (!response.ok) {
        throw Error(response.statusText);
      }

      setLoading(false);
      resetTranscript();
      return response;
    }

    function parseSongResponse(response) {
      console.log('parseSongResponse', response);
      // TODO: set link, show youtube video
      setYt({ link: '', description: '' });
    }

    if (debouncedTranscript) {
      setLoading(true);

      fetchContent('image', debouncedTranscript)
        .then(validateImageResponse)
        .then(response => response.blob())
        .then(blob => {
          setImgSrc(URL.createObjectURL(blob));
        })
        .catch(
          (err) => {
            console.log(err);
            setLoading(false);
            resetTranscript();
          }
        );

      fetchContent('song', debouncedTranscript)
        .then(parseSongResponse)
        .catch((err) => {
          console.log(err);
        })
    }
  }, [debouncedTranscript]);

  return (
    <>
      <button
        type="button"
        disabled={loading}
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

      <div className="image-container">
        <img src={imgSrc} alt=""/>
      </div>

      {!browserSupportsSpeechRecognition && <p>Speech recognition is not supported in this browser.</p>}
    </>
  )
    ;
};
