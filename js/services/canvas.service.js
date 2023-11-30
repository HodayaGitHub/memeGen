'use strict'
let gCanvasFontSize = 80


function renderEmptyCanvas() {
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
    renderImageOnCanvas(gSelecedImg)
}


function canvasTextProperties() {
    gCtx.font = `${gCanvasFontSize}px impact bold`
    gCtx.fillStyle = "white"
    gCtx.strokeStyle = "black"
    gCtx.lineWidth = 2
    gCtx.textAlign = "center"
    // const lineHeight = 80
    // wrappedText(lineHeight)
}


// TO RETURN IF WON'T WORK 

// function wrappedText(lineHeight) {
//     let offsetY = 0
//     let textToIterate = wrapText(gCtx, gTextContent, gCanvas.width / 2, gCanvas.height / 2, gCanvas.width, lineHeight)

//     textToIterate.forEach(function (item) {
//         drawTextBox(item[1], item[2] + offsetY, gCtx.measureText(item[0]).width, lineHeight)
//         gCtx.fillText(item[0], item[1], item[2] + offsetY + lineHeight / 2)
//         gCtx.strokeText(item[0], item[1], item[2] + offsetY + lineHeight / 2)

//         offsetY += 30
//     })
// }



// function wrapText(context, text, x, y, maxWidth, gCanvasFontSize) {
//     var words = text.split(' ');
//     var line = '';
//     var lines = 1; // Initialize with at least one line
//     // maxWidth = maxWidth - 20
//     words.forEach((word, i) => {
//         var testLine = line + word + ' ';
//         var metrics = context.measureText(testLine);
//         var testWidth = metrics.width + context.measureText(' ').width;
        
//         if (testWidth > maxWidth && i > 0) {
//             context.fillText(line.trim(), x, y);
//             context.strokeText(line.trim(), x, y);
//             line = word + ' ';
//             y += gCanvasFontSize; // Move to the next line
//             lines++;
//         } else {
//             line = testLine;
//         }
//     });
    
//     context.fillText(line.trim(), x, y);
//     context.strokeText(line.trim(), x, y);

//     // Call the drawTextBox function with the correct parameters after drawing the text
//     drawTextBox(context, x, y, maxWidth - 30, gCanvasFontSize * lines);
// }


// function wrapText(context, text, x, y, maxWidth, gCanvasFontSize) {
//     var words = text.split(' ');
//     var line = '';
//     var lines = 1; // Initialize with at least one line
    
//     words.forEach((word, i) => {
//         var testLine = line + word + ' ';
//         var metrics = context.measureText(testLine);
//         var testWidth = metrics.width + context.measureText(' ').width;
        
//         if (testWidth > maxWidth && i > 0) {
//             context.fillText(line.trim(), x, y);
//             context.strokeText(line.trim(), x, y);
//             line = word + ' ';
//             y += gCanvasFontSize; // Move to the next line
//             lines++;
//         } else {
//             line = testLine;
//         }
//     });
    
//     context.fillText(line.trim(), x, y);
//     context.strokeText(line.trim(), x, y);

//     // Call the drawTextBox function with the correct parameters after drawing the text
//     drawTextBox(context, x, y, maxWidth - 30, gCanvasFontSize * lines);
//     // console.log(gCanvasFontSize * lines , lines)

// }
// function wrapText(context, text, x, y, maxWidth, gCanvasFontSize) {
//     var words = text.split(' ');
//     var line = '';
//     var lines = 1; // Initialize with at least one line
    
//     words.forEach((word, i) => {
//         var testLine = line + word + ' ';
//         var metrics = context.measureText(testLine);
//         var testWidth = metrics.width + context.measureText(' ').width;
//         console.log('metrics', metrics.width)
//         console.log('measureText', context.measureText(' ').width)
//         console.log('testWidth', testWidth);
//         if ((testWidth > maxWidth && i > 0) || (word.length > 10)) {
//             context.fillText(line.trim(), x, y);
//             context.strokeText(line.trim(), x, y);
            
//             if (word.length > 10) {
//                 line = word + ' ';
//             } else {
//                 line = '';
//             }

//             y += gCanvasFontSize; // Move to the next line
//             lines++;
//         } else {
//             line = testLine;
//         }
//     });
    
//     context.fillText(line.trim(), x, y);
//     context.strokeText(line.trim(), x, y);

//     drawTextBox(context, x, y, maxWidth - 30, gCanvasFontSize * lines)
// }

function wrapText(context, text, x, y, maxWidth, gCanvasFontSize) {
    var words = text.split(' ');
    var line = '';
    var lines = 1; // Initialize with at least one line
    
    words.forEach((word, i) => {
        var testLine = line + word + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width + context.measureText(' ').width;
        
        if (word.length > 10) {
            // Handle words longer than 10 characters
            if (line !== '') {
                context.fillText(line.trim(), x, y);
                context.strokeText(line.trim(), x, y);
                y += gCanvasFontSize; // Move to the next line
                lines++;
            }

            context.fillText(word, x, y);
            context.strokeText(word, x, y);
            y += gCanvasFontSize; // Move to the next line
            lines++;
            line = '';
        } else if (testWidth > maxWidth && i > 0) {
            // Handle regular wrapping logic
            context.fillText(line.trim(), x, y);
            context.strokeText(line.trim(), x, y);
            line = word + ' ';
            y += gCanvasFontSize; // Move to the next line
            lines++;
        } else {
            line = testLine;
        }
    });
    
    context.fillText(line.trim(), x, y);
    context.strokeText(line.trim(), x, y);

    // Call the drawTextBox function with the correct parameters after drawing the text
    drawTextBox(context, x, y, maxWidth - 30, gCanvasFontSize * lines);
}



function drawTextBox(context, x, y, maxWidth, totalHeight) {
    context.beginPath();
    context.rect(x - maxWidth / 2 , y - totalHeight / 2  - 20, maxWidth - 10 , totalHeight);
    context.lineWidth = 2.5;
    context.stroke();
    context.closePath();
}

// Example usage:
// Assuming you have a canvas and a 2D context
// var canvas = document.getElementById('myCanvas');
// var context = canvas.getContext('2d');









function splitWord(word, length) {
    let splittedword = []
    for (let i = 0; i < word.length; i += length) {
        splittedword.push(word.substr(i, length))
    }
    return splittedword
}
