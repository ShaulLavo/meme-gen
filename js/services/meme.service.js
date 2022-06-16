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
let gIsAutoFitSize = true // let's user override auto fit size feature

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
				align: 'left',
				color: 'black',
				font: 'Impact'
			}
		]
	}
}

function setLineTxt(txt) {
	let line = gMeme.selectedLineIdx
	gMeme.lines[line].txt = txt
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

// auto fit font size feature
function fitFontSize(sentence, font, size) {
	if (!gIsAutoFitSize) return size
	while (gCtx.measureText(sentence).width > gElCanvas.width) {
		size--
		gCtx.font = `${size}px ${font}`
	}
	gIsAutoFitSize = false
	return size - 2 // -2 adjusts for stroke
}

function setFontSize(num) {
	gMeme.lines[gMeme.selectedLineIdx].size += num
}
