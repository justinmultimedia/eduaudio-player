import React from 'react';
import AudioPlayer from './AudioPlayer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>EduAudio</h1>
      </header>
      <main className="app-main">
        <AudioPlayer />
      </main>
    </div>
  );
}

export default App;
