'use strict'
let gImages = []

function _createImg(imgUrl, imgAlt){
    return {
        imgUrl, 
        imgAlt, 
        imgDesc: null,
    }
}



function _createImages(){
    const numbersArray = Array.from({ length: 19 }, (_, index) => index)

     gImages = numbersArray.map((index) => {
        const imgUrl = `img/${index}.png`
        const imgAlt = `Image ${index}`
        return _createImg(imgUrl, imgAlt)
    })

}

_createImages()
console.log(gImages)