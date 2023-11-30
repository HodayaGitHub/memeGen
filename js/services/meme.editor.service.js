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


function addNewLine(text, x, y, isTxtSave) {
    const line = {
        text: text,
        x: x,
        y: y,
        lineSize: gCanvasFontSize,
        color: '',
        isDrag: false,
        isTxtSave: isTxtSave,
    }

    const unsavedLineIdx = gMeme.lines.findIndex(currLine => currLine.isTxtSave === false)
    if (!isTxtSave && unsavedLineIdx >= 0) {
        line.x = gMeme.lines[unsavedLineIdx].x
        line.y = gMeme.lines[unsavedLineIdx].y
        gMeme.lines[unsavedLineIdx] = line
    } else {
        gMeme.lines.push(line)
    }
}
