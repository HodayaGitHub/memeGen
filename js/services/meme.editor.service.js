
'use strict'

// function _createMeme(){
//  gMeme =  {
//     lineIdx: 0,
//     lines: [],
//   }
// }

let gMeme = {
    draggedLineIdx: -1,  
    lines: [
        // { text: 'line1', x: initialX, y: initialY },

    ],
};


function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, userMems)
}



function addNewLine(text, x, y) {
    const newLine = {
        text: text,
        x: x,
        y: y
    }

    gMeme.lines.push(newLine);
}




