'use-strict'

let gElCanvas
let gCtx

function onImgSelect(id) {
	initCanvas()
	let meme = getMeme()
	if (!meme || !(meme.selectedImgId === id)) meme = setNewMeme(id)
	renderMeme(id)
	openEditModal()
}

function openEditModal() {
	const elGallery = document.querySelector('.img-gallery ')
	const elEditModal = document.querySelector('.edit-modal')
	elGallery.style.display = 'none'
	elEditModal.style.pointerEvents = 'auto'
	elEditModal.style.opacity = '1'
}

function renderMeme(id) {
	const meme = getMeme(id)
	setImg(id)
	renderImgTxt(meme)
}

function setImg(id) {
	const img = getImageById(id)
	const elImg = getImgEl(img)
	renderImg(elImg)
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

function renderImgTxt(meme) {
	let line = meme.selectedLineIdx
	gCtx.lineWidth = 2
	gCtx.fillStyle = 'black'
	gCtx.font = '20px Arial'
	gCtx.fillText(meme.lines[line].txt, 50, 50)
}

function onSetLineTxt() {
	const txt = document.querySelector('.txt-input input').value
	setLineTxt(txt)
	const meme = getMeme()
	renderMeme(meme.selectedImgId)
}
