var wall, spiderman, guy, girl, oldlady, goblin;
var wallImg, spidermanImg, guyImg, girlImg, oldladyImg, goblinImg;
var totalPoints = 0;
var guyG, girlG, oldladyG, goblinGroup;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  wallImg = loadImage("wall.png");
  spidermanImg = loadAnimation(
    "01-spider.png",
    "02-spider.png",
    "03-spider.png",
    "04-spider.png",
    "05-spider.png",
    "06-spider.png",
    "07-spider.png",
    "08-spider.png",
    "09-spider.png",
    "10-spider.png",
    "11-spider.png",
    "12-spider.png",
    "13-spider.png"
  );
  guyImg = loadImage("guy.png");
  girlImg = loadImage("girl.png");
  oldladyImg = loadImage("oldlady.png");
  goblinImg = loadImage("goblin.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {
  //crear el canvas y ajustar el tamaño de la ventana para que sea compatible con el dispositivo
  createCanvas(windowWidth, windowHeight);

  wall = createSprite(width / 2, 200);
  wall.addImage(wallImg);
  wall.velocityY = 4;

  //crear sprite spiderman escalando
  spiderman = createSprite(width / 2, height - 80, 20, 20);
  spiderman.addAnimation("spidermanClimbing", spidermanImg);
  spiderman.scale = 0.4;
  spiderman.setCollider("circle", 0, 0, 115);
  spiderman.debug = false;

  guyG = new Group();
  girlG = new Group();
  oldladyG = new Group();
  goblinGroup = new Group();
}

function draw() {
  if (gameState === PLAY) {
    background(0);
    spiderman.x = World.mouseX;

    edges = createEdgeSprites();
    spiderman.collide(edges);

    //código para reiniciar el fondo

    if (wall.y > 700) {
      wall.y = height / 2;
    }

    createguy();
    creategirl();
    createoldlady();
    creategoblin();

    if (guyG.isTouching(spiderman)) {
      guyG.destroyEach();
      totalPoints = totalPoints + 50;
    } else if (girlG.isTouching(spiderman)) {
      girlG.destroyEach();
      totalPoints = totalPoints + 100;
    } else if (oldladyG.isTouching(spiderman)) {
      oldladyG.destroyEach();
      totalPoints = totalPoints + 150;
    } else {
      if (goblinGroup.isTouching(spiderman)) {
        gameState = END;

        spiderman.addAnimation("spidermanClimbing", endImg);
        spiderman.x = width / 2;
        spiderman.y = height / 2;
        spiderman.scale = 0.4;

        guyG.destroyEach();
        girlG.destroyEach();
        oldladyG.destroyEach();
        goblinGroup.destroyEach();

        guyG.setVelocityYEach(0);
        girlG.setVelocityYEach(0);
        oldladyG.setVelocityYEach(0);
        goblinGroup.setVelocityYEach(0);
      }
    }

    drawSprites();
    textSize(20);
    fill(255);
    text("Points: " + totalPoints, width - 150, 30);
  }
}

function createguy() {
  if (World.frameCount % 200 == 0) {
    //Modificar las posiciones del chico
    var guy = createSprite(
      Math.round(random(20, windowWidth - 20), 40, 10, 10)
    );
    guy.addImage(guyImg);
    guy.scale = 0.03;
    guy.velocityY = 5;
    guy.lifetime = 200;
    guyG.add(guy);
  }
}

function creategirl() {
  if (World.frameCount % 320 == 0) {
    // Modificar las posiciones de la chica

    var girl = createSprite(
      Math.round(random(20, windowWidth - 20), 40, 10, 10)
    );
    girl.addImage(girlImg);
    girl.scale = 0.25;
    girl.velocityY = 5;
    girl.lifetime = 200;
    girlG.add(girl);
  }
}

function createoldlady() {
  if (World.frameCount % 410 == 0) {
    //Modificar las posiciones de la viejita

    var oldlady = createSprite(
      Math.round(random(20, windowWidth - 20), 40, 10, 10)
    );
    oldlady.addImage(oldladyImg);
    oldlady.scale = 0.22;
    oldlady.velocityY = 5;
    oldlady.lifetime = 200;
    oldladyG.add(oldlady);
  }
}

function creategoblin() {
  if (World.frameCount % 530 == 0) {
    //Modificar las posiciones del duende para hacerla aparecer en el tamaño de pantaña disponible.

    var goblin = createSprite(
      Math.round(random(20, windowWidth - 20), 40, 10, 10)
    );
    goblin.addImage(goblinImg);
    goblin.scale = 0.2;
    goblin.velocityY = 4;
    goblin.lifetime = 300;
    goblinGroup.add(goblin);
  }
}
