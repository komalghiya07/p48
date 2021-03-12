var bg,bgImage;
var bird,birdImage,birdCollided;
var ship,shipImage;
var lane,planeImage;
var balloon,ballonImage;
var edges;
var planeGroup,balloonGroup,shipGroup;
var stone,stoneImage,stoneGroup;
var start,startImage;
var button,buttonImage;
var reset,resetImage;
var hitSound;
var clickingSound;
var chirpingSound;
var score=0;
var gameState="start";

function preload(){
  bgImage=loadImage("bg.png");
  birdImage=loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png","bird9.png",
  "bird10.png","bird11.png","bird12.png","bird13.png","bird14.png");
  birdCollided=loadAnimation("bird15.png");
  shipImage=loadAnimation("ship-1.png","ship-2.png","ship-3.png","ship-4.png");
  planeImage=loadImage("aeroplane.png");
  balloonImage=loadImage("hotairballoon.png");
  stoneImage=loadImage("stone.png");
  startImage=loadImage("start.png");
  buttonImage=loadImage("play.png");
  resetImage=loadImage("reset.png");

  hitSound=loadSound("hit.mp3");
  clickingSound=loadSound("clicking.mp3");
  chirpingSound=loadSound("chirping.mp3");
} 

function setup() {
  createCanvas(1600,800);
  bg=createSprite(800,400,1600,800);
  bg.addImage("bg",bgImage);

  bird=createSprite(200,200,50,50);
  bird.addAnimation("bird",birdImage);
  bird.addAnimation("birdCollided",birdCollided);
  bird.scale=0.8;

  start=createSprite(800,400,1600,800);
  start.addImage("start",startImage);

  button=createSprite(800,400,50,50);
  button.addImage("button",buttonImage);

  reset=createSprite(850,450,50,50);
  reset.addImage("reset",resetImage);
  reset.scale=0.2;

  edges=createEdgeSprites();

  planeGroup=new Group();
  balloonGroup=new Group();
  shipGroup=new Group();
  stoneGroup=new Group();

}
function draw() {
  background("blue");

  if(gameState==="start"){
    start.visible=true;
    button.visible=true;
    bg.visible=false;
    bird.visible=false;
    reset.visible=false;
    if(mousePressedOver(button)){
      clickingSound.play();
      gameState="play";
    }
  }
  bird.collide(edges);
  drawSprites();
  if(gameState==="play"){
    reset.visible=false;
    start.visible=false;
    button.visible=false;
    bg.visible=true;
    bird.visible=true;

    bg.velocityX=-4;
    score=score+1;
    fill("blue");
    textSize(50);
    stroke("black");
    strokeWeight(3);
    text("SCORE  "+score,1250,100);
  if(bg.x<0){
    bg.x=800;
  }

  if(keyDown(UP_ARROW)){
    chirpingSound.play();
    bird.velocityY=-5;
  }
  if(keyDown(LEFT_ARROW)){
    chirpingSound.play();
    bird.x=bird.x-3;
  }
  if(keyDown(RIGHT_ARROW)){
    chirpingSound.play();
    bird.x=bird.x+3;
  }
  bird.velocityY+=0.5;

  spawnShip();
 
  var num=Math.round(random(1,2));
  if(num===1){
    spawnPlane();
  }
  if(num===2){
    spawnBalloon();
  }
  if(bird.isTouching(planeGroup) || bird.isTouching(shipGroup) || bird.isTouching(balloonGroup) || bird.isTouching(stoneGroup)){
    hitSound.play();
    gameState="end";
  }
  }
 
  if(gameState==="end"){
   fill("red");
   textSize(200);
   stroke("black");
   strokeWeight(3);
   text("GAME OVER",250,350);
   bg.velocityX=0;
   bird.velocityY=6;
   //push();
   //tint(0,0,0,128);
   bird.changeAnimation("birdCollided",birdCollided);
   pop();
   reset.visible=true;
   if(mousePressedOver(reset)){
     clickingSound.play();
     restart();
   }
   shipGroup.setVelocityXEach(0);
   shipGroup.setLifetimeEach(-1);
   planeGroup.setVelocityXEach(0);
   planeGroup.setLifetimeEach(-1);
   balloonGroup.setVelocityXEach(0);
   balloonGroup.setLifetimeEach(-1);
   stoneGroup.setVelocityXEach(0);
   stoneGroup.setLifetimeEach(-1);
   fill("blue");
   textSize(50);
   stroke("black");
   strokeWeight(3);
   text("SCORE  "+score,1250,100);
  }
 
}
function restart(){
  gameState="play";
  bird.changeAnimation("bird",birdImage);
  shipGroup.destroyEach();
  balloonGroup.destroyEach();
  planeGroup.destroyEach();
  stoneGroup.destroyEach();
  score=0;
}

function spawnShip(){
  if(frameCount%200===0){
    ship=createSprite(1600,600,50,50);
    ship.addAnimation("ship",shipImage);
    ship.velocityX=-4;
    ship.scale=0.2;
    ship.lifetime=450;
    shipGroup.add(ship);
    

    //spawning stones
    stone=createSprite(1650,620,50,50);
    stone.addImage("stone",stoneImage);
    stone.velocityX=-(random(3,15));
    stone.velocityY=-6;
    stone.scale=0.1;
    stone.lifetime=450;
    stoneGroup.add(stone);
  }
}

function spawnPlane(){
  if(frameCount%200===0){
    plane=createSprite(1600,200,50,50);
    plane.y=random(50,450);
    plane.addImage("aeroplane",planeImage);
    plane.velocityX=-4;
    plane.scale=0.3;
    plane.lifetime=450;
    planeGroup.add(plane);
  }
}

function spawnBalloon(){
  if(frameCount%200===0){
    balloon=createSprite(1600,200,50,50);
    balloon.y=random(50,450)
    balloon.addImage("balloon",balloonImage);
    balloon.velocityX=-4;
    balloon.scale=0.3;
    balloon.lifetime=450;
    balloonGroup.add(balloon);
  }
}
