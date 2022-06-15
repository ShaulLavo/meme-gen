'use-strict'

const gImgs = []
const gImgCount = 16

function init() {
	createMemeDb()
	renderMemeGallery()
}

function createMemeDb() {
	for (let i = 0; i < gImgCount; i++) {
		gImgs.push({
			id: i,
			url: `meme-imgs/${i}.jpg`,
			keywords: ['funny', 'cat']
		})
	}
}

// const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
// const gMeme = {
// 	selectedImgId: 5,
// 	selectedLineIdx: 0,
// 	lines: [
// 		{
// 			txt: 'I sometimes eat Falafel',
// 			size: 20,
// 			align: 'left',
// 			color: 'red'
// 		}
// 	]
// }
