'use-strict'

let gElCanvas
let gCtx
let gInterval
//TODO remove globals from controller

function initCanvas() {
	gElCanvas = document.querySelector('.edit-modal canvas')
	gCtx = gElCanvas.getContext('2d')
}

function onImgSelect(id) {
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
	renderLine(meme)
}

function renderImg(img) {
	// if (!img) return
	//Draw the img on the canvas
	gElCanvas.width = img.width
	gElCanvas.height = img.height
	gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderLine(meme) {
	const line = meme.lines[meme.selectedLineIdx]
	const sentence = line.txt
	const { x, y } = line.pos
	gCtx.font = `${line.size}px ${line.font}`
	line.size = fitFontSize(sentence, line.font, line.size)
	gCtx.lineWidth = 4
	gCtx.strokeStyle = 'black'
	gCtx.fillStyle = line.color
	gCtx.lineJoin = 'round' //this prevents wired artifacts from stroke
	gCtx.textAlign = line.align
	gCtx.font = `${line.size}px ${line.font}`
	gCtx.strokeText(sentence, x, y)
	gCtx.fillText(sentence, x, y)
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

function onMoveLineUp() {
	//there is a bug when
	//user releases the mouse outside the btn
	//and interval goes off forever
	gInterval = setInterval(() => {
		moveLine(-2)
		const meme = getMeme()
		renderMeme(meme.selectedImgId)
	}, 10)
}

function onStopLineUp() {
	clearInterval(gInterval)
}

function onMoveLineDown() {
	gInterval = setInterval(() => {
		moveLine(2)
		const meme = getMeme()
		renderMeme(meme.selectedImgId)
	}, 10)
}

function onStopLineDown() {
	clearInterval(gInterval)
}

// ? what's wrong with this code?
// onmousedown="onMoveLineUp(true)" onmouseup="onStopLineUp(false)"
// function onMoveLineUp(isPressed) {
// 	if (isPressed) {
// 		const interval = setInterval(() => {
// 			moveLine(-2)
// 			const meme = getMeme()
// 			renderMeme(meme.selectedImgId)
// 		}, 100)
// 	}
// 	else clearInterval(interval)
// }

function onFontSelect(val) {
	setFont(val)
	const meme = getMeme()
	renderMeme(meme.selectedImgId)
}

function onSetColor(val) {
	setColor(val)
	const meme = getMeme()
	renderMeme(meme.selectedImgId)
}
