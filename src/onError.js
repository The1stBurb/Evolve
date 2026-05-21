import { clearElement } from './functions.js';

window.fullyLoaded=false;
window.onerror = function (message, source, lineno, colno, error) {
    console.error('Caught by the Not Fully Loaded (NFL) Error System! Defualting to emergency save loader!');
    // console.error(error);
    if(!window.fullyLoaded){
        let body=$('body');
        clearElement(body);
        // console.log(error.stack.includes('\n'))
        let stack='<span style="font-size:1em;">'+error.stack.replaceAll('"','').split('\n').join('</span><span style="font-size:1em;">')+'</span>';
        body.append(`
            <div>
                <br>
                <div style="display:flex;justify-content:center;">
                    <b><p class="has-text-danger" style="font-size:2em;">THERE IS AN ERROR IN (most likely) YOUR SAVE CODE!</p></b>
                </div>
                <hr>
                <div class="has-text-danger" style="display:flex;justify-content:center;flex-direction:column;align-items:center;font-size:1.5em;">
                    <span>Caught by the Not Fully Loaded (NFL) Error System!</span>
                    <span>Enabling the Emergency Save Loader!</span>
                    <br>
                    ${stack}
                </div>

                <p>To keep you from not being able to load the game, here is an Emergency Save Loader.</p>
            </div>
            `);
    }
    // if(error.includes('TypeError:')){
    //     console.log('uh oh')
    // }
};
