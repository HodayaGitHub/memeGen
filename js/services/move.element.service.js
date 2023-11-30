

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
    $(gElCanvas).on('mousedown', onDown);
    $(gElCanvas).on('mousemove', onMove);
    $(gElCanvas).on('mouseup', onUp);
}

function addTouchListeners() {
    $(gElCanvas).on('touchstart', onDown);
    $(gElCanvas).on('touchmove', onMove);
    $(gElCanvas).on('touchend', onUp);
}


function onDown(ev) {
    console.log('onDown')
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)

    if (!isCircleClicked(pos)) return

    setCircleDrag(true)
    //Save the pos we start from
    gStartPos = pos
}

function onMove(ev) {
    console.log('onDown')

    const { isDrag } = getCircle()
    if (!isDrag) return
    console.log('Moving the circle')

    const pos = getEvPos(ev)
    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    // moveCircle(dx, dy)

    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderCanvas()
}

function onUp() {
    // console.log('onUp')
    setCircleDrag(false)
}


function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}



function moveCircle(dx, dy) {
    gLine.pos.x += dx
    gCircle.pos.y += dy
}

