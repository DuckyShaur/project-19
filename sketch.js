var skateboardingImg,guy_on_skateboard,skateboardingImg2;
var benchImg,bench;
var cityImg,city;
var END = 0
var PLAY = 1
var gameState = PLAY
var gameover_img,gameover
var inv_ground
var score
var benchesGroup
var restart_img,restart;


function preload(){
skateboardingImg = loadAnimation("images-removebg-preview.png");
skateboardingImg2 = loadAnimation("download-removebg-preview.png")
benchImg = loadImage("download__2_-removebg-preview.png")
cityImg = loadImage("19333403.jpg")
gameover_img = loadImage("gameOver.png");
restart_img = loadImage("restart.png")
}

function setup() {
 createCanvas(windowWidth,windowHeight,);
 city = createSprite(width+500,height/4+50);
 city.addImage("city",cityImg);
city.scale = 0.5

guy_on_skateboard = createSprite(150,height-100)
guy_on_skateboard.addAnimation("skate",skateboardingImg)
guy_on_skateboard.addAnimation("crash",skateboardingImg2)

gameOver = createSprite(width/2,height/2-100)
gameOver.addImage("gameover",gameover_img)
restart = createSprite(width/2,height/2)
restart.addImage("restart",restart_img)

inv_ground = createSprite(width/2,height-10,2000,5)
inv_ground.visible = false

benchesGroup = createGroup()

score = 0 
city.depth = score.depth;
score.depth = score.depth + 1;
guy_on_skateboard.debug = true
guy_on_skateboard.setCollider("rectangle",0,0,100,guy_on_skateboard.height)
}

function draw() {
background(255)


console.log("this is ",gameState)


if(gameState === PLAY){
  gameOver.visible = false
  restart.visible = false
  guy_on_skateboard.changeAnimation("skate",skateboardingImg);
  city.velocityX = -(5+3*score/100);

  score = score + Math.round(getFrameRate()/60);
  
  if (city.x < width/2){
    city.x = width;
  }
  
  if(keyDown("space")&& guy_on_skateboard.y >= height-130) {
      guy_on_skateboard.velocityY = -16
       
  }
  
  guy_on_skateboard.velocityY = guy_on_skateboard.velocityY + 0.8

  spawnBench();
  
  if(benchesGroup.isTouching(guy_on_skateboard)){
  gameState = END;
    
  }
}
 else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
   
    city.velocityX = 0;
    guy_on_skateboard.velocityY = 0
   
    guy_on_skateboard.changeAnimation("crash", skateboardingImg2);
  benchesGroup.setLifetimeEach(-1);
   
   benchesGroup.setVelocityXEach(0);
   if(mousePressedOver(restart)){
     reset()
   }
 }



guy_on_skateboard.collide(inv_ground);
 
drawSprites()
textSize(30)
text("Score: "+ score, width-300,50);
text("Hi: " + localStorage["High Score"],width-500,50)
}

function spawnBench() {
    //write code here to spawn the clouds
    if (frameCount % Math.round(120,300) === 0) {
       bench = createSprite(width,height-50,40,10);
      bench.addImage(benchImg);
      bench.scale = .5;
      bench.velocityX = -(5+3*score/100);
      
       //assign lifetime to the variable
      bench.lifetime = 1000;
      
      //adjust the depth
      bench.depth = guy_on_skateboard.depth;
      guy_on_skateboard.depth = guy_on_skateboard.depth + 1;
      
      //adding cloud to the group
     benchesGroup.add(bench);
      }
  }
function reset(){
    gameState = PLAY
    benchesGroup.destroyEach()
    if(localStorage["High Score"] < score){
      localStorage["High Score"] = score
    }
    score = 0
  
}