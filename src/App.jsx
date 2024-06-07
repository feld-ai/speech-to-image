import { Heart, MountainSnow } from 'lucide-react';

import './App.css'
import { Button } from './components/Button.jsx';

const App = () => {
  return (
    <div className="page">
      <header className="header">

      </header>
      <main className="main">
        <h1>Speech to Image</h1>
        <Button/>
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
