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

function setNewMeme(id) {
	gMeme = {
		selectedImgId: id,
		selectedLineIdx: 0,
		lines: [
			{
				txt: getRandSentence(memesSentences),
				size: 20,
				align: 'left',
				color: 'black'
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

function fitFontSize(sentence) {
	let fontSize = 200
	console.log(gElCanvas.width)
	while (gCtx.measureText(sentence).width > gElCanvas.width) {
		fontSize--
		gCtx.font = `${fontSize}px Arial`
	}
	return fontSize
}
