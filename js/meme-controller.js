'use-strict'

//TODO
/*
remove globals from controller
add min font size
make a hard coded array of imgs
add reset inputs functions
clean code with dome distraction
! when dragging from edge of txt it jumps -- calculate center of shape as starting point
*/
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
let gElCanvas
let gCtx
let gInterval

function initCanvas() {
	gElCanvas = document.querySelector('.edit-modal canvas')
	gCtx = gElCanvas.getContext('2d')
	addListeners()
}

function addListeners() {
	addMouseListeners()
	addTouchListeners()
}

function addMouseListeners() {
	gElCanvas.addEventListener('mousemove', onMove)
	gElCanvas.addEventListener('mousedown', onDown)
	gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
	gElCanvas.addEventListener('touchmove', onMove)
	gElCanvas.addEventListener('touchstart', onDown)
	gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
	//Get the ev pos from mouse or touch
	const pos = getEvPos(ev)
	if (!isLineClicked(pos)) return
	setLineDrag(true)
	document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
	const line = getMeme().lines[gMeme.selectedLineIdx]
	if (!line) return
	if (line.isDrag) {
		const pos = getEvPos(ev)
		const startPos = line.pos
		//Calc the delta , the diff we moved
		const dy = pos.y - startPos.y
		const dx = pos.x - startPos.x
		moveLine(dy, dx)
		renderMeme(gMeme.selectedImgId)
	}
}

function onUp() {
	setLineDrag(false)
	document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
	//Gets the offset pos , the default pos
	var pos = {
		x: ev.offsetX,
		y: ev.offsetY
	}
	// Check if its a touch ev
	if (gTouchEvs.includes(ev.type)) {
		//soo we will not trigger the mouse ev
		ev.preventDefault()
		//Gets the first touch point
		ev = ev.changedTouches[0]
		//Calc the right pos according to the touch screen
		pos = {
			x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
			y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
		}
	}
	return pos
}
function isLineClicked(pos) {
	const evX = pos.x
	const evY = pos.y
	const meme = getMeme()
	return meme.lines.some((line, idx) => {
		const { x, y, width, height } = getLineMetrics(line)
		setSelectedLine(idx)
		return evX >= x && evX <= x + width && evY >= y && evY <= y + height
	})
}

function setSelectedLine(idx) {
	const meme = getMeme()
	meme.selectedLineIdx = idx
	renderMeme(meme.selectedImgId)
}

function onImgSelect(id) {
	initCanvas()
	let meme = getMeme()
	if (!meme || !(meme.selectedImgId === id)) {
		setCurrMeme(id)
	}
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

function renderMeme() {
	const id = getMeme().selectedImgId
	const meme = getMeme(id)
	const img = setImg(id)
	// console.log(img)
	renderImg(img)
	renderLines(meme)
}

function renderImg(img) {
	// if (!img) return
	//Draw the img on the canvas
	gElCanvas.width = img.width
	gElCanvas.height = img.height
	gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
//todo: implement size-2 to adjust for stroke size
function renderLines(meme) {
	if (!meme.lines || !meme.lines.length) return
	meme.lines.forEach(line => {
		const sentence = line.txt
		const { x, y } = line.pos
		gCtx.font = `${line.size}px ${line.font}`
		line.size = fitFontSize(sentence, line.font, line.size)
		gCtx.lineWidth = 4
		gCtx.strokeStyle = 'black'
		gCtx.fillStyle = line.color
		gCtx.lineJoin = 'round'
		gCtx.textAlign = line.align
		gCtx.font = `${line.size}px ${line.font}`
		setLineMetrics(gCtx.measureText(sentence), line)
		gCtx.strokeText(sentence, x, y)
		gCtx.fillText(sentence, x, y)
	})
	gMeme.isAutoFitSize = false
	drawLineSelection()
}

function onSetLineTxt() {
	const txt = document.querySelector('.txt-input input').value
	setLineTxt(txt)
}

function onShowLineTxt() {
	const txt = document.querySelector('.txt-input input').value
	renderMeme()
}

function onFontInc() {
	setFontSize(2)
	renderMeme()
}
function onFontDec() {
	setFontSize(-2)
	renderMeme()
}

// align left actually aligns right cus make more sense
//todo make align to edge + refactor to switch case
function onAlign(side) {
	alignTxt(side)
	renderMeme()
}

function onMoveLineUp() {
	//!bug
	//when user releases the mouse outside the btn
	//the interval goes off forever
	//not sure if workaround is possible
	gInterval = setInterval(() => {
		moveLine(-1)
		renderMeme()
	}, 10)
}

function onStopLineUp() {
	clearInterval(gInterval)
}

function onMoveLineDown() {
	gInterval = setInterval(() => {
		moveLine(1)
		renderMeme()
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
// 			renderMeme()
// 		}, 100)
// 	}
// 	else clearInterval(interval)
// }

function onFontSelect(val) {
	setFont(val)
	renderMeme()
}

function onSetColor(val) {
	setColor(val)
	renderMeme()
}

function onAddLine() {
	createNewLine()
	renderMeme()
}

function onDeleteLine() {
	deleteLine()
	renderMeme()
	const meme = getMeme()
	meme.selectedLineIdx--
}

function getLineMetrics(line) {
	const metrics = line.metrics
	const width = metrics.width
	const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
	const x = line.pos.x - metrics.actualBoundingBoxLeft
	const y = line.pos.y - metrics.actualBoundingBoxAscent
	const right = line.pos.x - metrics.actualBoundingBoxRight
	return { x, y, width, height, right }
}

function drawLineSelection() {
	//TODO add circles in corners or maybe even photoshop like animation
	const { x, y, width, height } = getLineMetrics(gMeme.lines[gMeme.selectedLineIdx])
	gCtx.setLineDash([5])
	gCtx.lineWidth = 1
	gCtx.strokeRect(x - 4, y - 4, width + 8, height + 8) // adjustments to make rect a bit bigger
}
