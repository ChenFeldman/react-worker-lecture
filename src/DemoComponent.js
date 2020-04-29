import React, { useRef, useState, useEffect } from 'react';
import './App.css';

let elementPoistion = 0;

function DemoComponent(props) {

    let textRef = useRef();
    let reactRef = useRef();
    let angularRef = useRef();
    let vueRef = useRef();
    let wordsRef = useRef();
    const [typingText, setTypingText] = useState('');
    const [buttonActionResult, setButtonActionResult] = useState('');

    useEffect(() => {
        setInterval(() => {
            animateLogo();
        }, 100)
    }, [])

    const handleButtonClick = () => {
        const randomNumber = Math.floor((Math.random() * 10000) + 1);
        setButtonActionResult(`Action found ${randomNumber} results`);
    }

    const handleKeyUp = () => {
        wordsRef.current.style.backgroundColor = 'gray';
        setTimeout(() => {
            const currentText = textRef.current.value;
            props.handleKeyUp(currentText);
            setTypingText('');
            wordsRef.current.style.backgroundColor = 'white';
        }, 1);
    }

    const animateLogo = () => {
        if (elementPoistion <= document.body.clientWidth - 200) {
            elementPoistion += 5;
        }
        else {
            elementPoistion = 0;
        }
        reactRef.current.style.left = `${elementPoistion * 1.3}px`;
        angularRef.current.style.left = `${elementPoistion}px`;
        vueRef.current.style.left = `${elementPoistion * 1.1}px`;
    }

    return (
        <div className="App">
            <div class='top-container'>
                <div class='race-flag'></div>
                <div>
                    <textarea ref={textRef} id="typingText" rows="5" cols="50" placeholder="Start Typing..." onKeyUp={handleKeyUp}>
                    </textarea>
                    <h1 style={{ color: 'purple' }}>{typingText}</h1>
                    <div ref={wordsRef}>
                        <p><b>Analyzed Words </b><span id="wordCount">{props.wordsData.wordsAmount}</span></p>
                        <p><b>Analyzed Characters </b><span id="charCount">{props.wordsData.charactersAmount}</span></p>
                    </div>
                    <button class='demo-button' onClick={handleButtonClick}>Calculate</button>
                    <h2>{buttonActionResult}</h2>
                </div>
                <div class='race-flag'></div>
            </div>

            <div class='race react'>
                <div id="logo" class="react" ref={reactRef}></div>
            </div>
            <div class='race angular'>
                <div id="logo" class="angular" ref={angularRef} ></div>
            </div>
            <div class='race vue'>
                <div id="logo" class="vue" ref={vueRef}></div>
            </div>
        </div>
    );
}

export default DemoComponent;
