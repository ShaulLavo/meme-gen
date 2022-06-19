'use-strict'

//TODO
/*
remove globals from controller
add min font size
add reset inputs functions
stroke color bug
auto-fit bug
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
	// document.body.style.cursor = 'grabbing'
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
	// document.body.style.cursor = 'grab'
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
	closeKeywords()
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
	const elLink = document.querySelector('.share-link')
	const elMsg = document.querySelector('.user-msg')
	elLink.innerText = ''
	elMsg.innerText = ''
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
	const ratio = 500 / img.height //max  canvas height
	gElCanvas.width = img.width *= ratio
	gElCanvas.height = img.height *= ratio
	gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderLines(meme) {
	if (!meme.lines || !meme.lines.length) return
	meme.lines.forEach(line => {
		const sentence = line.txt.trim()
		if (sentence === '') return
		const { x, y } = line.pos
		gCtx.font = `${line.size}px ${line.font}`
		line.size = fitFontSize(sentence, line.font, line.size)
		gCtx.lineWidth = 4
		gCtx.strokeStyle = line.strokeColor
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
	const txt = document.querySelector('.txt-input').value
	setLineTxt(txt)
}

function onShowLineTxt() {
	const txt = document.querySelector('.txt-input').value
	setLineTxt(txt)
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
function onAlign(side) {
	alignTxt(side)
	renderMeme()
}

function onMoveLineUp() {
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

function onFontSelect(val) {
	setFont(val)
	renderMeme()
}

function onSetColor(val) {
	setColor(val)
	renderMeme()
}

function onSetStrokeColor(val) {
	setStrokeColor(val)
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
	return { x, y, width, height }
}

function drawLineSelection() {
	//TODO add circles in corners or maybe even photoshop like animation
	const line = getCurrLine()
	const { x, y, width, height } = getLineMetrics(line)
	gCtx.setLineDash([5])
	gCtx.strokeStyle = 'black'
	gCtx.lineWidth = 1
	if (!(line.txt === '') && !line.isExport) gCtx.strokeRect(x - 4, y - 4, width + 8, height + 8)
	// handel now chars
	// adjustments to make rect a bit bigger
}

function onStickerSelect(sticker) {
	createNewLine(sticker)
	renderMeme()
}

function onDownloadMeme(elLink) {
	const meme = getMeme()
	meme.lines[gMeme.selectedLineIdx].isExport = true
	renderMeme()
	var imgContent = gElCanvas.toDataURL('image/jpeg')
	elLink.href = imgContent
	meme.lines[gMeme.selectedLineIdx].isExport = false
	renderMeme()
}

function onSave() {
	let memes = loadFromStorage('memes')
	console.log(memes)
	if (!memes) memes = []
	memes.push(gMeme)
	saveToStorage('memes', memes)
}
