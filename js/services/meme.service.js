const memesSentences = [
	'I never eat falafel',
	'DOMS DOMS EVERYWHERE',
	'Stop Using i in for loops',
	'Armed in knowledge',
	'Js error "Unexpected String"',
	'One does not simply write js',
	'I`m a simple man i see vanilla JS, i click like!',
	'JS, HTML,CSS?? Even my momma can do that',
	'May the force be with you',
	'I know JS',
	'JS Where everything is made up and the rules dont matter',
	'Not sure if im good at programming or good at googling',
	'But if we could',
	'JS what is this?',
	'Write hello world , add to cv 7 years experienced'
]
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
let gElCanvas
let gCtx
let gInterval
let gMeme

function getMeme(id) {
	return gMeme
}

function setCurrMeme(id) {
	gMeme = {
		selectedImgId: id,
		selectedLineIdx: 0,
		lines: [
			{
				txt: getRandSentence(memesSentences),
				size: 200,
				align: 'center',
				color: 'white',
				strokeColor: 'black',
				font: 'Impact',
				isAutoFitSize: true, //auto fit size on creation and font change
				pos: { x: 250, y: 250 }
			}
		]
	}
}

function setImg(id) {
	const img = getImageById(id)
	const elImg = getImgEl(img)
	return elImg
}

function getImgEl(img) {
	const elImg = new Image()
	elImg.src = img.url
	return elImg
}

function getImageById(id) {
	return gImgs.find(img => img.id === id)
}

function setLineTxt(txt) {
	let line = getCurrLine()
	if (!line) {
		createNewLine()
		line = getCurrLine()
	}
	line.txt = txt
}

// auto fit font size feature
function fitFontSize(line, sentence, font, size) {
	if (!line.isAutoFitSize) return size
	if (gCtx.measureText(sentence).width > gElCanvas.width) {
		while (gCtx.measureText(sentence).width > gElCanvas.width) {
			size--
			gCtx.font = `${size}px ${font}`
		}
	} else {
		while (gCtx.measureText(sentence).width <= gElCanvas.width) {
			size++
			gCtx.font = `${size}px ${font}`
		}
	}
	if (size > 200) size = 200
	line.isAutoFitSize = false
	return size
}

function setFontSize(num) {
	if (getCurrLine().size > 200) num *= 10 // make it easier to adjust big font sizes
	getCurrLine().size += num
}

// function alignTxt(side) {
// 	getCurrLine().align = side
// }

function alignTxt(side) {
	const line = getCurrLine()
	console.log(line)
	const pos = line.pos
	const { width } = getLineMetrics(getCurrLine())
	switch (side) {
		case 'right':
			pos.x = gElCanvas.width - width / 2
			break
		case 'left':
			pos.x = width / 2
			break
		case 'center':
			pos.x = gElCanvas.width / 2
		default:
			break
	}
}

function moveLine(dy, dx = 0) {
	const currLine = getCurrLine()
	currLine.pos.y += dy
	currLine.pos.x += dx
}

function setFont(font) {
	const currLine = getCurrLine()
	currLine.font = font
	currLine.isAutoFitSize = true
	gMeme.isAutoFitSize = true //fit to new font size
}

function setColor(val) {
	const currLine = getCurrLine()
	currLine.color = val
}

function setStrokeColor(val) {
	const currLine = getCurrLine()
	currLine.strokeColor = val
}

function createNewLine(txt = getRandSentence(memesSentences)) {
	gMeme.lines.push({
		txt,
		size: 200,
		align: 'center',
		color: 'white',
		strokeColor: 'black',
		font: 'Impact',
		pos: { x: gElCanvas.width / 2, y: gElCanvas.height / 2 },
		isDrag: false,
		isExport: false,
		isAutoFitSize: true
	})
	gMeme.selectedLineIdx = gMeme.lines.length - 1 //set last added line to current
}

function deleteLine() {
	const idx = gMeme.selectedLineIdx
	gMeme.lines.splice(idx, 1)
	gMeme.selectedLineIdx = 0
}

function setLineMetrics(metrics, line) {
	line.metrics = metrics
}

function setLineDrag(bol) {
	const line = getCurrLine()
	if (!line) return
	line.isDrag = bol
}

function getCurrLine() {
	return gMeme.lines[gMeme.selectedLineIdx]
}

function getLineMetrics(line) {
	const metrics = line.metrics
	const width = metrics.width
	const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
	const x = line.pos.x - metrics.actualBoundingBoxLeft
	const y = line.pos.y - metrics.actualBoundingBoxAscent
	return { x, y, width, height }
}
