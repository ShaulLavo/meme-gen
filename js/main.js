<<<<<<< HEAD
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
=======
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
			url: `../../meme-imgs/${i}.jpg`,
			keywords: ['funny', 'cat']
		})
	}
}

function renderMemeGallery() {
	//TODO refactor this maybe w/o background

	//add containers to gallery
	const elGallery = document.querySelector('.img-gallery')
	gImgs.forEach(img => {
		elGallery.innerHTML += `<div class="img img${img.id}"></div>`
	})

	// add background image to containers
	const elImgs = document.querySelectorAll('.img')
	gImgs.forEach(img => {
		elImgs[img.id].style.backgroundImage = `url(${img.url})`
	})
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
>>>>>>> f474c49676bcd0727355cd3434d48b6de4646d1a
