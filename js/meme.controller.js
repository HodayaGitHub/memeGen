'use strict'

let gCanvas
let gCtx


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
}


function renderImageOnCanvas(clickedImg) {
  $('.images-container').hide()
  $('.canvas-container').show()
  // const elImgSrc = clickedImg.currentSrc
  onSelectImg(clickedImg)
}



function onSelectImg(image) {
    gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height)

}
