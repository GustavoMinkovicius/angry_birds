const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg;
var plataforma;

var estadoJogo = "onSling"

var chain

var bg = "sprites/bg.png"

var pontuacao = 0;

function preload() {
    setBackgroundImage();
}

function setup(){

    // var teste = ['sal', 15, true];
    // var teste2 = [[1,2],[2,3],[3,4]]
    // console.log(teste2[0][1]);
    // console.log(teste);
    // teste.push("sasssssss")
    // console.log(teste)
    // teste.pop();
    // console.log(teste);

    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20)
    plataforma = new Ground(150,305,300,170)

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    chain = new SlingShot (bird.body, {x:200,y:50 });

}

function draw(){
    if(backgroundImg)background(backgroundImg);
    noStroke();
    textSize(35)
    fill("white");
    text("pontuação: " + pontuacao,width-300, 50)
    Engine.update(engine);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();

    plataforma.display();

    chain.display();
}

function keyPressed() {
    if(keyCode === 32 && bird.body.speed < 1){
        estadoJogo ="onSling";
        bird.caminho = [];
        //Matter.body.setPosition(bird.body,{x:200,y:50})
        chain.reiniciar(bird.body);
        
    }
}
function mouseDragged(){
    if(estadoJogo !== "launched"){
        Matter.Body.setPosition(bird.body,{x:mouseX, y:mouseY})
    }

}

function mouseReleased(){
   chain.voar();
   estadoJogo= "launched";

}

async function setBackgroundImage(){
    var resposta = await fetch("http://worldtimeapi.org/api/timezone/Asia/Tokyo");
    var dados = await resposta.json();
    var hora = dados.datetime.slice(11,13);
    
    if(hora >= 05 && hora <= 19){
        bg = "sprites/bg.png";
    } else {
        bg = "sprites/bg2.jpg" 
    }
    backgroundImg = loadImage(bg);
}