import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { blockPromise, analyze } from './logic/utils';
import DemoComponent from './DemoComponent';

function App() {

  const [wordsData, setWordsData] = useState({
    wordCount: 0,
    charCount: 0,
    lineCount: 0,
    mostRepeatedWord: '',
    mostRepeatedWordCount: 0
  });

  const handleKeyUp = (currentText) => {
    let analyzedText = analyze(currentText);
    setWordsData(analyzedText);
  }

  return (
    <DemoComponent handleKeyUp={handleKeyUp} wordsData={wordsData} />
  );
}

export default App;
