'use strict'

let gFillterBy = 'all'

function _createImg(id, imgUrl, imgAlt) {
    return {
        id,
        imgUrl,
        imgAlt,
        imgDesc: null,
    }
}


function getKeywords(isAllKeys) {
    if (isAllKeys) return gKeywordSearchCountMap
    else {
      const { all, funny, animal, akward, happy, angry } = gKeywordSearchCountMap
      return { all, funny, animal, akward, happy, angry }
    }
}

function getImages() {
    if (gFillterBy === 'all') return gImages
    return gImages.filter((img) => img.keywords.includes(gFillterBy))
  }


function handleSearch() {
    const searchInput = $('.search-input').val().toLowerCase()
    const keywords = getKeywords(false)
    const matchedKeyword = Object.keys(keywords).find(keyword =>
        keyword.toLowerCase() == searchInput
    )
    gFillterBy = matchedKeyword || 'all'

    
    renderImages()
}