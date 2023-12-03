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
        gMeme.selectedLineIdx = gMeme.lines.length - 1
    }

}

function canvasTextProperties(line) {
    gCtx.font = `${line.lineSize}px ${line.fontFamily}`
    gCtx.fillStyle = `${line.fillStyle}`
    gCtx.strokeStyle = `${line.strokeStyle}`
    gCtx.lineWidth = `${line.lineWidth}`
    gCtx.textAlign = `center`
}


function setTextColor(color) {
    let line = getSelectedLine()
    line.fillStyle = color

    renderCanvasWithContent()
}

function setTextOutline(color) {
    let line = getSelectedLine()
 
    line.strokeStyle = color

    renderCanvasWithContent()
}


function setOutlineColor(color) {
    let line = getSelectedLine()
    line.strokeStyle = color

    renderCanvasWithContent()
}



function setAlignment(alignDirection) {
    let line = getSelectedLine();
    let lineIdx = gMeme.selectedLineIdx;

    const canvasWidth = gCanvas.width

    if (alignDirection === 'left') {
        line.textAlign = 'left'
        line.x = gCtx.measureText(line.text).width / 2 + 12
    } else if (alignDirection === 'center') {
        line.textAlign = 'center'
        line.x = canvasWidth / 2
    } else {
        line.textAlign = 'right'
        line.x = canvasWidth - gCtx.measureText(line.text).width / 2 - 12
    }

    renderCanvasWithContent()
}


function setFontSize(changeSizeType) {
    let line = getSelectedLine()

    if (changeSizeType === 'increase') {
        line.lineSize += 5
    } else {
        line.lineSize -= 5
    }

    renderCanvasWithContent()
}


function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, userMems)
}


  function filterByKeyword(word) {
    if (word !== 'all' && gKeywordSearchCountMap[word] <= 30) {
        gKeywordSearchCountMap[word] += 1
    }
  }
  