
export default () => {

    function blockEventLoop(blockTime) {
        const end = Date.now() + blockTime;
        while (Date.now() < end) {
        }
    }

    function analyze(str) {
        blockEventLoop(800);

        return {
            wordsAmount: getWordsAmount(str),
            charactersAmount: getCharactersAmount(str)
        };
    }

    function getWordsAmount(text) {
        return text.split(' ').length;
    }

    function getCharactersAmount(text) {
        return text.length;
    }


    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        postMessage(analyze(e.data));
    })
}
