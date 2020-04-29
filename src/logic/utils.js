
export function blockEventLoop(blockTime) {
    const end = Date.now() + blockTime;
    while (Date.now() < end) {
    }
}

export function analyze(str) {
    return new Promise((resolve, reject) => {
        try {
            blockEventLoop(800);

            resolve({
                wordsAmount: getWordsAmount(str),
                charactersAmount: getCharactersAmount(str)
            });
        }
        catch (err) {
            reject(`Error analyzing ${err}`);
        }
    });
}

function getWordsAmount(text) {
    return text.split(' ').length;
}

function getCharactersAmount(text) {
    return text.length;
}
