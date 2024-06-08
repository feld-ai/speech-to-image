import 'regenerator-runtime/runtime'
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Mic, Disc3 } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import clsx from 'clsx';

import { useKeys } from '../useKeys.js';
import { fetchContent } from '../utils.js';
import { YoutubeEmbed } from './YoutubeEmbed.jsx';

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

    function validateSongResponse(response) {
      console.log('validateSongResponse', response);
      // console.log('validateSongResponse', response.blob());

      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response;
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
        .then(validateSongResponse)
        .then(response => response.json())
        .then((res) => {
          if (res) {
            const replacedLink = res.song_link.replace('watch?v=', 'embed/');
            setYt({ link: `${replacedLink}?autoplay=1`, description: res.reason_for_song });
          }
        })
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
        <div>
          <img src={imgSrc} alt="" />
        </div>
        <div>
          {yt.description && <p>{yt.description}</p>}
          {yt.link && (
            <YoutubeEmbed link={yt.link} />
          )}
        </div>
      </div>

      {!browserSupportsSpeechRecognition && <p>Speech recognition is not supported in this browser.</p>}
    </>
  )
    ;
};
