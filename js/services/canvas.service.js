'use strict'

function renderEmptyCanvas() {
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    renderImageOnCanvas(gSelecedImg)
}


function wrapText(text, x, y, lineHeight, shouldDrawBox) {
    let offsetY = 0

    let textToIterate = wrapWord(gCtx, text, x, y, gCanvas.width, lineHeight)

    textToIterate.forEach(function (item) {
        if (shouldDrawBox) {
            drawTextBox(item[1], item[2] + offsetY, gCtx.measureText(item[0]).width, lineHeight)
        }
        gCtx.fillText(item[0], item[1], item[2] + offsetY + lineHeight / 2)
        gCtx.strokeText(item[0], item[1], item[2] + offsetY + lineHeight / 2)

        offsetY += 30
    })
}


function drawTextBox(x, y, width, height) {
    gCtx.beginPath()
    gCtx.rect(x - width / 2 - 10, y - height / 2 + 5, width + 20, height + 5)
    gCtx.lineWidth = 2.5
    gCtx.stroke()
    gCtx.closePath()
}


function wrapWord(ctx, text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ')
    let line = ''
    let lineArray = []

    words.forEach((currentWord, n) => {
        if (currentWord.length > 12) {
            splitWord(currentWord, 12).forEach(partial => {

                if (line.trim() !== '') {
                    lineArray.push([line.trim(), x, y])
                }
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
    return lineArray
}

function splitWord(word, length) {
    let splitWord = []
    for (let i = 0; i < word.length; i += length) {
        splitWord.push(word.substr(i, length))
    }
    return splitWord
}

