'use strict'
let gImages = []
let gMeme = {
    lineIdx: 0,
    lines: [],
}

function _createImg(id, imgUrl, imgAlt) {
    return {
        id,
        imgUrl,
        imgAlt,
        imgDesc: null,
    }
}


function _createImages() {
    const numbersArray = Array.from({ length: 19 }, (_, index) => index)

    gImages = numbersArray.map((index) => {
        var id = `${index + 1}`
        const imgUrl = `img/${index + 1}.jpg`
        const imgAlt = `Image ${index + 1}`
        return _createImg(id, imgUrl, imgAlt)
    })

    console.log(gImages)

}


// function _createMeme(){
//  gMeme =  {
//     lineIdx: 0,
//     lines: [],
//   }
// }

function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, userMems)
}



function addNewLine(newLine) {
    gMeme.lines.push(newLine)
    // gMeme.lineIdx++
}

function textProperties() {
    gCtx.font = "5rem impact bold"
    gCtx.fillStyle = "white"
    gCtx.strokeStyle = "black"
    gCtx.lineWidth = 2
    gCtx.textAlign = "center"
    const lineHeight = 80
    wrappedText(lineHeight)
}




