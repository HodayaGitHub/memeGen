
'use strict'

// function _createMeme(){
//  gMeme =  {
//     lineIdx: 0,
//     lines: [],
//   }
// }

let gMeme = {
    lineIdx: 0,
    lines: [],
}

function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, userMems)
}


function addNewLine(newLine) {
    // gMeme.lines = []
    gMeme.lines.push(newLine)
    // gMeme.lineIdx++
}



function clearInput() {
    $('.text-insert').val('')
    canvasTextProperties()
    // gTextContent = ''
    renderCanvasWithContent()
}

