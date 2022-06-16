'use-strict'

const gImgs = []
const gImgCount = 16

function init() {
	createImgDb()
	renderMemeGallery()
}

function createImgDb() {
	for (let i = 0; i < gImgCount; i++) {
		gImgs.push({
			id: i,
			url: `assets/meme-imgs/${i}.jpg`,
			keywords: ['funny', 'cat']
		})
	}
}

// const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
