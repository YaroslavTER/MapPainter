var canvas = document.getElementById('map_id')
var ctx = canvas.getContext('2d')

const PART_NUMBER = 10
const FIELD_HEIGHT = 100
const PART_HEIGHT = FIELD_HEIGHT / PART_NUMBER

const GET_RANDOM = array => array[~~(Math.random() * (array.length - 1)) + 1]
const HEIGHT = 9
const WIDTH = 10

var map = []/*
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
]*/

function setMap(element) {
	for (let x = 0; x < HEIGHT; x++) {
		let line = []
		for (let y = 0; y < WIDTH; y++) {
			line.push(element)
		}
		map.push(line)
	}
}

function drawMap() {
	for (let x = 0; x < HEIGHT; x++) {
		for (let y = 0; y < WIDTH; y++) {
			const type = map[x][y]
			drawTile(type, y * FIELD_HEIGHT, x * FIELD_HEIGHT, tiles[type])
			// choiseColor(type, y * FIELD_HEIGHT, x * FIELD_HEIGHT)
		}
	}
}

const tiles = {
	g: ["#0e7f03", '#006010', '#1cb235', '#0bed31'],
	p: ["#a5a200", '#e0dc18', '#f7f44a', '#edea68'],
	w: ["#0d8ac4", '#60c4f2', '#c2e8f9', '#268fbf']
}

function drawTile(type, px, py, colors) {
	ctx.fillStyle = colors[0];
	ctx.fillRect(px, py, FIELD_HEIGHT, FIELD_HEIGHT);
	let x, y;
	for (x = 0; x < PART_HEIGHT; ++x) {
		for (y = 0; y < PART_HEIGHT; ++y) {
			if (Math.random() > 0.66) {
				ctx.fillStyle = colors[~~(Math.random() * 3) + 1]
				ctx.fillRect(px + x * PART_HEIGHT, py + y * PART_HEIGHT,
					                               PART_HEIGHT, PART_HEIGHT);
			}
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
	for (let rowIndex = 0; rowIndex < PART_NUMBER; rowIndex++) {
		for (let colIndex = 0; colIndex < PART_NUMBER; colIndex++) {
			if (randFor(0, 3) == 0)
				particles.push({
					color: inputColor,
					x: xPosition + x,
					y: yPosition + y
				})
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

function choiseColor(element, x, y) {
	let mainColor
	let colors
	if (element == 'g') {
		mainColor = '#0e7f03'
		colors = ['#006010', '#1cb235', '#0bed31']
	} else if (element == 'p') {
		mainColor = '#a5a200'
		colors = ['#e0dc18', '#f7f44a', '#edea68']
	} else if (element == 'w') {
		mainColor = '#0d8ac4'
		colors = ['#60c4f2', '#c2e8f9', '#268fbf']
	}

	drawField({
		x: x,
		y: y
	}, mainColor, colors)
}

function generatePathFrom(x, y) {
	let direction = startDirection(x, y)
	let turnCoef = HEIGHT/2
	let steps = randFor(1, turnCoef)
	while(continueStep(x, y)) {
		let step = 0
		while(step < steps && continueStep(x, y)) {
			console.log(x, y)
			map[x][y] = 'p'
			if(direction == 0)
				x++
			else if(direction == 1)
				x--
			else if(direction == 2)
				y++
			else if(direction == 3)
				y--
			step++
		}
		step = 0
		steps = randFor(1, turnCoef)
		direction = randFor(0, 3)
	}
}
/*
	0 - down
	1 - up
	2 - right
	3 - left
*/
function startDirection(x, y) {
	if(x == 0)
		return 0
	else if(x == HEIGHT - 1)
		return 1
	else if(y == 0)
		return 2
	else if(y == WIDTH - 1)
		return 3
}

function randFor(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function continueStep(x, y) {
	return  x < HEIGHT && y < WIDTH && x >= 0 && y >= 0
}

setMap('g')
generatePathFrom(2, 0)
generatePathFrom(HEIGHT - 1, 4)
//ctx.filter = 'contrast(75%)'
drawMap()
