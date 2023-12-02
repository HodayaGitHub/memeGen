'use strict'

let gCanvas
let gCtx
let gSelecedImg = null
let gElCanvas
let gCenter

// onload
$(onInit)


function onInit() {
  gElCanvas = $('.canvas')
  // console.log('test for jquery')
  renderImages()

  addEventListeners()
  addTouchMouseListeners()

  $('.canvas-container').hide()

  gCanvas = $('canvas')[0]
  gCtx = gCanvas.getContext('2d')

  gCenter = { x: gCanvas.width / 2, y: gCanvas.height / 2 }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  $('.meme-editor-layout').css('cursor', 'pointer')
}


function renderImages() {
  _createImages()
  const imageContainer = $('.images-container')
  // imageContainer.html('')

  gImages.forEach((image, index) => {
    const imgElement = `
      <div class="grid-item">
      <img  src="${image.imgUrl}"
      alt="${image.imgAlt}" 
      data-index="${index}">
      </img>
      </div>`
    imageContainer.append(imgElement)
  })
  // id="img#${image.id}"
}


function addEventListeners() {
  $('.grid-item img').click(function () {
    renderImageOnCanvas(this)
  })

  $('.image-upload-btn').on("change", function (event) {
    onUploadImg(event)
  })


  $('.text-insert').on("input", onAddText)
  $('.plus-btn').on("click", onAddNewLine)
  $('.switch-lines').on("click", onChangeLineOrder)
  $('.trash-btn').on("click", onTrashBtn)

  $('.increase-font').click(function () {
    onChangeFontSize('increase')
  })
  $('.decrease-font').click(function () {
    onChangeFontSize('decrease')
  })

  // alignment: 
  $('.align-left').click(function () {
    onChangeAlignment('left')
  })
  $('.align-center').click(function () {
    onChangeAlignment('center')
  })
  $('.align-right').click(function () {
    onChangeAlignment('right')
  })

// change text / outline color 
  $('.text-color-input').click(function () {
    $(this).siblings('.color-input').click()
  })

  $('.text-outline-color').click(function () {
    $(this).siblings('.color-input').click()
  })

  $('.color-input').on('input', function (event) {
    const selectedColor = event.target.value
    setTextColor(selectedColor)
  })



}


function onChangeAlignment(alignDirection) {
  if (!getSelectedLine()) {
    return
  }
  setAlignment(alignDirection)

}

function onChangeFontSize(changeSizeType) {
  if (!getSelectedLine()) {
    return
  }

  setFontSize(changeSizeType)
}


function onTrashBtn() {
  gMeme.lines = []
  $('.text-insert').val('')
  renderEmptyCanvas()
}

// function resizeCanvas() {
//   const elCanvasContainer = $('.canvas-container')
//   // Changing the canvas dimension clears the canvas
//   // console.log(elCanvasContainer.clientWidth);
//   gElCanvas.width = elCanvasContainer.clientWidth - 2
// }

function renderImageOnCanvas(clickedImg) {
  $('.images-container').hide()
  $('.canvas-container').show()


  gSelecedImg = clickedImg
  onSelectImg(clickedImg)
}

function onUploadImg(event) {
  const file = event.target.files[0]
  let img = new Image()
  img.onload = function () {
    renderImageOnCanvas(img)
  }
  img.src = URL.createObjectURL(file)
}

function onSelectImg(image) {
  gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height)
}


function onAddNewLine() {
  // prevent from user to press when there's no 
  // lines otherwise it will print undifined
  const txtValue = $('.text-insert').val()

  if (txtValue) {
    deleteTempIdx()

    let maxY = gCanvasFontSize * -1
    gMeme.lines.forEach(line => {
      if (line.y > maxY) {
        maxY = line.y
      }
    })

    addNewLine(txtValue, gCenter.x, maxY + gCanvasFontSize, true)
    $('.text-insert').val('')
    renderCanvasWithContent()
  }
}

function deleteTempIdx() {
  let tempIdx = gMeme.lines.findIndex(line => !line.isTxtSave)
  if (tempIdx >= 0) {
    gMeme.lines.splice(tempIdx, 1)
  }
}

function onAddText(ev) {
  const line = {
    text: $('.text-insert').val(),
    x: gCenter.x,
    y: gCenter.y
  }

  addNewLine(line.text, line.x, line.y, false)
  renderCanvasWithContent()
}

function renderCanvasWithContent() {
  renderEmptyCanvas()

  gMeme.lines.forEach((line, index) => {
    renderLineOnCanvas(line, index)
  })
}

function renderLineOnCanvas(line, index) {
  canvasTextProperties(line)
  const { text, x, y, isTxtSave, lineSize } = line

  const shouldDrawBox = !isTxtSave || index === gMeme.selectedLineIdx
  // setAlignment(alignDirection)
  wrapText(text, x, y, lineSize, shouldDrawBox)
}



function onChangeLineOrder() {
  if (gMeme.lines.length <= 1) {
    return
  }
  gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
  renderCanvasWithContent()

}