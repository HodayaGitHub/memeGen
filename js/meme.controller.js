'use strict'
// onload
$(onInit)



function onInit() {
    console.log('test for jquery')
    renderImages()
  }



  
function renderImages() {
  _createImages()
  const imageContainer = $('.images-container')
  // imageContainer.html('')

  gImages.forEach((image, index) => {
      const imgElement = `
      <div class="grid-item">
      <img src="${image.imgUrl}"
      alt="${image.imgAlt}" 
      data-index="${index}">
      </img>
      </div>`
      imageContainer.append(imgElement)
  })
}
