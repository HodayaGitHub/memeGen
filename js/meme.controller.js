'use strict'

let gCanvas
let gCtx
let gSelecedImg = null
let gTextContent = ''

// onload
$(onInit)



function onInit() {
  console.log('test for jquery')
  renderImages()
  addEventListeners()
  $('.canvas-container').hide()

  gCanvas = $('canvas')[0]
  gCtx = gCanvas.getContext('2d')
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

  $('.text-insert').on("input", function (event) {
    renderCanvas()
    onAddText(event)
  })


  $('.trash-btn').on("click", renderCanvas)

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
  gTextContent = ev.target.value

  gCtx.font = "5rem impact bold"
  gCtx.fillStyle = "white"
  gCtx.strokeStyle = "black"
  gCtx.lineWidth = 2
  gCtx.textAlign = "center"

  const lineHeight = 80
  wrappedText(lineHeight)

  // gCtx.fillText(textContent, gCanvas.width / 2, gCanvas.height / 2, gCanvas.width)
  // gCtx.strokeText(gTextContent, gCanvas.width / 2, gCanvas.height / 2, gCanvas.width)

}

function renderCanvas() {
  gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
  if (gSelecedImg) {
    renderImageOnCanvas(gSelecedImg)
  }
}