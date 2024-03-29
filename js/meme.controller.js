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
  createImages()

  renderImages()
  addEventListeners()
  // resizeCanvas()

  addTouchMouseListeners()

  $('.canvas-container').hide()
  $('.meme-editor').hide()


  gCanvas = $('canvas')[0]
  gCtx = gCanvas.getContext('2d')

  gCenter = { x: gCanvas.width / 2, y: gCanvas.height / 2 }

  // window.addEventListener('resize', resizeCanvas)

  $('.meme-editor-layout').css('cursor', 'pointer')
  renderKeywords()
  $('.about-container').hide()
  $('.memes-page-container').hide()
}

function renderImages() {
  const imageContainer = $('.images-container')
  imageContainer.empty()
  const filteredImages = getImages()

  let imgElement = `<div class="upload-img">
      <label for="imageInput" class="upload-label" data-trans="imgUpload">
          Click to Upload
      </label>
      <input type="file" id="imageInput" class="image-upload-btn" 
          accept="image/*" style="display: none;">
  </div>`

  imageContainer.append(imgElement);

  filteredImages.forEach((image, index) => {
      imgElement = `
          <div class="grid-item">
              <img src="img/${image.imgUrl}"
                  alt="${image.imgAlt}"
                  data-index="${index}" />
          </div>`

      imageContainer.append(imgElement)
  })
}



function addEventListeners() {
  $('.image-upload-btn').on("change", function (event) {
    onUploadImg(event)
  })

// editor btns
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

  $('.color-input').on('input', function (event) {
    const selectedColor = event.target.value
    setTextColor(selectedColor)
  })


  $('.text-outline-color').click(function () {
    $(this).siblings('.outline-color-input').click()
  })

  $('.outline-color-input').on('input', function (event) {
    const selectedColor = event.target.value
    setTextOutline(selectedColor)
  })

  $('.search-input').on('input', handleSearch)


  $('.keywords-container').on('click', '.keyword', function (event) {
    event.preventDefault()
    const word = $(this).text()
    onKeyFillter(event, word)
  })


  $('.about-page').on('click', function(){
    $('.about-container').show()
    $('.images-container').hide()
    $('.search-container').hide()
    $('.memes-page-container').hide()
    $('.filtering-container').hide()
    $('.meme-editor-layout').hide()

  })

  $('.memes-page').on('click', function(){
    $('.memes-page-container').show()
    $('.images-container').hide()
    $('.search-container').hide()
    $('.about-container').hide()
  })



$('.mobile-toggle-menu').click(function(e) {
  e.stopPropagation()
    document.body.classList.toggle('menu-opened')
  $('.close-btn').addClass('close-toggle-btn')
  $('.main-navbar').toggle()
})

$('.close-btn').on("click",onCloseTogglebtn)

// Close navbar when clicking outside
$(document).click(function(e) {
  if ($('body').hasClass('menu-opened')) {
    if (!$(e.target).closest('.main-navbar').length &&
     !$(e.target).closest('.mobile-toggle-menu').length) {
      $('.main-navbar').hide()
      $('body').removeClass('menu-opened')
    }
  }
})



$('.grid-item img').click(function () {
  $('.meme-editor').show()
  $('.filtering-container').hide()
  $('.meme-editor-layout').addClass('flex main-layout');

  renderImageOnCanvas(this)
})

$('.upload-img').click(function () {
  $('.meme-editor').show()
  $('.filtering-container').hide()

  renderImageOnCanvas(this)
})



// window.addEventListener('resize', () => {
//   if (isMemeEditorVisible()) {
//       resizeCanvas()
//       console.log('test')
//       // renderCanvasWithContent()
//   }
// })
}



function onCloseTogglebtn() {
  $('.close-btn').remove('close-toggle-btn')
  $('.main-navbar').toggle()
  $('body').removeClass('menu-opened')
  // $('.main-navbar').hide()
}

function isMemeEditorVisible() {
  const memeEditorSection = $('.meme-editor-layout')
  console.log(memeEditorSection.hasClass('main-layout'))
  return memeEditorSection.hasClass('main-layout')
}


// function resizeCanvas() {
//   const elContainer = $('.canvas-container')
//   gElCanvas.width = elContainer[0].clientWidth
//   gElCanvas.height = elContainer[0].clientHeight
//   renderCanvasWithContent()
// }


// function resizeCanvas() {
//   const elCanvasContainer = $('.canvas-container')
//   // Changing the canvas dimension clears the canvas
//   // console.log(elCanvasContainer.clientWidth);
//   gElCanvas.width = elCanvasContainer.clientWidth - 2
// }

function onKeyFillter(event, word) {
  gFillterBy = word

  filterByKeyword(word) 
  renderKeywords()
  renderImages()
}

function onSetLang(lang){
  $('body').removeClass('lang-en lang-he').addClass('lang-' + lang)

  setLang(lang)
}

function renderKeywords() {
  const keywords = getKeywords()

  let strHtmls = ''
  Object.entries(keywords).forEach(function ([word, size]) {
    strHtmls += `
      <li class="keyword" style="font-size: ${size}px;" data-trans="${word}" class="keyword">${word}</li>`
  })

  $('.keywords-container').html(strHtmls)
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
  const txtValue = $('.text-insert').val()

  if (txtValue) {
    deleteTempIdx()

    let maxY = gCanvasFontSize / 2 * -1
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
  wrapText(text, x, y, lineSize, shouldDrawBox)
}


function onChangeLineOrder() {
  if (gMeme.lines.length <= 1) {
    return
  }
  gMeme.selectedLineIdx = (gMeme.selectedLineIdx + 1) % gMeme.lines.length
  renderCanvasWithContent()

}

