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

        lineSize: 50,
        fontFamily: 'impact',
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
    gCtx.font = `${line.lineSize}px ${line.fontFamily}`
    gCtx.fillStyle = `${line.fillStyle}`
    gCtx.strokeStyle = `${line.strokeStyle}`
    gCtx.lineWidth = `${line.lineWidth}`
    gCtx.textAlign = `${line.textAlign}`
}


function setTextColor(color) {
    let line = getSelectedLine()
    console.log(`'${color}'`)
    console.log(line.fillStyle)
    line.fillStyle = color

    renderCanvasWithContent()
}

function setTextColor(color) {
    let line = getSelectedLine()
    console.log(`'${color}'`)
    console.log(line.fillStyle)
    line.strokeStyle = color

    renderCanvasWithContent()
}


function setOutlineColor(color) {
    let line = getSelectedLine()
    line.strokeStyle = color

    renderCanvasWithContent()
}



function setAlignment(alignDirection) {
    let line = getSelectedLine()
    let lineIdx = gMeme.selectedLineIdx

    if (alignDirection === 'left') {
        line.textAlign = 'left'
        line.x += 50

        console.log('left')


    } else if (alignDirection === 'center') {
        line.textAlign = 'center'
        console.log('center')
        line.x = 0

    } else {
        line.textAlign = 'right'
        console.log('right')
        line.x -= 60

    }
    // renderLineOnCanvas(line, lineIdx) 
    renderCanvasWithContent()

}


function setFontSize(changeSizeType) {
    let line = getSelectedLine()

    if (changeSizeType === 'increase') {
        line.lineSize += 5
    } else {
        line.lineSize -= 5
    }

    // console.log('new font size', line.lineSize)
    renderCanvasWithContent()
}


function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, userMems)
}

