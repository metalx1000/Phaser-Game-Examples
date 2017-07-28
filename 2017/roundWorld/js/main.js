var game = new Phaser.Game(854, 480, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });

var player;

function preload() {
  //load imgs
  preload_imgs.forEach(function(i){
    var b = baseName(i);
    game.load.image(b,i);
  });

  //load sounds
  preload_snds.forEach(function(i){
    var b = baseName(i);
    var ogg = "res/snds/"+b+".ogg";
    game.load.audio(b,[i,ogg]);
  });

  //load tile maps
  game.load.tilemap('map', 'res/maps/map0.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'res/tiles/tiles.png');

}

function create() {
  //start physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255);

  //create sprite
  player = game.add.sprite(200, 200, "tux");
  player.anchor.setTo(0.5, 0.5);
  player.scale.setTo(.5);

  //create sprite
  planet = game.add.sprite(game.width/2,game.height/2, "planet");
  planet.anchor.setTo(0.5, 0.5);

  game.physics.arcade.enable([player,planet]);

  //make the planet's collision box a circle
  planet.body.setCircle(120);
  //make the planet immovable
  planet.body.immovable = true;
}


function update() {
  player.rotation = game.physics.arcade.angleToXY(player,game.width/2,game.height/2)-1.5;
  keys(player);
  game.physics.arcade.moveToObject(player,planet,500);
  game.physics.arcade.collide(player,planet);


}

function keys(sprite){
  if(typeof sprite.speed === "undefined"){
    var speed = 5;
  }else{
    var speed = sprite.speed;
  }
  // Check key states every frame.
  // Move ONLY one of the left and right key is hold.
  var left = game.input.keyboard.isDown(Phaser.Keyboard.LEFT)
  var right = game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)
  var up = game.input.keyboard.isDown(Phaser.Keyboard.UP)
  var down = game.input.keyboard.isDown(Phaser.Keyboard.DOWN)
  var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  if (left){
    sprite.x -= speed;
  }
  else if (right){
    sprite.x += speed;
  }

  if (up){
    sprite.y -= speed;
  }
  else if (down){
    sprite.y += speed;
  }

  if (space){

  }
}


