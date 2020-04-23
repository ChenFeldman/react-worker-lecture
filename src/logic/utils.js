

export function blockPromise() {
    return new Promise(resolve => {
        console.log('event loop blocked!');
        blockEventLoop(1000);
        console.log('event loop free!');
        resolve();
    })
}

export function blockEventLoop(blockTime) {
    const end = Date.now() + blockTime;
    while (Date.now() < end) {
    }
}

export function analyze(str) {
    blockEventLoop(1000);
    const mostRepeatedWordInfo = findMostRepeatedWord(str);

    return {
        wordCount: countWords(str),
        charCount: countChars(str),
        lineCount: countLines(str),
        mostRepeatedWord: mostRepeatedWordInfo.mostRepeatedWord,
        mostRepeatedWordCount: mostRepeatedWordInfo.mostRepeatedWordCount
    };
}


function countWords(str) {
    str = str.trim();

    return str === "" ? 0 : str.split(/\s+/).length;
}

function countChars(str) {
    return str.length;
}

function countLines(str) {
    return str.trim() === "" ? 0 : str.split("\n").length;
}

function findMostRepeatedWord(str) {
    let words = {};
    let result = {
        mostRepeatedWord: "",
        mostRepeatedWordCount: 0
    };

    str.match(/\w+/g).forEach(function (w) {
        words[w] = (words[w] || 0) + 1
    });

    for (var w in words) {
        if (!(words[w] < result.mostRepeatedWordCount)) {
            result.mostRepeatedWordCount = words[w];
            result.mostRepeatedWord = w;
        }
    }

    return result;
}
