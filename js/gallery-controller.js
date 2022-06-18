'use-strict'

function init() {
	renderMemeGallery()
	renderKeyWordBar()
}

function renderMemeGallery(filterBy) {
	//add containers to gallery
	const imgs = getImgsForDisplay(filterBy)
	console.log(imgs)
	const elGallery = document.querySelector('.img-gallery')
	elGallery.innerHTML = ''
	imgs.forEach(img => {
		elGallery.innerHTML += `<div onclick='onImgSelect(${img.id})' class="img img${img.id}"></div>`
		// add background image to containers
		const elImgs = document.querySelectorAll('.img')
		elImgs[img.id].style.backgroundImage = `url(${img.url})`
	})
}

function getImgsForDisplay(filterBy = 'all') {
	let newId = 0
	if (filterBy === 'memes') return showSaved()
	if (filterBy === 'all') return resetId()
	//sets id by for render by keyword
	return gImgs.filter(img => {
		if (img.keywords.includes(filterBy)) {
			img.id = newId++
			return true
		}
	})
}

function resetId() {
	gImgs.forEach((img, idx) => (img.id = idx))
	return gImgs
}

function incrementKeywordMap(val) {
	gKeywordSearchCountMap[val] = gKeywordSearchCountMap[val] ? gKeywordSearchCountMap[val] + 1 : (gKeywordSearchCountMap[val] = 10)
}

function onFilterBy(el) {
	const val = el.innerText
	incrementKeywordMap(val)
	renderKeyWordBar()
	renderMemeGallery(val)
}
function onSearchBy(el) {
	const elSearch = document.querySelector('.search-input')
	incrementKeywordMap(elSearch.value)
	renderKeyWordBar()
	renderMemeGallery(elSearch.value)
	elSearch.value = ''
}

function renderKeyWordBar() {
	const elKeywords = document.querySelectorAll('.keywords span')
	elKeywords.forEach(keyword => {
		key = keyword.innerText
		const size = gKeywordSearchCountMap[key] < 10 ? 10 : gKeywordSearchCountMap[key]
		keyword.style.fontSize = size + 'px'
	})
}

function onOpenKeywords() {
	const elKeywordContainer = document.querySelector('.search-nav')
	const elExpandBtn = document.querySelector('.expand')
	elKeywordContainer.style.flexDirection = 'column'
	elExpandBtn.style.display = 'none'
}

function closeKeywords() {
	const elKeywordContainer = document.querySelector('.search-nav')
	const elExpandBtn = document.querySelector('.expand')
	elKeywordContainer.style.flexDirection = 'row'
	elExpandBtn.style.display = 'block'
}

function onUpload(ev) {
	// console.log(ev)
	loadImageFromInput(ev, addImg)
}

function loadImageFromInput(ev, onImageReady) {
	var reader = new FileReader()
	//After we read the file
	reader.onload = function (event) {
		var img = new Image() // Create a new html img element
		img.src = event.target.result // Set the img src to the img file we read
		//Run the callBack func , To render the img on the canvas
		img.onload = onImageReady.bind(null, img.src)
	}
	reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function addImg(img) {
	const imgObj = {
		id: img.length,
		url: img
	}
	gImgs.unshift(imgObj)
	resetId()
	renderMemeGallery()
}

function showSaved() {
	const memes = loadFromStorage('memes')
	console.log(memes)
	const imgsForDisplay = []
	memes.forEach((meme, idx) => {
		{
			imgsForDisplay.push({
				id: idx,
				url: `assets/meme-imgs/${meme.selectedImgId}.jpg`
			})
		}
	})
	console.log(imgsForDisplay)
	return imgsForDisplay
}
