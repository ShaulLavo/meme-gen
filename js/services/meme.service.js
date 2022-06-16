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

function alignTxt(side) {
	//TODO this aligns relative to center maybe just put text on edge of canvas
	gMeme.lines[gMeme.selectedLineIdx].align = side
}

function moveLine(num) {
	const currLine = gMeme.lines[gMeme.selectedLineIdx]
	currLine.pos.y += num
}

function setFont(font) {
	const currLine = gMeme.lines[gMeme.selectedLineIdx]
	currLine.font = font
	gMeme.isAutoFitSize = true //fit to new font size
}

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
		pos: { x: 250, y: 250 }
	})
	gMeme.isAutoFitSize = true
	gMeme.selectedLineIdx++
	console.log('selectedLineIdx', gMeme.selectedLineIdx)
}

function deleteLine() {
	const idx = gMeme.selectedLineIdx
	gMeme.lines.splice(idx, 1)
}

// function setLinePos() {
// 	const canvas = gElCanvas
// 	const currLine = gMeme.lines[gMeme.selectedLineIdx]
// 	currLine.pos.x = canvas.width / 2
// 	currLine.pos.y = canvas.height / 2
// }
