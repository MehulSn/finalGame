var bg, bgImg;
var player, shooterImg, shooter_shooting;
var edges;
var bullet, bulletgroup, bulletavl = 20;
var enemy, enemygroup;
var bulletimg;
var score = 0;
var life = 200;
var gameState=1;
var nlife,nlifeimg,nlifegroup;
var nbullet,nbulletimg,nbulletgroup;
var d1,d2,d3;

function preload() {

  shooterImg = loadImage("assets/soldier.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletimg = loadImage("assets/bullet.png")
  bgImg = loadImage("assets/bg5.jpg")
  nlifeimg = loadImage("assets/heart_1.png");
  nbulletimg = loadImage("assets/bullets.png")
  d1 = loadImage("assets/d1_1.png")
  d2 = loadImage("assets/d1_2.png")
  d3 = loadImage("assets/d1_3.png")
  
}
function setup() {


  createCanvas(800, windowHeight);
  edges = createEdgeSprites()

  //adding the background image
  bg = createSprite(displayWidth / 3 - 20, displayHeight / 2, 0, 0)
  bg.addImage(bgImg)
  bg.scale = 1.9


  //creating the player sprite
  player = createSprite(displayWidth - 1150, displayHeight - 150, 50, 50);
  player.addImage(shooterImg)
  player.scale = 1
  player.debug = true
  player.setCollider("rectangle", 0, 0, 100, 250)

  //bullerts
  bulletgroup = new Group();
  //enemy
  enemygroup = new Group();
  //life
  nlifegroup = new Group();
  //nbullet
  nbulletgroup = new Group();

}

function draw() {
  background(0);
  if(gameState===1){
    player.collide(edges[0]);
    player.collide(edges[1]);
     //moving the player up and down and making the game mobile compatible using touches
  if (keyDown("LEFT_ARROW") || touches.length > 0) {
    player.x = player.x - 30
  }
  if (keyDown("RIGHT_ARROW") || touches.length > 0) {
    player.x = player.x + 30
  }
  if (keyWentDown("space") && bulletavl > 0) {
    bullet = createSprite(player.x, player.y - 100, 10, 10);
    bullet.velocityY = -10;
    bullet.addImage(bulletimg)
    bullet.scale = 0.08;
    bulletgroup.add(bullet)
    bulletavl -= 1
  }
  if (bulletgroup.isTouching(enemygroup)) {
    for (var i = 0; i < bulletgroup.length; i++) {
      for (var j = 0; j < enemygroup.length; j++) {
        if (bulletgroup[i].isTouching(enemygroup[j])) {
          bulletgroup[i].destroy();
          enemygroup[j].destroy();
          score += 5;
        }
      }
    }
  }
  if (enemygroup.isTouching(player)) {
    for (var i = 0; i < enemygroup.length; i++) {
      if (enemygroup[i].isTouching(player)) {
        life = life - 50;
        enemygroup[i].destroy();
      }
    }
  }
  if (nlifegroup.isTouching(player)) {
    for (var i = 0; i < nlifegroup.length; i++) {
      if (nlifegroup[i].isTouching(player)) {
        life = life + 100;
        nlifegroup[i].destroy();
      }
    }
  }
  if (nbulletgroup.isTouching(player)) {
    for (var i = 0; i < nbulletgroup.length; i++) {
      if (nbulletgroup[i].isTouching(player)) {
        bulletavl = bulletavl + 8;
        nbulletgroup[i].destroy();
      }
    }
  }
  dinosaurs();
  newlife();
  newbullets();
  drawSprites();
  showhealthbar();
  fill("white")
  textSize(20)
  text("Score : " + score, 680, 30)
  //text("Bullets : " + bulletavl, 450, 30) 
  if (bulletavl <= 5) {
    fill("black")
    rect(445, 10, 110, 27)
    fill("red")
    textSize(20)

    text("Bullets : " + bulletavl, 450, 30)

  }
  else {

    fill("white")
    textSize(20)
    text("Bullets : " + bulletavl, 450, 30)
  }
  if(life<=0||bulletavl<=0){
    gameState=2;
  }
  }
  else if(gameState==2){
   background("black");
   fill("white") ;
   textSize(40)
   text("GAME OVER",300,displayHeight/2)
  }
 

 
}

function dinosaurs() {
  if (frameCount % 90 == 0) {
    enemy = createSprite(30, -10, 20, 20);
    enemy.velocityY = 7;
    enemy.x = random(20, 780);
    var rand=random(1,3);
    console.log(rand)
    switch(Math.floor(rand))
    {
      case 1:enemy.addImage(d1);
      break;
      case 2:enemy.addImage(d2);
      break;
      case 3:enemy.addImage(d3);
      break;
    }
    enemy.scale=0.3;
    enemy.lifetime = 200;
    enemygroup.add(enemy);
  }
}
function newlife(){
  if(frameCount % 950 ==0)
  {
     nlife = createSprite(30,-10,20,20);
     nlife.velocityY = 7;
     nlife.x=random(20,780);
     nlife.lifetime = 200;
     nlife.addImage(nlifeimg);
     nlife.scale=0.2;
     nlifegroup.add(nlife);
  }
}
function newbullets(){
  if(frameCount % 600 == 0)
  {
     nbullet = createSprite(30,-10,20,20);
     nbullet.velocityY = 7;
     nbullet.x=random(20,780);
     nbullet.lifetime = 200;
     nbullet.addImage(nbulletimg);
     nbullet.scale= 0.2;
     nbulletgroup.add(nbullet);
  }
}
function showhealthbar() {
  fill("white")
  noStroke()
  rect(40, 20, 185, 20)
  fill("red")
  noStroke()
  if (life > 0) {
    rect(40, 20, life, 20)
  }
}
