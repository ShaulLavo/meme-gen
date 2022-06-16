'use-strict'

let gElCanvas
let gCtx
//TODO remove globals from controller

function initCanvas() {
	gElCanvas = document.querySelector('.edit-modal canvas')
	gCtx = gElCanvas.getContext('2d')
}

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
	elEditModal.style.display = 'flex'
}

function onCloseModal() {
	const elGallery = document.querySelector('.img-gallery ')
	const elEditModal = document.querySelector('.edit-modal')
	elGallery.style.display = 'grid'
	elEditModal.style.display = 'none'
}

function renderMeme(id) {
	const meme = getMeme(id)
	const img = setImg(id)
	// console.log(img)
	renderImg(img)
	renderImgTxt(meme)
}

function renderImg(img) {
	// if (!img) return
	//Draw the img on the canvas
	gElCanvas.width = img.width
	gElCanvas.height = img.height
	gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderImgTxt(meme) {
	const line = meme.selectedLineIdx
	const sentence = meme.lines[line].txt
	gCtx.font = '200px Arial'
	const fontSize = fitFontSize(sentence)
	gCtx.lineWidth = 2
	gCtx.fillStyle = 'black'
	gCtx.font = `${fontSize}px Arial`
	gCtx.fillText(sentence, 0, 50)
}

function onSetLineTxt() {
	const txt = document.querySelector('.txt-input input').value
	setLineTxt(txt)
	const meme = getMeme()
	renderMeme(meme.selectedImgId)
}
