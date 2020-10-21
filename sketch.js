var Play = 1;
var END = 0;
var gameState = Play;

var monkey , monkey_running,ground,groundImage;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var invisibleGround;
var over,gameoverImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage=loadImage("back.jpg");
  gameoverImage=loadImage("over.jpg")
}



function setup() {
  createCanvas(800,400);
  
  ground= createSprite(0,0,800,400);
  ground.addImage(groundImage);
  ground.scale=1;
  ground.x = ground.width/2;
  ground.velocityX = -4;
  
  
   monkey= createSprite(80,290,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  
 
  invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible =false;
 
  over =createSprite(200,200)
  over.addImage(gameoverImage);
  over.scale=0.15;
  over.visible=false;
 
  score=0;

  foodGroup= new Group();
  obstacleGroup=new Group();
}


function draw() {
 
  background("white");
 if(ground.x<0)
    {
      ground.x=ground.width/2;
    }
   edges = createEdgeSprites(); 
  if(gameState===Play){
  spawnfood();
  spawnobstacle();
    
  monkey.collide(invisibleGround);
    
  if(keyDown("space") && monkey.y>280){
    monkey.velocityY = -19;
  }
    console.log(monkey.y);
  monkey.velocityY = monkey.velocityY + 0.8;
  
  
    if(monkey.isTouching(obstacleGroup)){
  gameState=END;
}
  }
  

  if(gameState==END){
    over.visible=true;
    ground.visible=false;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.visible=false;
  }
  drawSprites();
   text("survival Time = "+ score,300,20);
}

function spawnfood(){
if(World.frameCount%80===0){
  banana= createSprite(800,200);
  banana.y=Math.round(random(100,150));
  banana.addImage(bananaImage);
  banana.scale=0.18;
  banana.velocityX=-8;
  banana.setLifetimeEach=50;
  foodGroup.add(banana);
}
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+1;
  }
}
function spawnobstacle(){
if(World.frameCount%80===0){  
rock=createSprite(800,300);  
rock.y=Math.round(random(320,321));  
rock.addImage(obstacleImage);
rock.scale=0.2;
rock.velocityX=-8;
obstacleGroup.add(rock);
}
}
