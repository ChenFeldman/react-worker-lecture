import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { blockPromise } from './logic/utils';
import worker from './app.worker.js';
import WebWorker from './WebWorker';
let localWorker;

function App() {

  let textRef = useRef();
  const [wordsData, setWordsData] = useState({
    wordCount: 0,
    charCount: 0,
    lineCount: 0,
    mostRepeatedWord: '',
    mostRepeatedWordCount: 0
  });

  useEffect(() => {
      localWorker = new WebWorker(worker);
      localWorker.addEventListener('message', event => {
        console.log('hey', event.data);
        try {
          setWordsData(event.data);
        }
        catch (err) {

        }
      });

  },[]);

  const handleKeyUp = (event) => {
    const currentText = textRef.current.value;
    localWorker.postMessage(currentText);
  }

  return (
    <div className="App">
      <textarea ref={textRef} id="text" rows="10" cols="150" placeholder="Start writing..." onKeyUp={handleKeyUp}>
      </textarea>
      <div>
        <p>Word count: <span id="wordCount">{wordsData.wordCount}</span></p>
        <p>Character count: <span id="charCount">{wordsData.charCount}</span></p>
        <p>Line count: <span id="lineCount" >{wordsData.lineCount}</span></p>
  <p>Most repeated word: <span id="mostRepeatedWord" >{wordsData.mostRepeatedWord}</span> (<span id="mostRepeatedWordCount" >{wordsData.mostRepeatedWordCount}</span>
          occurrences)</p>
      </div>
      <button>Interact With Me</button>
    </div>
  );
}

export default App;
