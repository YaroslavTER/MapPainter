var canvas = document.getElementById('map_id')
var ctx = canvas.getContext('2d')

const PART_NUMBER = 32
const FIELD_HEIGHT = 50
const PART_HEIGHT = FIELD_HEIGHT/PART_NUMBER

var map = [
			['g', 'g', 'p', 'g', 'g', 'p', 'g', 'g'],
			['g', 'g', 'p', 'g', 'g', 'p', 'g', 'g'],
			['g', 'g', 'p', 'p', 'p', 'p', 'g', 'g'],
			['p', 'p', 'p', 'w', 'w', 'p', 'g', 'g'],
			['g', 'g', 'p', 'w', 'w', 'p', 'g', 'g'],
			['g', 'g', 'p', 'w', 'w', 'p', 'g', 'g'],
			['w', 'g', 'p', 'w', 'w', 'p', 'g', 'g'],
			['w', 'g', 'p', 'p', 'p', 'p', 'g', 'g'],
			['w', 'g', 'g', 'g', 'g', 'p', 'g', 'g'],
			['g', 'g', 'g', 'g', 'g', 'p', 'g', 'g'],
		  ]

function drawMap() {
	let rowLength = map.length
	for(let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
		let colLength = map[rowIndex].length
		let line = map[rowIndex]
		for(let colIndex = 0; colIndex < colLength; colIndex++) {
			let element = line[colIndex]
			drawImage(choiseSrc(element), colIndex*FIELD_HEIGHT,
			          rowIndex*FIELD_HEIGHT, FIELD_HEIGHT, FIELD_HEIGHT)
		}
	}
}

function drawImage(src, x, y) {
	let img = new Image();
	img.onload = function() {
		ctx.drawImage(img, x, y, FIELD_HEIGHT, FIELD_HEIGHT)
	}
	img.src = src
}

function drawField() {
	ctx.fillStyle = '#e1e5ed'
	ctx.fillRect(0, 0, FIELD_HEIGHT, FIELD_HEIGHT)

	let colors = ['#006010', '#1cb235', '#0bed31']
	let particles = generateParticles(colors[0], 0, 0)
	let particle
	let number = colors.length
    let counter = 0
	while(counter < particles.length) {
		particle = particles[counter]
		ctx.fillStyle = particle.color
		ctx.fillRect(particle.x, particle.y, PART_HEIGHT, PART_HEIGHT)
		counter++
	}
}

//drawField()

function makeSetOfParticles(inputColor, x, y) {
	let number = 10
	let counter = 0
	while(counter < number) {
		particles.insert(generateParticles())
		counter++
	}
}

function generateParticles(inputColor, x, y) {
	let number = 10
	let particles = []
	let counter = 0
	while(counter < number) {
		particles.push({color: inputColor,
			            x: randFor(0, FIELD_HEIGHT - PART_HEIGHT) + x,
			            y: randFor(0, FIELD_HEIGHT - PART_HEIGHT) + y})
		counter++
	}
	return particles
}

function randFor(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function choiseSrc(element) {
	let src
	if(element == 'g')
		src = 'Images/grass.jpg'
	else if(element == 'p')
		src = 'Images/path.jpg'
	else if(element == 'w')
		src = 'Images/water.jpg'
	return src
}

drawMap()
