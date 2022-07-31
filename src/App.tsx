import React from 'react';
import GameBoard from './components/GameBoard/GameBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <h1 className="title">Personalized Wordle</h1>
        <p className='subtitle'>Some message</p>
      </div>
      <div className='game-container'>
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
