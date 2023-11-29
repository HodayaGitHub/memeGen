
function wrappedText(lineHeight) {
    let textToIterate = wrapText(gCtx, gTextContent, gCanvas.width / 2, gCanvas.height / 2, gCanvas.width, lineHeight)
    textToIterate.forEach(function (item) {
        gCtx.fillText(item[0], item[1], item[2])
        gCtx.strokeText(item[0], item[1], item[2])
    })
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

    console.log(lineArray)
    return lineArray
}

function splitWord(word, length) {
    let splittedword = []
    for (let i = 0; i < word.length; i += length) {
        splittedword.push(word.substr(i, length))
    }
    return splittedword
}