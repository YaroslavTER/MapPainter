var canvas = document.getElementById('map_id')
var ctx = canvas.getContext('2d')

const PART_NUMBER = 10
const FIELD_HEIGHT = 100
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
			choiseColor(element, colIndex*FIELD_HEIGHT, rowIndex*FIELD_HEIGHT)
		}
	}
}

function drawField(field, mainColor, colors) {
	ctx.fillStyle = mainColor
	ctx.fillRect(field.x, field.y, FIELD_HEIGHT, FIELD_HEIGHT)
	for (color of colors) {
		drawParticle(generateParticles(color, field.x, field.y))
	}
}

function drawParticle(particles) {
	for (particle of particles) {
		ctx.fillStyle = particle.color
		ctx.fillRect(particle.x, particle.y, PART_HEIGHT, PART_HEIGHT)
	}
}

function generateParticles(inputColor, x, y) {
	let particles = []
	let xPosition = 0
	let yPosition = 0
	for(let rowIndex = 0; rowIndex < PART_NUMBER; rowIndex++) {
		for(let colIndex = 0; colIndex < PART_NUMBER; colIndex++) {
			if(randFor(0, 3) == 0)
				particles.push( {color: inputColor, x: xPosition + x,
					                                y: yPosition + y} )
			xPosition += PART_HEIGHT
		}
		xPosition = 0
		yPosition += PART_HEIGHT
	}
	return particles
}

function getPosition() {
	return randFor(0, FIELD_HEIGHT - PART_HEIGHT)
}

function randFor(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function choiseColor(element, x, y) {
	let mainColor
	let colors
	if(element == 'g') {
		mainColor = '#0e7f03'
		colors = ['#006010', '#1cb235', '#0bed31']
	} else if(element == 'p') {
		mainColor = '#a5a200'
		colors = ['#e0dc18', '#f7f44a', '#edea68']
 	} else if(element == 'w'){
		mainColor = '#0d8ac4'
		colors = ['#60c4f2', '#c2e8f9', '#268fbf']
 	}
	drawField({x: x, y: y}, mainColor, colors)
}

ctx.filter = 'contrast(75%)'
drawMap()
