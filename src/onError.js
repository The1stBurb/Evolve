import { clearElement, vBind } from './functions.js';
import { loc } from './locale.js'


import FileImportButton from './components/FileImportButton.vue';
import V from './vue-cdn-shim.js';

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
            <div id="impExp" class="importExport">
                <b-field label="${loc('import_export')}">
                    <b-input id="importExport" type="textarea"></b-input>
                </b-field>
                <button class="button" @click="saveImport">{{ label('import') }}</button>
                <button class="button" @click="saveExport">{{ label('export') }}</button>
                <button class="button" @click="saveExportFile">{{ label('export_file') }}</button>
                <button class="button right" @click="restoreGame"><span class="settings9" aria-label="${loc('settings9')}">{{ label('restore') }}</span></button>
            </div>
        `);
        vBind({
            el: '#impExp',
            data: {
                s: global.settings,
            },
            methods: {
                saveImport(){
                    let impExp=$('#importExport textarea');
                    if (impExp.val().length > 0){
                        importGame(impExp.val());
                    }
                },
                saveExport(){
                    $('#importExport textarea').val(window.exportGame());
                    $('#importExport textarea').select();
                    document.execCommand('copy');
                },
                restoreGame(){
                    let restore_data = save.getItem('evolveBak') || false;
                    this.$buefy.dialog.confirm({
                        title: loc('restore'),
                        message: loc('restore_warning'),
                        ariaModal: true,
                        confirmText: loc('restore'),
                        onConfirm() {
                            if (restore_data){
                                importGame(restore_data,true);
                            }
                        }
                    });
                },
                
                namecase(name){
                    return name.replace(/(?:^|\s)\w/g, function(match) {
                        return match.toUpperCase();
                    });
                },
                label(lbl){
                    return loc(lbl);
                },
            }
        });

    }
    // if(error.includes('TypeError:')){
    //     console.log('uh oh')
    // }
};
