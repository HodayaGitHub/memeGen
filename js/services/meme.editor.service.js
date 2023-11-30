'use strict'

let gLine 

let gMeme = {
    draggedLineIdx: -1,
    lineSize: gCanvasFontSize, 
    lines: [
        // { text: 'line1', x: initialX, y: initialY },

    ],
    selectedLineIdx: 0,
}


function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, userMems)
}


function addNewLine(text, x, y) {
     gLine = {
        text: text,
        x: x,
        y: y,
        isDrag: false,
    }

    gMeme.lines.push(gLine)
}

// changeLine()
// function changeLine() {
//     const lines = gMeme.lines
//     console.log(lines)
//   }

