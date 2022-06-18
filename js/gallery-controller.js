'use-strict'

function init() {
	renderMemeGallery()
	renderKeyWordBar()
}

function renderMemeGallery(filterBy) {
	//add containers to gallery
	const imgs = getImgsForDisplay(filterBy)
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

function renderKeyWordBar() {
	const elKeywords = document.querySelectorAll('.keywords span')
	elKeywords.forEach(keyword => {
		key = keyword.innerText
		const size = gKeywordSearchCountMap[key] < 10 ? 10 : gKeywordSearchCountMap[key]
		keyword.style.fontSize = size + 'px'
	})
}

function onToggleSearch() {
	const elKeywords = document.querySelector('.keywords')
	elKeywords.classList.toggle('open')
	const elExpandBtn = document.querySelector('.expand')
	if (elExpandBtn.style.display === 'none') {
		elExpandBtn.style.display = 'block'
	} else {
		elExpandBtn.style.display = 'none'
	}
}
