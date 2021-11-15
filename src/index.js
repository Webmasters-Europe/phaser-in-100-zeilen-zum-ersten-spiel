const config = {
	type: Phaser.Auto,
	width: 620,
	height: window.innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: true,
		},
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
}

new Phaser.Game(config)

let player
let platforms
let aKey
let dKey

function preload() {
	this.load.image('background_img', 'assets/background.png')
	this.load.image('playerSprite', 'assets/player.png')
	this.load.image('playerJumpSprite', 'assets/player_jump.png')
	this.load.image('platform', 'assets/game-tiles.png')
}

function create() {
	this.add.image(0, 0, 'background_img').setOrigin(0).setScrollFactor(0)

	this.anims.create({
		key: 'jump',
		frames: [{ key: 'playerJumpSprite' }, { key: 'playerSprite' }],
		frameRate: 20,
		repeat: 0,
	})

	createPlayer(this.physics)
	createPlatform(this.physics)
	createKeys(this.input.keyboard)

	this.physics.add.collider(player, platforms, () => {
		player.setVelocityY(-400)
		player.anims.play('jump')
	})

	this.cameras.main.startFollow(player, false, 0, 1)
}

function update() {
	checkMovement()
}

function createPlayer(physics) {
	player = physics.add.sprite(325, -100, 'playerSprite')
	player.body.setSize(64, 90)
	player.body.setOffset(32, 30)
	player.setDepth(10)
	player.setBounce(0, 1)
	player.setVelocityY(-400)
}

function createPlatform(physics) {
	platforms = physics.add.staticGroup()
	platforms.create(325, 0, 'platform')
	platforms.create(Phaser.Math.Between(0, 640), -200, 'platform')
	platforms.create(Phaser.Math.Between(0, 640), -400, 'platform')
	platforms.create(Phaser.Math.Between(0, 640), -600, 'platform')
	platforms.create(Phaser.Math.Between(0, 640), -800, 'platform')
	platforms.create(Phaser.Math.Between(0, 640), -1000, 'platform')
	platforms.create(Phaser.Math.Between(0, 640), -1200, 'platform')
	platforms.create(Phaser.Math.Between(0, 640), -1400, 'platform')
}

function createKeys(keyboard) {
	aKey = keyboard.addKey('A', true, true)
	dKey = keyboard.addKey('D', true, true)
}

function checkMovement() {
	if (aKey.isDown) {
		player.setVelocityX(-300)
	}
	if (dKey.isDown) {
		player.setVelocityX(300)
	}
	if (!aKey.isDown && !dKey.isDown) {
		player.setVelocityX(0)
	}
}
