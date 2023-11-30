'use strict'

let gCanvas
let gCtx
let gSelecedImg = null
let gTextContent
let gElCanvas
let gAddInitialTxt = false
// onload
$(onInit)


function onInit() {
  gElCanvas = $('canvas')
  // console.log('test for jquery')
  renderImages()
  
  addEventListeners()
  addMouseListeners()
  addTouchListeners()
  $('.canvas-container').hide()

  gCanvas = $('canvas')[0]
  gCtx = gCanvas.getContext('2d')


  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  $('.meme-editor-layout').css('cursor','pointer')
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
    renderCanvasWithContent()
    onAddText()
  })

  $('.plus-btn').on("click", onAddNewLine)
  $('.trash-btn').on("click", renderEmptyCanvas)

}

function onAddNewLine() {
  // prevent from user to press when there's no 
  // lines otherwise it will print undifined

  if (gAddInitialTxt) {
    addNewLine(gTextContent)
  }
  // TODO: to add here a tooltip.
  // need to fix the error that appears on console
  if (!gTextContent || gMeme.lines.length === 0) {
    console.log(`There's no lines --->  
    to add here a tooltip.
    need to fix the error that appears on console`)
    return
  }
  console.log('below return')
  

  clearInput()
  gTextContent = $('.text-insert').val
}


function resizeCanvas() {
  const elCanvasContainer = $('.canvas-container')
  // Changing the canvas dimension clears the canvas
  // console.log(elCanvasContainer.clientWidth);
  gElCanvas.width = elCanvasContainer.clientWidth - 2
}

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



function onAddText(ev) {
  gTextContent = $('.text-insert').val()
  canvasTextProperties()
  gAddInitialTxt = true
}

function renderCanvasWithContent() {
  renderEmptyCanvas()

  gMeme.lines.forEach((line, index) => {
    gCtx.fillText(line, gCanvas.width / 2, index * 80 + 80, gCanvas.width)
    gCtx.strokeText(line, gCanvas.width / 2, index * 80 + 80, gCanvas.width)
  })

}
