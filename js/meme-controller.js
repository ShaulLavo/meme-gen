'use-strict'

let gElCanvas
let gCtx
let gFont = 'Impact'
let gFontSize = 200
//TODO remove globals from controller

function initCanvas() {
	gElCanvas = document.querySelector('.edit-modal canvas')
	gCtx = gElCanvas.getContext('2d')
}

function onImgSelect(id) {
	// gCurrImgId = id
	initCanvas()
	let meme = getMeme()
	if (!meme || !(meme.selectedImgId === id)) setCurrMeme(id)
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
	const line = meme.lines[meme.selectedLineIdx]
	const sentence = line.txt
	gCtx.font = `${line.size}px ${line.font}`
	line.size = fitFontSize(sentence, line.font, line.size)
	console.log(line.size)
	gCtx.lineWidth = 4
	gCtx.strokeStyle = 'white'
	gCtx.fillStyle = line.color
	gCtx.lineJoin = 'round' //this prevents wired artifacts from stroke
	gCtx.textAlign = line.align
	gCtx.font = `${line.size}px ${line.font}`
	gCtx.strokeText(sentence, gElCanvas.width / 2, gElCanvas.height / 2)
	gCtx.fillText(sentence, gElCanvas.width / 2, gElCanvas.height / 2)
}

function onSetLineTxt() {
	const txt = document.querySelector('.txt-input input').value
	setLineTxt(txt)
	const meme = getMeme()
	renderMeme(meme.selectedImgId)
}

function onFontInc() {
	setFontSize(2)
	const meme = getMeme()
	renderMeme(meme.selectedImgId)
}
function onFontDec() {
	setFontSize(-2)
	const meme = getMeme()
	renderMeme(meme.selectedImgId)
}

// align left actually aligns right cus make more sense
function onAlignLeft() {
	alignTxt('right')
	const meme = getMeme()
	renderMeme(meme.selectedImgId)
}
function onAlignRight() {
	alignTxt('left')
	const meme = getMeme()
	renderMeme(meme.selectedImgId)
}
function onAlignCenter() {
	alignTxt('center')
	const meme = getMeme()
	renderMeme(meme.selectedImgId)
}
