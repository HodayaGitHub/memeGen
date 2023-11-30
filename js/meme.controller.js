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

  $('.text-insert').on("input", function () {
    onAddText()
  })

  $('.plus-btn').on("click", onAddNewLine)
  $('.switchLines').on("click")
  $('.trash-btn').on("click", function () {
    gMeme.lines = []
    renderEmptyCanvas()
  });

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
    let maxY = gCanvasFontSize * -1
    gMeme.lines.forEach(line => {
      if (line.y > maxY) {
        maxY = line.y;
      }
    })
    addNewLine(txtValue, gCenter.x, maxY + gCanvasFontSize)
    $('.text-insert').val('')
    renderCanvasWithContent()
  }
}

function onAddText(ev) {
  renderCanvasWithContent()
  const line = {
    text: $('.text-insert').val(),
    x: gCenter.x,
    y: gCenter.y
  }

  renderLineOnCanvas(line)
}

function renderCanvasWithContent() {
  renderEmptyCanvas()

  gMeme.lines.forEach((line) => {
    renderLineOnCanvas(line)
  })

}

function renderLineOnCanvas(line) {
  canvasTextProperties()
  const { text, x, y } = line

  wrapText(text, x, y, gCanvasFontSize)

  // console.log(gCanvas.width + 'width')
  // console.log(gCanvasFontSize + 'height')
}

