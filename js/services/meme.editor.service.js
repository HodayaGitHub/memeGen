'use strict'
let gCanvasFontSize = 80

let gMeme = {
    draggedLineIdx: -1,
    lines: [
        // { text: 'line1', x: initialX, y: initialY },

    ],
    selectedLineIdx: undefined,
}


function addNewLine(text, x, y, isTxtSave) {
    const line = {
        text: text,
        x: x,
        y: y,

        lineSize: gCanvasFontSize,
        fillStyle: 'white',
        strokeStyle: 'black',
        lineWidth: 2,
        textAlign: "center",

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

function canvasTextProperties(line) {
    gCtx.font = `${gCanvasFontSize}px impact bold`
    gCtx.fillStyle = `${line.fillStyle}`
    gCtx.strokeStyle = `${line.strokeStyle}`
    gCtx.lineWidth = `${line.lineWidth}`
    gCtx.textAlign = `${line.textAlign}`
    
    // const lineHeight = 80
    // wrappedText(lineHeight)
}

function increaseFont() {
    // console.log(getSelectedLine().lineSize)
    // getSelectedLine().lineSize + 100
    // renderCanvasWithContent()
}


function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, userMems)
}



// function canvasTextProperties(line) {
//     gCtx.font = `${gCanvasFontSize}px impact bold`
//     gCtx.fillStyle = "white"
//     gCtx.strokeStyle = "black"
//     gCtx.lineWidth = 2
//     gCtx.textAlign = "center"
//     // const lineHeight = 80
//     // wrappedText(lineHeight)
// }