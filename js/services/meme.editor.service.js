
'use strict'

// function _createMeme(){
//  gMeme =  {
//     lineIdx: 0,
//     lines: [],
//   }
// }

// TO RETURN IF WON'T WORK 

// let gMeme = {
//     lineIdx: 0,
//     lines: [],
// }

let gMeme = {
    draggedLineIdx: -1,  // Index of the dragged line (-1 if none)
    lines: [
        // { text: 'line1', x: initialX, y: initialY },
        // { text: 'line2', x: initialX, y: initialY },
        // ... other lines
    ],
};


function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, userMems)
}


// TO RETURN IF WON'T WORK 

// function addNewLine(newLine) {
//     // gMeme.lines = []
//     gMeme.lines.push(newLine)
//     // gMeme.lineIdx++
// }


function addNewLine(text, x, y) {
    const newLine = {
        text: text,
        x: x,
        y: y
    }

    gMeme.lines.push(newLine);
}


