'use-strict'

let gElCanvas
let gCtx

function onOpenEditor(id) {
	initCanvas()
	const elGallery = document.querySelector('.img-gallery ')
	const elEditModal = document.querySelector('.edit-modal')
	renderMeme(id)
	elGallery.style.display = 'none'
	elEditModal.style.pointerEvents = 'auto'
	elEditModal.style.opacity = '1'
}

function renderMeme(id) {
	const img = getImageById(id)
	const elImg = getImgEl(img)
	renderImg(elImg)
	renderImgTxt()
}

function getImgEl(img) {
	const elImg = new Image()
	elImg.src = img.url
	return elImg
}

function getImageById(id) {
	return gImgs.find(img => img.id === id)
}

function renderImg(img) {
	// if (!img) return
	//Draw the img on the canvas
	gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function initCanvas() {
	gElCanvas = document.querySelector('.edit-modal canvas')
	gCtx = gElCanvas.getContext('2d')
}

function renderImgTxt() {
	gCtx.lineWidth = 2
	gCtx.fillStyle = 'black'
	gCtx.font = '50px Arial'
	gCtx.fillText('Hello', 100, 100)
}
