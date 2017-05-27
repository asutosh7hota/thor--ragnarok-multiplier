var game = new Phaser.Game(1000 , 600,Phaser.AUTO,'gamediv'); //initiating the game object


//Declaring the variablles for the game
var asgard;
var thor;
var loki;
var thunder;
var movement;
var thunder;
var thunderdelay=0;
var attack;
var score= 0;
var scoretext;
var win;
//var x; define x and replace it in the 


/* Defining the mainstate, i.e., this would contain three main functions that would
help to manage the whole game*/

var mainstate = {

// the preload function is used to load the pre-requisite resources.

  preload: function(){

      game.load.image('background',"assets/background.png");
      game.load.image('thor',"assets/thor1.png");
      game.load.image('loki',"assets/lok2.png");
      game.load.image('thunder',"assets/lightning1.png");
// scaling 
      this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
      this.game.scale.minWidth = 180;
      this.game.scale.minHeight = 360;
      this.game.scale.maxWidth = 768;
      this.game.scale.maxHeight = 1360;
      this.scale.setScreenSize( true );


  },
// the create function is used to create elements in the game.
  create: function(){

      asgard = game.add.tileSprite(0,0,1320,600,'background');
      thor = game.add.sprite(game.world.centerX -500, game.world.centerY, 'thor');
      game.physics.enable(thor,Phaser.Physics.ARCADE);
      movement= game.input.keyboard.createCursorKeys();
      thunder = game.add.physicsGroup();
      game.physics.arcade.enable([thunder])

// replace the value 400 with x here after getting the value from the editor.

      thunder.createMultiple(400,'thunder');
      thunder.setAll('anchor.x',0.5);
      thunder.setAll('anchor.y',1);
      thunder.setAll('outofBoundsKill', true);
      thunder.setAll('checkWorldBounds',true);

      attack = game.input.keyboard.createCursorKeys();
      loki = game.add.physicsGroup();
      game.physics.arcade.enable([loki]);

      createEnemies();


      scoretext = game.add.text(0,550,'Score:',{font: '32px Arial',fill : '#fff'});
      win = game.add.text(game.world.centerX,game.world.centerY,'You Win!',{font: '32px Arial', fill: '#fff'})
      win.visible= false;
  },
// the update function is used to add functionality to the games.

  update: function(){

      game.physics.arcade.overlap(thunder,loki,collision,null,this);
      game.physics.arcade.overlap(thor,loki,over,null,this);

      thor.body.velocity.y = 0;
      asgard.tilePosition.x -= 2;

      if(movement.up.isDown)
      {
        thor.body.velocity.y = - 200;
      }

      if(movement.down.isDown)
      {
        thor.body.velocity.y= 200;
      }

      if(attack.right.isDown)
      {
        fire();
      }

      scoretext.text = 'Score:' + score;

      if(score==a*b*50)
      {
        win.visible=true;
      }
      //alert when you are out of ammo!
      // if(x==0){
      //   alert("you are out of ammo!");
      // }
  }
}

// helper functions to assist the create function.

function fire(){
  // x = x-1; decrement x each time to show when you'll be out of ammo
  if(game.time.now > thunderdelay){
    bullet = thunder.getFirstExists(false);

    if(bullet)
    {
      bullet.reset(thor.x+ 150,thor.y + 45);
      bullet.body.velocity.x = 400;
      thunderdelay = game.time.now + 200;
    }
  }
}

function createEnemies(){
//giving random number of enemies in each iteration
    a= Math.floor((Math.random() * 10) + 1);
    b = Math.floor((Math.random() * 10) + 1);
    for(var x = 0; x <= a; x++){
      for(var y = 0; y<= b; y ++){
          var enemy = loki.create(x*60,y*60,'loki');
      }
    }

    loki.x= 700;
    loki.y=0;

    var tween= game.add.tween(loki).to({y:200},2000,Phaser.Easing.Linear.None,true,0,1000,true);
// in phaser 2.4 + onLoop and onRepeat have different functionality.
    tween.onRepeat.add(descend,this);
    tween.onLoop.add(descend,this);
}
// to get the enemies one ste closer to the player

function descend()
{
    loki.x -= 20;
}

function collision(bullet,enemy){
  bullet.kill();
  enemy.kill();
// updates scores everytime thunder hits the enemy.
  score += 50;
}

function over(thor,enemy){
  thor.kill();
  
// updates scores everytime thunder hits the enemy.
  alert("Game over");
}

//Starting the game, initiation.

game.state.add('mainstate',mainstate);
game.state.start('mainstate');
