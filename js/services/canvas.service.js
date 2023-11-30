'use strict'



function renderEmptyCanvas() {
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    renderImageOnCanvas(gSelecedImg)
}


function canvasTextProperties() {
    gCtx.font = "5rem impact bold"
    gCtx.fillStyle = "white"
    gCtx.strokeStyle = "black"
    gCtx.lineWidth = 2
    gCtx.textAlign = "center"
    const lineHeight = 80
    wrappedText(lineHeight)
}



function wrappedText(lineHeight) {
    let offsetY = 0
    let textToIterate = wrapText(gCtx, gTextContent, gCanvas.width / 2, gCanvas.height / 2, gCanvas.width, lineHeight)

    textToIterate.forEach(function (item) {
        drawTextBox(item[1], item[2] + offsetY, gCtx.measureText(item[0]).width, lineHeight)
        gCtx.fillText(item[0], item[1], item[2] + offsetY + lineHeight / 2)
        gCtx.strokeText(item[0], item[1], item[2] + offsetY + lineHeight / 2)

        offsetY += 30
    })
}


function drawTextBox(x, y, width, height) {
    gCtx.beginPath()
    gCtx.rect(x - width / 2 - 10, y - height / 2 + 10, width + 20, height + 20)
    gCtx.lineWidth = 2.5
    gCtx.stroke()
    gCtx.closePath()

    // gCtx.fillStyle = 'rgba(0, 0, 0, 0)'
    // gCtx.fill()
    // gCtx.strokeStyle = 'black'; // Border color
}





function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ')
    let line = ''
    let lineArray = []

    words.forEach((currentWord, n) => {
        if (currentWord.length > 12) {
            // If the current word is longer than 12 characters, split it
            splitWord(currentWord, 12).forEach(partial => {
                lineArray.push([line.trim(), x, y])
                y += lineHeight
                line = partial + ' '
            })
        } else {
            let testLine = line + currentWord + ' '
            let metrics = ctx.measureText(testLine)
            let testWidth = metrics.width

            if (testWidth > maxWidth && n > 0) {
                lineArray.push([line.trim(), x, y])
                y += lineHeight
                line = currentWord + ' '
            } else {
                line += currentWord + ' '
            }
        }

        if (n === words.length - 1) {
            lineArray.push([line.trim(), x, y])
        }
    })

    // console.log(lineArray)
    return lineArray
}

function splitWord(word, length) {
    let splittedword = []
    for (let i = 0; i < word.length; i += length) {
        splittedword.push(word.substr(i, length))
    }
    return splittedword
}



