function renderMemeGallery() {
	//TODO refactor this maybe w/o background

	//add containers to gallery
	const elGallery = document.querySelector('.img-gallery')
	gImgs.forEach(img => {
		elGallery.innerHTML += `<div class="img img${img.id}"></div>`
	})

	// add background image to containers
	const elImgs = document.querySelectorAll('.img')
	gImgs.forEach(img => {
		elImgs[img.id].style.backgroundImage = `url(${img.url})`
	})
}
