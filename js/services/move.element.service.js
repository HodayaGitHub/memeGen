

// Move element on canvas

// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()

//     //Listen for resize ev
//     window.addEventListener('resize', () => {
//         resizeCanvas()

//         renderCanvas()
//     })
// }



function addMouseListeners() {
    // $(gElCanvas).on('mousedown', onDown);
    $(gElCanvas).on('mousemove', onMove);
    $(gElCanvas).on('mouseup', onUp);
}

function addTouchListeners() {
    // $(gElCanvas).on('touchstart', onDown);
    $(gElCanvas).on('touchmove', onMove);
    $(gElCanvas).on('touchend', onUp);
}


// function onDown(ev) {
//     console.log('onDown')
//     // Get the ev pos from mouse or touch
//     const pos = getEvPos(ev)

//     if (!isCircleClicked(pos)) return

//     setCircleDrag(true)
//     //Save the pos we start from
//     gStartPos = pos
// }

// function onMove(ev) {
//     console.log('onDown')

//     const { isDrag } = getCircle()
//     if (!isDrag) return
//     console.log('Moving the circle')

//     const pos = getEvPos(ev)
//     // Calc the delta, the diff we moved
//     const dx = pos.x - gStartPos.x
//     const dy = pos.y - gStartPos.y
//     // moveCircle(dx, dy)

//     // Save the last pos, we remember where we`ve been and move accordingly
//     gStartPos = pos
//     // The canvas is render again after every move
//     renderCanvas()
// }

// function onUp() {
//     // console.log('onUp')
//     setCircleDrag(false)
// }


//     if (TOUCH_EVS.includes(ev.type)) {
//         // Prevent triggering the mouse ev
//         ev.preventDefault()
//         // Gets the first touch point
//         ev = ev.changedTouches[0]
//         // Calc the right pos according to the touch screen
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
//             y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
//         }
//     }
//     return pos
// }



// function getEvPos(ev) {

//     let pos = {
//         x: ev.offsetX,
//         y: ev.offsetY,
//     }

function onMove(ev) {
    const pos = getEvPos(ev);

    if (gMeme.draggedLineIdx !== -1) {
        gMeme.lines[gMeme.draggedLineIdx].x = pos.x;
        gMeme.lines[gMeme.draggedLineIdx].y = pos.y;
        renderCanvas();
    }
    // ... rest of your onMove logic
}

function onUp() {
    gMeme.draggedLineIdx = -1;
    // ... rest of your onUp logic
}

function findDraggedLine(pos) {
    // Iterate through lines and check if the mouse/touch is over a line
    for (let i = 0; i < gMeme.lines.length; i++) {
        const line = gMeme.lines[i];
        const textWidth = gCtx.measureText(line.text).width;

        if (
            pos.x >= line.x - textWidth / 2 &&
            pos.x <= line.x + textWidth / 2 &&
            pos.y >= line.y - lineHeight / 2 &&
            pos.y <= line.y + lineHeight / 2
        ) {
            return i;
        }
    }

    return -1;  // No line found
}


// function moveCircle(dx, dy) {
//     gLine.pos.x += dx
//     gCircle.pos.y += dy
// }



function getEvPos(ev) {
    return {
        x: ev.offsetX,
        y: ev.offsetY,
    }

}
