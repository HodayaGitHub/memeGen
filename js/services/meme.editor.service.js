'use strict'

let gMeme = {
    draggedLineIdx: -1,
    lines: [
        // { text: 'line1', x: initialX, y: initialY },

    ],
    selectedLineIdx: undefined,
}


function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, userMems)
}


function addNewLine(text, x, y) {
     const line = {
        text: text,
        x: x,
        y: y,
        lineSize: gCanvasFontSize, 
        color: '',
        isDrag: false,
    }

    gMeme.lines.push(line)
}
