  var soldier,soldierImg,soldierUp,soldierHit;
  var background1,backgroundImg;
  var ground,invisible_ground;
  var thanos,thanosImg;
  var bullet,bulletImg;
  var astroid
  //var thanosGroup = group
  var PLAY = 1
  var END1 = 0
  var END2 = 2
  var score = 0
  var START = 4
  var gameState = START
  function preload(){
    soldierImg = loadAnimation("new iron.png")
    backgroundImg =loadImage("download.jpeg")
    soldierUp = loadAnimation("up.png")
    thanosImg = loadAnimation("tha.png")
    bulletImg = loadImage("beamlaser.png")
    soldierHit = loadAnimation("mark85-.png")
    astroid = loadAnimation("astroid.png")
  }
  function setup(){
    createCanvas(1200,600)
    background1 = createSprite(600,320,1200,600)
    soldier = createSprite(200,570,30,30)
    soldier.setCollider('rectangle',0,0,300,3)
    //soldier.debug = true
    soldier.visible = false
    ground = createSprite(600,620,1200,20)
    background1.addImage("back",backgroundImg)
    background1.scale = 4
    background1.velocityX = -2
    invisible_ground = createSprite(600,590,1200,20)
    soldier.addAnimation("soldier",soldierImg)
    soldier.addAnimation("up",soldierUp)
    soldier.addAnimation("hit",soldierHit)
    bulletgroup = new Group()
    thanosgroup = new Group()
  }

  function draw(){
    background(0)
    soldier.scale = 0.7 
  invisible_ground.visible = false
  ground.visible = false
 
  soldier.collide(ground)
  if(gameState === PLAY){
    soldier.visible = true
    spawnthanos()
    if(frameCount%7==0)
  {
    score++;
  }
  ground.velocityX = -3
  if(background1.x < 0){
    background1.x = 600
  }

 if(keyWentDown('enter')){
   shoot()
   soldier.changeAnimation("hit",soldierHit)
 } 
 if(keyWentUp('enter')){
  soldier.changeAnimation("soldier",soldierImg)
}
 
 if(keyWentDown("w")){
  soldier.y = soldier.y-60
  soldier.changeAnimation("up",soldierUp)
}

if(keyWentUp("w")){
  soldier.changeAnimation("soldier",soldierImg)
}

if(keyWentDown("s")){
  soldier.y = soldier.y + 60
}

if(keyWentUp("s")){
 soldier.changeAnimation("soldier",soldierImg)
}
if(bulletgroup.isTouching(thanosgroup)){
gameState = END1  
}

  if(thanosgroup.isTouching(soldier)){
    gameState =END2
  }
}
  if(gameState === END1){
 thanosgroup.destroyEach()
 bulletgroup.destroyEach()
 gameState = PLAY
  }

  if(gameState === END2){
    soldier.visible = false
    thanosgroup.destroyEach()
    bulletgroup.destroyEach()
  }
  
  drawSprites()
  if(gameState === START){
    background(0)
    stroke("red")
    textSize(15)
  text("PRESS Space TO START",600,300)
  text("Press W To Move Up",600,320)
  text("Press s To Move Down",600,340)
  text("Press Enter To Move Shoot",600,360)
  if(keyDown("space")){
    gameState = PLAY
  }
  }
  stroke("red")
  text("Score: "+ score,1100,50);
  }
  function shoot(){
    if (frameCount%1 === 0 ){
    bullet = createSprite(200,560,15,5)
    bullet.setCollider('rectangle',0,0,200,3)
   // bullet.debug = true
    bullet.y = soldier.y - 48
    bullet.addImage("bullet",bulletImg)
    bullet.scale = 0.3
    bullet.velocityX = 3
    bullet.lifetime = 1300
    bulletgroup.add(bullet)
    }
  }
  function spawnthanos() {
    if (frameCount % 200 === 0) {
      thanos = createSprite(1200,120,40,10);
      thanos.setCollider('rectangle',0,0,400,200)
      //thanos.addAnimation("thanos23",thanosImg)
    //thanos.addAnimation("astroidImg",astroid)
      //thanos.debug = true
      thanos.y = random(450,550)
      thanos.velocityX = random(-50,-100)
     thanos.scale = 0.5;
     thanos.velocityX = -3;
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: thanos.addAnimation("thanos",thanosImg);
               break;
       case 2: thanos.addAnimation("astroid",astroid);
               thanos.scale = 0.5
               break;
               default:break;
     }
       //assign lifetime to the variable
     thanos.lifetime = 1500;
      
      //add each thanos to the group
     thanosgroup.add(thanos);
    }
    
  }
  