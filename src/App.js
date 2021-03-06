import React, { useState, useEffect } from 'react';
import './App.css';
import worker from './app.worker.js';
import WebWorkerWrapper from './WebWorker';
import DemoComponent from './DemoComponent';
import { analyze } from './logic/utils';

let localWorker;

const TAB_TYPES = {
  SYNC: 'SYNC',
  WORKER: 'WORKER'
}

function App() {
  const [currentTab, setCurrentTab] = useState(TAB_TYPES.SYNC);
  const [wordsDataWorker, setWordsDataWorker] = useState({
    wordsAmount: 0,
    charactersAmount: 0
  });

  useEffect(() => {
    localWorker = new WebWorkerWrapper(worker);
    localWorker.addEventListener('message', event => {
      try {
        setWordsDataWorker(event.data);
      }
      catch (err) {
        console.log(`Erro while setting new data from worker ${err}`);
      }
    });

    return (()=>{
      localWorker.terminate();
    })
  }, []);

  const handleKeyUpWorker = (currentText) => {
    localWorker.postMessage(currentText);
  }

  const [wordsData, setWordsData] = useState({
    wordsAmount: 0,
    charactersAmount: 0
  });

  const handleKeyUp = (currentText) => {
    let analyzedText = analyze(currentText)
    analyzedText.then(result => {
      setWordsData(result);
    })
  }

  const switchToTab = (tabType) => {
    setCurrentTab(tabType);
  }

  const renderCurrentTab = () => {
    if (currentTab === TAB_TYPES.WORKER) {
      return (<DemoComponent handleKeyUp={handleKeyUpWorker} wordsData={wordsDataWorker} />)
    }
    else {
      return (<DemoComponent handleKeyUp={handleKeyUp} wordsData={wordsData} />)
    }
  }

  return (
    <>
      <div id='tabs'>
        <button class='demo-button' style={{ backgroundColor: currentTab === TAB_TYPES.SYNC ? '#348BD8' : 'white' }} onClick={() => switchToTab(TAB_TYPES.SYNC)}>Sync</button>
        <button class='demo-button' style={{ backgroundColor: currentTab === TAB_TYPES.WORKER ? '#348BD8' : 'white' }} onClick={() => switchToTab(TAB_TYPES.WORKER)}>Worker</button>
      </div>
      {renderCurrentTab()}
    </>
  );
}

export default App;
