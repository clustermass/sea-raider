
// let img= document.getElementById("scream");

// window.onload = ()=>{
//   img = document.getElementById("scream");
// }

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let torpedoFired = false;
let torpedoShapeX = 0;
let torpedoShapeY = 0;
let torpedoFMoveToX = 0;
let torpedoFMoveToY = 0;
let torpedoSMoveToX = 0;
let torpedoSMoveToY = 0;
let torpedoTMoveToX = 0;
let torpedoTMoveToY = 0;
let torpedoFillColor = "";

let fire_sound = new Audio('./files/launch_sound2.mp3');






let rightPressed = false;
let leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

window.onmousemove = (e)=>{
  e = e || window.event;
  // console.log(e)
  setTargetCoordinates(e)
};

let pad = document.getElementById("myCanvas");

let target = document.getElementById("target");
target.style.top = 58 + 'px'
target.addEventListener("click", (e)=>{fire(e.clientX - canvas.getBoundingClientRect().x)})


function moveTaget(pos){
target.style.left = pos + 'px'
target.style.top = 58 + 'px'
}


function setTargetCoordinates(e){
let xInGamePad = e.clientX - canvas.getBoundingClientRect().x //X starts at canvas

  if(xInGamePad >= 205 && xInGamePad <= 795){
    moveTaget(xInGamePad - 798 )
  }


  if(xInGamePad >= 0 && xInGamePad <= 1000){

      // console.log("cursor" +xInGamePad )
      console.log("cursor" + (570 - e.clientY) )


  }





// moveTaget(e.clientX - canvas.getBoundingClientRect().x)
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function fire(mousePos){
  if(!torpedoFired){
    fire_sound.play();
    torpedoFired = true
    if(mousePos >= 455 && mousePos <= 544){
        setTorpedoDirection(1)
    }



    // Logic decides if game is over, if not, we set
    // torpedoFired to false
    setTimeout(()=>{
  torpedoFired = false
  torpedoShapeX = 0;
  torpedoShapeY = 0;
  torpedoFMoveToX = 0;
  torpedoFMoveToY = 0;
  torpedoSMoveToX = 0;
  torpedoSMoveToY = 0;
  torpedoTMoveToX = 0;
  torpedoTMoveToY = 0;
  },2800)

  }

}


function flashTrace(){
  torpedoFillColor = "rgba(255, 50, 50, 0.2)";
  setTimeout(()=>(torpedoFillColor = "rgba(255, 50, 50, 0.3)"),75)
  setTimeout(()=>(torpedoFillColor = "rgba(255, 50, 50, 0.4)"),150)
  setTimeout(()=>(torpedoFillColor = "rgba(255, 50, 50, 0.3)"),200)
  setTimeout(()=>(torpedoFillColor = "rgba(255, 50, 50, 0.3)"),275)
}

function setTorpedoDirection(dir){

switch (dir) {
  case 1:
flashTrace()
torpedoShapeX = 489;
torpedoShapeY = 514;
torpedoFMoveToX = 511;
torpedoFMoveToY = 514;
torpedoSMoveToX = 511;
torpedoSMoveToY = 527;
torpedoTMoveToX = 489;
torpedoTMoveToY = 527;

for (let i = 350; i <= 2450; i = i + 350) {
  setTimeout(()=>{
      flashTrace()
      torpedoShapeY = torpedoShapeY - 16;
      torpedoFMoveToY = torpedoFMoveToY - 16;
      torpedoSMoveToY = torpedoSMoveToY - 16;
      torpedoTMoveToY = torpedoTMoveToY - 16;
  }, i)
}

  case 2:
  case 3:
  case 4:
  case 5:
  case 6:
  case 7:
  default:

}

}



// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }
function moveShips() {


}

function draw(){

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = true;
    if(torpedoFired){
          ctx.beginPath();
          ctx.moveTo(torpedoShapeX, torpedoShapeY)
          ctx.lineTo(torpedoFMoveToX, torpedoFMoveToY);
          ctx.lineTo(torpedoSMoveToX, torpedoSMoveToY);
          ctx.lineTo(torpedoTMoveToX, torpedoTMoveToY);
          ctx.closePath();
          ctx.fillStyle = torpedoFillColor;
          ctx.fill();

    }

    // drawBall();
    // drawPaddle();
    //
    // if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    //     dx = -dx;
    // }
    // if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
    //     dy = -dy;
    // }
    //
    // if(rightPressed && paddleX < canvas.width-paddleWidth) {
    //     paddleX += 7;
    // }
    // else if(leftPressed && paddleX > 0) {
    //     paddleX -= 7;
    // }
    //
    // x += dx;
    // y += dy;
}


setInterval(draw, 10);
