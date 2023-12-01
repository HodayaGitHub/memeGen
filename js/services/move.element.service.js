// Move element on canvas
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function addTouchMouseListeners() {
    addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvasWithContent()
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
}

function addMouseListeners() {
    $(gElCanvas).on('mousemove', onMove);
    $(gElCanvas).on('mousedown', onDown);
    $(gElCanvas).on('mouseup', onUp);
}

function addTouchListeners() {
    $(gElCanvas).on('touchmove', onMove);
    $(gElCanvas).on('touchstart', onDown);
    $(gElCanvas).on('touchend', onUp);
}




function onMove(ev) {
    if (!getSelectedLine()) {
        return
    }
    const isDrag = getSelectedLine().isDrag

    if (!isDrag) return
    const pos = getEventPos(ev)
    // console.log('pos event', pos)
    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    // console.log('dx dy', dx, dy)
    moveLine(dx, dy)
    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderCanvasWithContent()
}


function getSelectedLine() {
    // console.log(gMeme.lines[gMeme.selectedLineIdx])
    return gMeme.lines[gMeme.selectedLineIdx]
}

function onDown(ev) {
    const pos = getEventPos(ev)
    console.log('pos', pos)
    if (!isLineClicked(pos)) return

    setLineDrag(true)
    gStartPos = pos
}


function onUp() {
    setLineDrag(false)

    
}

function setLineDrag(isDrag) {
    getSelectedLine().isDrag = isDrag
}


function isLineClicked(clickedPos) {
    if (gMeme.lines.length === 0) {
        return
    }
    const clickedLineIdx = gMeme.lines.findIndex(line => {
        // Calc the distance between two dots
        const distance = Math.sqrt((line.x - clickedPos.x) ** 2 + (line.y - clickedPos.y) ** 2)
        // console.log('distance', distance)
        return distance <= line.lineSize /4  * (line.text.length || 1)  
    })

    if (clickedLineIdx >= 0) {
        gMeme.selectedLineIdx = clickedLineIdx
        return true
    }

    return false
}


function getEventPos(ev) {
    let eventPos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        // Prevent triggering the mouse ev
        ev.preventDefault()
        // Gets the first touch point
        ev = ev.changedTouches[0]
        // Calc the right pos according to the touch screen
        eventPos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return eventPos
}


function moveLine(dx, dy) {
    getSelectedLine().x += dx
    getSelectedLine().y += dy
}



function renderMovedLine() {
    const { x, y, color, lineSize } = getSelectedLine()
    drawArc(x, y, color, lineSize)
}


function drawArc(x, y, size, color) {
    gCtx.beginPath()
    // canvasTextProperties()
    gCtx.lineWidth = '6'
    gCtx.arc(x, y, size, 0, 2 * Math.PI)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.fillStyle = color
    gCtx.fill()
}



