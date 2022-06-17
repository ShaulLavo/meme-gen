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

let gMeme

function getMeme(id) {
	return gMeme
}

function setCurrMeme(id) {
	gMeme = {
		isAutoFitSize: true, //auto fit size feature
		selectedImgId: id,
		selectedLineIdx: 0,
		lines: [
			{
				txt: getRandSentence(memesSentences),
				size: 200,
				align: 'center',
				color: 'white',
				font: 'Impact',
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
	let line = gMeme.selectedLineIdx
	gMeme.lines[line].txt = txt
	gMeme.isAutoFitSize = true
}

//TODO bug - this scales all lines not only the selected one
// auto fit font size feature
function fitFontSize(sentence, font, size) {
	if (!gMeme.isAutoFitSize) return size
	if (gCtx.measureText(sentence).width > gElCanvas.width) {
		console.log('hi')
		while (gCtx.measureText(sentence).width > gElCanvas.width) {
			size--
			gCtx.font = `${size}px ${font}`
		}
	} else {
		while (gCtx.measureText(sentence).width < gElCanvas.width) {
			size++
			gCtx.font = `${size}px ${font}`
		}
	}
	return size
}

function setFontSize(num) {
	if (gMeme.lines[gMeme.selectedLineIdx].size > 200) num *= 10 // make it easier to adjust big font sizes
	gMeme.lines[gMeme.selectedLineIdx].size += num
}

// function alignTxt(side) {
// 	gMeme.lines[gMeme.selectedLineIdx].align = side
// }

function alignTxt(side) {
	const line = gMeme.lines[gMeme.selectedLineIdx]
	const pos = line.pos
	const { width } = getLineMetrics(gMeme.lines[gMeme.selectedLineIdx])
	switch (side) {
		case 'right':
			pos.x = gElCanvas.width - width / 2
			console.log(pos.x)
			break
		case 'left':
			pos.x = width / 2
			console.log(pos.x)
			break
		case 'center':
			pos.x = gElCanvas.width / 2
			console.log(pos.x)
		default:
			break
	}
}

function moveLine(dy, dx = 0) {
	const currLine = gMeme.lines[gMeme.selectedLineIdx]
	currLine.pos.y += dy
	currLine.pos.x += dx
}

function setFont(font) {
	const currLine = gMeme.lines[gMeme.selectedLineIdx]
	currLine.font = font
	gMeme.isAutoFitSize = true //fit to new font size
}
1
function setColor(val) {
	const currLine = gMeme.lines[gMeme.selectedLineIdx]
	currLine.color = val
}

function createNewLine() {
	gMeme.lines.push({
		txt: getRandSentence(memesSentences),
		size: 200,
		align: 'center',
		color: 'white',
		font: 'Impact',
		pos: { x: 250, y: 250 },
		isDrag: false
	})
	gMeme.isAutoFitSize = true
	gMeme.selectedLineIdx = gMeme.lines.length - 1 //set last added line to current
}

function deleteLine() {
	const idx = gMeme.selectedLineIdx
	gMeme.lines.splice(idx, 1)
}

function setLineMetrics(metrics, line) {
	line.metrics = metrics
}

function setLineDrag(bol) {
	const line = gMeme.lines[gMeme.selectedLineIdx]
	if (!line) return
	line.isDrag = bol
}

// function setClickedLine(clickedPos) {
// 	const { pos } = gMeme.lines[gMeme.selectedLineIdx]

// }
