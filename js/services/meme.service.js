'use strict'
let gImages = []

function _createImg(id, imgUrl, imgAlt) {
    return {
        id,
        imgUrl,
        imgAlt,
        imgDesc: null,
    }
}



function _createImages() {
    const numbersArray = Array.from({ length: 18 }, (_, index) => index)

    gImages = numbersArray.map((index) => {
        var id = `${index + 1}`
        const imgUrl = `img/${index + 1}.jpg`
        const imgAlt = `Image ${index + 1}`
        return _createImg(id, imgUrl, imgAlt)
    })

    console.log(gImages)

}




function _saveMemsToStorage() {
    saveToStorage(STORAGE_KEY, userMems)
}


