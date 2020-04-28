
export default () => {

    function blockEventLoop(blockTime) {
        const end = Date.now() + blockTime;
        while (Date.now() < end) {
        }
    }

    function analyze(str) {
        blockEventLoop(800);
        const mostRepeatedWordInfo = findMostRepeatedWord(str);

        return {
            wordCount: countWords(str),
            charCount: countChars(str),
            mostRepeatedWord: mostRepeatedWordInfo.mostRepeatedWord
        };
    }

    function countWords(str) {
        str = str.trim();
        return str === "" ? 0 : str.split(/\s+/).length;
    }

    function countChars(str) {
        return str.length;
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

    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        postMessage(analyze(e.data));
    })
}
