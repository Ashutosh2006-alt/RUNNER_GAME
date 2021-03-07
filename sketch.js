//THIS ARE THE VARIABLES REQUIRED FOR THE GAME
var START =2;
var PLAY = 1;
var END = 0;
var gameState = 2;
var score = 0;
var gameOver;
var restart;
var player;
var edges;
var road;
var logo ;
var back;
var down;

//THIS IS THE FUNCTION PRELOAD TO LOAD THE ANIMATION,IMAGES,SOUND IN THE GAME 
function preload() {
  //THIS ARE THE IMAGES
  gameOverImg = loadImage("game.png");
  restartImg = loadImage("restart.png");
  roadImage = loadImage("Road1.png");
  moneyImg1 = loadImage("bundle.png");
  moneyImg = loadImage("money.png");
  backImg = loadImage("b.png");
  logoImg = loadImage("logo.png");
  upImg = loadImage("a2.png");
  
  //THIS ARE THE ANIMATIONS
  sword_animation = loadAnimation("s1.png", "s2.png", "s3.png", "s4.png", "s5.png", "s6.png", "s7.png", "s8.png", "s9.png", "s10.png", "s11.png", "s12.png", "s13.png", "s14.png");
  player_running = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png");
  player_stop = loadAnimation("1.png");
  sword_stop = loadAnimation("s13.png");

  //THIS ARE THE SOUNDS
  moneySound = loadSound("m3.wav");
  hitSound = loadSound("m1.mp3");
}

//THIS IS THE FUNCTION SETUP OF ARRANING THE OBJECT IN THE GAME 
function setup() {

  //THIS IS THE SCREEN COMPATABLE CANVAS WHICH WILL CHANGE ITS SIZE ACCORDING TO THE SCREEN SIZE
  createCanvas(windowWidth, windowHeight);

  //THIS IS THE DEFAULT BACKGROUND
  background("black");

  //THIS IS THE ROAD OF THE GAME
  road = createSprite(width / 2, 200);
  road.addImage(roadImage);
  road.velocityY = (15 + score / 50);

  //THIS IS THE PLAYER OF THE GAME 
  player = createSprite(width / 2, height - 100);
  player.addAnimation("running", player_running);
  player.scale = 1.5;

  //THIS IS THE GAMEOVER SPRITE FOR THE GAME
  gameOver = createSprite(width / 2, height / 2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.2;

  //THIS IS THE BACKGROUND FOR THE SCORE PANEL
  back = createSprite(width / 2, height - 750);
  back.addImage(backImg);
  back.scale = 1.5

  //THIS IS THE RESTART BUTTON
  restart = createSprite(width/2,height-100);
  restart.addImage(restartImg);
  restart.scale = 0.09;

  //THIS IS THE DOWN BUTTON
  down = createSprite(width/2,height-100);
  down.addImage(upImg);
  down.scale = 0.1;

  //THIS IS THE LOGO FOR THE GAME
  logo = createSprite(width/2,height-480);
  logo.addImage(logoImg);
  logo.scale = 0.6;

  //CREATING EDGE FOR THE GAME
  edges = createEdgeSprites();

  //CREATING GROUPS FOR THE GAME
  moneyGroup = new Group();
  moneyGroup1 = new Group();
  swordGroup = new Group();

}

//THIS IS THE FUNCTION DRAW FOR THE GAME WHERE WE DRAW FUNCTION FOR THE GAME
function draw() {
  
  //THIS IS THE GAMESTATE START FOR THE GAME
  if(gameState === START){
    //MAKING INVISIBLE THE SPRITE WE DONT NEED FOR THIS GAMESTATE
    back.visible = false;
    road.visible = false;
    player.visible = false;
    gameOver.visible = false;
    restart.visible = false;

    //WRITING THE FUNCTION FOR THE DOWN BUTTON
    if(mousePressedOver(down)){
      back.visible = true;
      road.visible = true;
      player.visible = true;
      gameState = PLAY;
    }
  }

  //THIS IS THE FUNCTION TO SHOW ALL THE SPRITES IN THE GAME
  drawSprites();

  //THIS IS THE GAMESTATE PLAY FOR THE GAME 
  if (gameState === PLAY) {
    down.visible = false;
    logo.visible = false;
    restart.visible = false;
    gameOver.visible = false;
    player.collide(edges);

    //MAKING THE ROAD INFINITE
    if (road.y > height) {
      road.y = height / 2.5;
    }

    //PRESSING THE LEFT TO MOVE LEFT
    if (keyDown("left")) {
      player.x = player.x - 25;
    }

    //PRESSING THE RIGHT TO MOVE RIGHT
    if (keyDown("right")) {
      player.x = player.x + 25;
    }

    //CREATING THE POINT
    if (frameCount % 100 == 0) {
      var money = createSprite(Math.round(random(200, width - 200)), 100, 10, 10);
      money.addImage(moneyImg);
      money.scale = 0.05;
      money.velocityY = (15 + score / 50);
      money.lifetime = 100;
      moneyGroup.add(money);
    }

    //CREATING THE POINT
    if (frameCount % 540 == 0) {
      var money1 = createSprite(Math.round(random(200, width - 200)), 100, 10, 10);
      money1.addImage(moneyImg1);
      money1.scale = 0.05;
      money1.velocityY = (15 + score / 50);
      money1.lifetime = 115;
      moneyGroup1.add(money1);
    }

    //CREATING THE SWORD
    if (frameCount % (400 -score /50) == 0) {
      var sword = createSprite(Math.round(random(300, width -300)), 100, 10, 10);
      sword.addAnimation("spining", sword_animation);
      sword.scale = 1.5;
      sword.velocityY = (15 + score / 50);
      sword.lifetime = 115;
      swordGroup.add(sword);
    }

    //GIVING A POINT TO THE PLAYER
    if (player.isTouching(moneyGroup)) {
      moneySound.play();
      moneyGroup.destroyEach();
      score = score + 50;
    }

    //GIVING A POINT TO THE PLAYER
    if (player.isTouching(moneyGroup1)) {
      moneySound.play();
      moneyGroup1.destroyEach();
      score = score + 100;
    }

    //LOSING THE PLAYER
    if (player.isTouching(swordGroup)) {
      hitSound.play();
      gameState = END;
    }

    //THIS THE FUNCTION SCORE FOR THE CURRENT GAME
    textSize(30);
    stroke("white");
    fill("white");
    text("treasure : " + score, width - 850, height - 700);
    
    // THIS IS THE GAMESTATE END FOR THE GAME
  } else if (gameState === END) {
    down.visible = false;
    logo.visible = false;
    restart.visible = true;
    gameOver.visible = true;
    swordGroup.setVelocityYEach(0);
    road.velocityY = 0;
    player.addAnimation("running", player_stop);
    moneyGroup.destroyEach();
    moneyGroup1.destroyEach();
    swordGroup.destroyEach();
    //THIS IS THE FUNCTION FOR MAKING RESTART BUTTON 
    if( mousePressedOver(restart)){
      score = 0;
      player.addAnimation("running",player_running);
      road.velocityY = (15 +score/50);
      gameState = PLAY;
    }

    //THIS IS THE FUNCTION OF THE END SCORE
    textSize(30);
    stroke("white");
    fill("white");
    text("treasure : " + score, width - 850, height - 700);
  }
}