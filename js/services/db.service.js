'use strict'
let gImages = []


const gKeywordSearchCountMap = {
    all: 30,
    funny: 25,
    Awkward: 21,
    baby: 17,
    happy: 20,
    angry: 21,
    people: 24,
    politics: 18,
    cute: 20,
    crazy: 15,
    animal: 19,
}


function _createImage(id, imgUrl, imgAlt, keywords) {
    return {
        id,
        imgUrl,
        imgAlt,
        keywords,
    }
     
}

function createImages() {
  return gImages = [
        _createImage(1,'1.jpg', '1.jpg', ['people', 'angry', 'politics']),
        _createImage(2, '2.jpg', '2.jpg', ['animal', 'cute', 'happy']),
        _createImage(3, '3.jpg', '3.jpg', ['baby', 'cute', 'animal']),
        _createImage(4, '4.jpg', '4.jpg', ['animal', 'cute']),
        _createImage(5, '5.jpg', '5.jpg', ['baby', 'happy', 'funny']),
        _createImage(6, '6.jpg', '6.jpg', ['people', 'crazy']),
        _createImage(7, '7.jpg', '7.jpg', ['funny', 'baby', 'cute', 'happy']),
        _createImage(8, '8.jpg', '8.jpg', ['funny', 'people', 'crazy']),
        _createImage(9, '9.jpg', '9.jpg', ['funny', 'baby', 'cute', 'happy']),
        _createImage(10, '10.jpg', '10.jpg', ['politics', 'happy', 'people']),
        _createImage(11, '11.jpg', '11.jpg', ['awkward', 'funny', 'people']),
        _createImage(12, '12.jpg', '12.jpg', ['people', 'crazy', 'sad', 'awkward']),
        _createImage(13, '13.jpg', '13.jpg', ['people', 'happy']),
        _createImage(14, '14.jpg', '14.jpg', ['people', 'crazy', 'angry']),
        _createImage(15, '15.jpg', '15.jpg', ['crazy', 'people']),
        _createImage(16, '16.jpg', '16.jpg', ['funny', 'happy', 'people']),
        _createImage(17, '17.jpg', '17.jpg', ['politics', 'crazy', 'angry']),
        _createImage(18, '18.jpg', '18.jpg', ['funny', 'happy']),
        _createImage(19, '19.jpg', '19.jpg', ['funny', 'happy'])
        
    ]
    
}
