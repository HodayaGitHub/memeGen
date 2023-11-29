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

  const lineHeight = 50
  wrappedText(lineHeight)
  // gCtx.fillText(textContent, gCanvas.width / 2, gCanvas.height / 2, gCanvas.width)
  // gCtx.strokeText(gTextContent, gCanvas.width / 2, gCanvas.height / 2, gCanvas.width)

}


function onLongText() {

}


function renderCanvas() {
  gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height)
  if (gSelecedImg) {
    renderImageOnCanvas(gSelecedImg)
  }
}

// function wrappedText() {
//   let textToIterate = wrapText(gCtx, gTextContent, 85, 200, 1050, 140)
//   textToIterate.forEach(function (item) {
//     // item[0] is the text
//     // item[1] is the x coordinate 
//     // item[2] is the y coordinate 
//     gCtx.fillText(item[0], item[1], item[2])
//     gCtx.strokeText(item[0], item[1], item[2])

//   })
// }




function wrappedText(lineHeight) {
  let textToIterate = wrapText(gCtx, gTextContent, gCanvas.width / 2, gCanvas.height / 2, gCanvas.width, lineHeight)
  textToIterate.forEach(function (item) {
    gCtx.fillText(item[0], item[1], item[2])
    gCtx.strokeText(item[0], item[1], item[2])
  })
}




function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let words = text.split(' ')
  let line = '';
  let testLine = ''
  let lineArray = []

  for (let n = 0; n < words.length; n++) {
    testLine += words[n] + ' '
    let metrics = ctx.measureText(testLine)
    let testWidth = metrics.width

    if (testWidth > maxWidth && n > 0) {
      lineArray.push([line.trim(), x, y])
      y += lineHeight;
      line = words[n] + ' '
      testLine = words[n] + ' '
    } else {
      line += words[n] + ' '
    }

    if (n === words.length - 1) {
      lineArray.push([line.trim(), x, y])
    }
  }

  console.log(lineArray)
  return lineArray
}



// function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
//   let words = text.split(' ')
//   let line = ''
//   let testLine = ''
//   let lineArray = []

//   for (var n = 0; n < words.length; n++) {
//     testLine += `${words[n]} `
//     let metrics = ctx.measureText(testLine)
//     let testWidth = metrics.width
//     if (testWidth > maxWidth && n > 0) {
//       lineArray.push([line, x, y]);
//       y += lineHeight
//       line = `${words[n]} `
//       testLine = `${words[n]} `
//     }
//     else {
//       line += `${words[n]} `
//     }
//     if (n === words.length - 1) {
//       lineArray.push([line, x, y])
//     }
//   }
//   return lineArray
// }