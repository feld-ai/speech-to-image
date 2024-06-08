import { Heart, MountainSnow } from 'lucide-react';

import './App.css'
import { ButtonSpeechToAudio } from './components/ButtonSpeechToAudio.jsx';
import { ButtonSpeechToText } from './components/ButtonSpeechToText.jsx';
import { useEffect, useState } from 'react';

const App = () => {
  const [keyCode, setKeyCode] = useState();

  const keyDownHandler = (e) => {
    setKeyCode(e.keyCode);
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div className="page">
      <div className="debug-keycode">{keyCode}</div>
      <header className="header">

      </header>
      <main className="main">
        <h1>Ki busche</h1>
        {/*<ButtonSpeechToAudio />*/}
        <ButtonSpeechToText />
      </main>
      <footer className="footer">
        with
        <Heart fill="tomato" strokeWidth={0} />
        from Vorarlberg
        <MountainSnow color="#242424" />
      </footer>
    </div>
  )
}

export default App
