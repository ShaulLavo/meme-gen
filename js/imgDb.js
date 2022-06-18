'use-strict'

const gKeywordSearchCountMap = {
	funny: 20,
	cat: 20,
	baby: 17,
	animal: 16,
	men: 18,
	woman: 19,
	all: 24
}
const gImgs = [
	{
		id: 0,
		url: 'assets/meme-imgs/0.jpg',
		keywords: ['art', 'woman']
	},
	{
		id: 1,
		url: 'assets/meme-imgs/1.jpg',
		keywords: ['funny', 'politics', 'men']
	},
	{
		id: 2,
		url: 'assets/meme-imgs/2.jpg',
		keywords: ['cute', 'dog', 'animal']
	},
	{
		id: 3,
		url: 'assets/meme-imgs/3.jpg',
		keywords: ['cute', 'dog', 'baby', 'animal']
	},
	{
		id: 4,
		url: 'assets/meme-imgs/4.jpg',
		keywords: ['funny', 'cute', 'baby']
	},
	{
		id: 5,
		url: 'assets/meme-imgs/5.jpg',
		keywords: ['cute', 'cat', 'animal']
	},
	{
		id: 6,
		url: 'assets/meme-imgs/6.jpg',
		keywords: ['funny', 'movie', 'men']
	},
	{
		id: 7,
		url: 'assets/meme-imgs/7.jpg',
		keywords: ['funny', 'baby', 'cute']
	},
	{
		id: 8,
		url: 'assets/meme-imgs/8.jpg',
		keywords: ['funny', 'men', 'tv']
	},
	{
		id: 9,
		url: 'assets/meme-imgs/9.jpg',
		keywords: ['tv', 'men', 'funny']
	},
	{
		id: 10,
		url: 'assets/meme-imgs/10.jpg',
		keywords: ['tv', 'men', 'funny', 'politics']
	},
	{
		id: 11,
		url: 'assets/meme-imgs/11.jpg',
		keywords: ['men', 'funny', 'movie']
	},
	{
		id: 12,
		url: 'assets/meme-imgs/12.jpg',
		keywords: ['cute', 'baby', 'funny']
	},
	{
		id: 13,
		url: 'assets/meme-imgs/13.jpg',
		keywords: ['funny', 'baby', 'cute']
	},
	{
		id: 14,
		url: 'assets/meme-imgs/14.jpg',
		keywords: ['funny', 'baby', 'politics']
	},
	{
		id: 15,
		url: 'assets/meme-imgs/15.jpg',
		keywords: ['cute', 'animal', 'dog']
	},
	{
		id: 16,
		url: 'assets/meme-imgs/16.jpg',
		keywords: ['funny', 'men', 'politics']
	},
	{
		id: 17,
		url: 'assets/meme-imgs/17.jpg',
		keywords: ['tv', 'men']
	},
	{
		id: 18,
		url: 'assets/meme-imgs/18.jpg',
		keywords: ['funny', 'movie', 'men']
	},
	{
		id: 19,
		url: 'assets/meme-imgs/19.jpg',
		keywords: ['funny', 'movie', 'men']
	},
	{
		id: 20,
		url: 'assets/meme-imgs/20.jpg',
		keywords: ['men', 'movie']
	},
	{
		id: 21,
		url: 'assets/meme-imgs/21.jpg',
		keywords: ['tv', 'movie', 'women']
	},
	{
		id: 22,
		url: 'assets/meme-imgs/22.jpg',
		keywords: ['funny', 'men', 'tv']
	},
	{
		id: 23,
		url: 'assets/meme-imgs/23.jpg',
		keywords: ['funny', 'men', 'politics']
	}
]
