var tower,towerimg;
var windowimg,climberimg;
var windowsgroup,climbergroup,invisibleblockgroup;
var ghost,ghostImg;
var gameState;
var play = 1;
var end = 0;
var sound;

function preload(){
  towerimg = loadImage("tower.png");
  windowimg = loadImage("door.png");
  climberimg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png");
  sound = loadSound("spooky.wav");

  
  gameState = "play";
  
  windowsgroup = new Group();
  climbergroup = new Group();
  invisibleblockgroup = new Group();
}

function setup(){
  createCanvas(600,600);
  
    sound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerimg);
  tower.velocityY = 4;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addAnimation("ghost",ghostImg);
  
}

function draw(){
  background(0);
  
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
   }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -7;
   }
  }
  ghost.velocityY = ghost.velocityY + 0.3;
    
  if(tower.y>400){
    
    tower.y = 300;
  }
   
  if(climbergroup.isTouching(ghost)){
      ghost.velocityY = 0;
  }
    
  if(invisibleblockgroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
  }
  spawnWindows();
  
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over You Lose", 180,300);
    climbergroup.destroyEach();
    windowsgroup.destroyEach();
    tower.destroy();
  }
  
  drawSprites();
}

function spawnWindows(){
 if(frameCount % 120 === 0){ 
  var window = createSprite(200,-50);
  window.addImage("windows",windowimg);
  window.x = Math.round(random(120,400));
  window.velocityY = 4;
  window.lifetime = 800;
   
  ghost.depth = window.depth
  ghost.depth = ghost.depth+1
  
  var climber = createSprite(200,10);
  climber.addImage("climber",climberimg) ;
  climber.velocityY = 4;
  climber.x = window.x
  climber.lifetime = 800;
   
  var invisibleBlock = createSprite(200,15);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 2;
  invisibleBlock.x = window.x;
  invisibleBlock.lifetime = 800;
  invisibleBlock.velocityY = 4;
  invisibleBlock.visible = false;
   
  windowsgroup.add(window);
  climbergroup.add(climber);
  invisibleblockgroup.add(invisibleBlock);
 }
}