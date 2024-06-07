import { Heart, MountainSnow } from 'lucide-react';

import './App.css'
import { ButtonSpeechToAudio } from './components/ButtonSpeechToAudio.jsx';
// import { ButtonSpeechToText } from './components/ButtonSpeechToText.jsx';

const App = () => {
  return (
    <div className="page">
      <header className="header">

      </header>
      <main className="main">
        <h1>Speech to Image</h1>
        <ButtonSpeechToAudio />
        {/*<ButtonSpeechToText/>*/}
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
