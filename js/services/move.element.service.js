// Move element on canvas
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function addTouchMouseListeners() {
    addMouseListeners()
    // addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
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

function onUp() {
    console.log('onup')
}


function onMove(ev) {
    // const { isDrag } = getCircle()
    if(!gLine) {
        return
    }
    const isDrag = getLine().isDrag

    if (!isDrag) return
    console.log('Moving the circle')

    const pos = getEventPos(ev)
    console.log('pos event',pos )
    // Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    console.log('dx dy' , dx, dy)
    moveLine(dx, dy)
    // Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    // The canvas is render again after every move
    renderCanvas()
}


function getLine() {
    return gLine
}



function onDown(ev) {
    // console.log('onDown')
    // Get the ev pos from mouse or touch
    const pos = getEventPos(ev)
    console.log('pos', pos)
    if (!isLineClicked(pos)) return

    setLineDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function setLineDrag(isDrag) {
    gLine.isDrag = isDrag
}




//Check if the click is inside the circle 
function isLineClicked(clickedPos) {
    if(!gLine) {
        return
    }
    // const x = gLine.x
    // const y = gLine.y 
    console.log('clickedpos',clickedPos )
    console.log('gLine.x', gLine.x)
    // Calc the distance between two dots
    const distance = Math.sqrt((gLine.x - clickedPos.x) ** 2 + (gLine.y - clickedPos.y) ** 2)
    console.log('distance', distance)
    //If its smaller then the radius of the circle we are inside
    return distance <= gLine.size
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


// Move the circle in a delta, diff from the pervious pos
function moveLine(dx, dy) {
    gLine.x += dx
    gLine.y += dy
}
