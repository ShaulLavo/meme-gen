function getRandSentence(arr) {
	const randNum = getRandomIntInclusive(0, arr.length - 1)
	return arr[randNum]
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}
