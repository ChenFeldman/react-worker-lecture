// import {analyze} from './utils';

export default function AnalyzerWorker(args) {
    let onmessage = e => { // eslint-disable-line no-unused-vars
        debugger;
        // Write your code here...
        // postMessage(analyze(event.data));
        postMessage('Hey worker!');
    };
    
}