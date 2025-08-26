import React, { useState } from 'react';
import './App.css';

// 识字卡片数据
const wordCards = [
  { id: 1, word: '猫', image: '🐱', sound: 'miao.mp3', color: '#FF9AA2' },
  { id: 2, word: '狗', image: '🐶', sound: 'wang.mp3', color: '#FFB7B2' },
  { id: 3, word: '鸟', image: '🐦', sound: 'jiu.mp3', color: '#FFDAC1' },
  { id: 4, word: '鱼', image: '🐠', sound: 'bo.mp3', color: '#E2F0CB' },
  { id: 5, word: '花', image: '🌸', sound: 'hua.mp3', color: '#B5EAD7' },
  { id: 6, word: '树', image: '🌳', sound: 'shu.mp3', color: '#C7CEEA' },
];

function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [playSound, setPlaySound] = useState(false);

  const currentCard = wordCards[currentCardIndex];

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => 
      prevIndex === wordCards.length - 1 ? 0 : prevIndex + 1
    );
    setShowWord(false);
    setPlaySound(false);
  };

  const handlePrev = () => {
    setCurrentCardIndex((prevIndex) => 
      prevIndex === 0 ? wordCards.length - 1 : prevIndex - 1
    );
    setShowWord(false);
    setPlaySound(false);
  };

  const toggleShowWord = () => {
    setShowWord(!showWord);
  };

  const playCardSound = () => {
    setPlaySound(true);
    // 创建音频对象并播放
    const audio = new Audio(`${process.env.PUBLIC_URL}/${currentCard.sound}`);
    audio.play().catch(error => {
      console.error('播放音频时出错:', error);
    });
    
    // 监听音频播放结束事件
    audio.addEventListener('ended', () => {
      setPlaySound(false);
    });
  };

  return (
    <div className="app" style={{ backgroundColor: currentCard.color }}>
      <header className="app-header">
        <h1>儿童识字乐园</h1>
      </header>
      
      <main className="card-container">
        <div 
          className="word-card" 
          onClick={toggleShowWord}
          style={{ backgroundColor: '#FFF' }}
        >
          <div className="card-image" style={{ fontSize: '100px' }}>
            {currentCard.image}
          </div>
          {showWord && (
            <div className="card-word" style={{ fontSize: '80px', margin: '20px 0' }}>
              {currentCard.word}
            </div>
          )}
          <button 
            className="sound-button" 
            onClick={(e) => {
              e.stopPropagation();
              playCardSound();
            }}
            disabled={playSound}
          >
            {playSound ? '播放中...' : '播放读音'}
          </button>
        </div>
        
        <div className="navigation-buttons">
          <button className="nav-button" onClick={handlePrev}>上一个</button>
          <button className="nav-button" onClick={handleNext}>下一个</button>
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="progress-indicator">
          {currentCardIndex + 1} / {wordCards.length}
        </div>
      </footer>
    </div>
  );
}

export default App;