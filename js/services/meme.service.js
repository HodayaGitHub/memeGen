'use strict'
let gImages = []

function _createImg(imgUrl, imgAlt) {
    return {
        imgUrl,
        imgAlt,
        imgDesc: null,
    }
}



function _createImages() {
    const numbersArray = Array.from({ length: 18 }, (_, index) => index)

    gImages = numbersArray.map((index) => {
        const imgUrl = `img/${index + 1}.jpg`
        const imgAlt = `Image ${index + 1}`
        return _createImg(imgUrl, imgAlt)
    })
}




console.log(gImages)
