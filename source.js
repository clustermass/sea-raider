

class Ship{

  constructor(image,invertedImage, long, weight = 0){
    this.image = image;
    this.position = 0;
    this.weight = weight;
    this.inverted = false;
    this.invertedImage = invertedImage;
    this.normalImage = image;
    this.long = long; //We need this to calculate random intervals between ships

  }

  invert(){
    if (this.inverted){
      this.image = this.normalImage;
      this.inverted = false;
    }
    else{
      this.image = this.invertedImage;
      this.inverted = true;
    }
  }

  checkIfInRange(from,to){
    let tail = this.position + this.image.naturalWidth
    if(from >= this.position && from <= tail){
      return true
    }
    else if (to >= this.position && to <= tail){
      return true
    }
    else{
      return false
    }
  }

}



let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let mainScreen = document.getElementById("welcome");
mainScreen.classList.add('show_welcome');
let startButton = document.getElementById("start");
startButton.addEventListener('click', ()=>(startGame()) )
let displayTorpedos = document.getElementById("torpedos");
let displayDestroyedShips = document.getElementById("ships");
let mask = document.getElementById("mask");
let muteButton = document.getElementById("mutebtn");
muteButton.addEventListener('click', ()=>(mutePage()))
let sounds = []

function muteAll(elem) {
  elem.muted = true;
  elem.pause();
}


function mutePage() {
  if(soundMuted){
    sounds.forEach( audio => (audio.muted = false) );
    soundMuted = false;
    muteButton.classList.remove('soundoff')
    ambient.play();
  }else{
    sounds.forEach( audio => muteAll(audio) );
    soundMuted = true;
    muteButton.classList.add('soundoff')
  }


}
let nextLevel = false
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

let soundMuted = false;
let gameIsOver = false;
let torpedosQuantity = 10;
let destroyedShips = 0;
let movementSpeed = -2;
let movementSpeedCount = 0;
let explosionInProgress = false
let explosionScene = new Image()
explosionScene.src = './files/explosionscene.jpg';
let explosionSection = 0;
let explosionFire = new Image()
explosionFire.src = './files/fire.png';

function bringMainScreenBack(){
      setTimeout(()=>{
          mainScreen.classList.add('show_welcome');
          torpedoFired = false;
          gameIsOver = false;
          explosionInProgress = false;
          mask.classList.add('mask')
        },4000)
        bringMainScreenBack = noop;
      }

function startGame(score = null){
  target.classList.add('targeta')
  ambient.play();
  siren.play();
  if (score === null ){
    mainScreen.classList.remove('show_welcome');
    torpedoFired = false;
    torpedoShapeX = 0;
    torpedoShapeY = 0;
    torpedoFMoveToX = 0;
    torpedoFMoveToY = 0;
    torpedoSMoveToX = 0;
    torpedoSMoveToY = 0;
    torpedoTMoveToX = 0;
    torpedoTMoveToY = 0;
    torpedoFillColor = "";

    gameIsOver = false;
    torpedosQuantity = 10;
    destroyedShips = 0;
    movementSpeed = -2
    movementSpeedCount = 0;
    explosionInProgress = false;
    displayTorpedos.innerHTML = torpedosQuantity
    displayDestroyedShips.innerHTML = destroyedShips

    bringMainScreenBack = ()=>{
          setTimeout(()=>{
              mainScreen.classList.add('show_welcome');
              torpedoFired = false;
              gameIsOver = false;
              explosionInProgress = false;
              mask.classList.add('mask')
            },4000)
            bringMainScreenBack = noop;
          }

  }else{
    torpedoShapeX = 0;
    torpedoShapeY = 0;
    torpedoFMoveToX = 0;
    torpedoFMoveToY = 0;
    torpedoSMoveToX = 0;
    torpedoSMoveToY = 0;
    torpedoTMoveToX = 0;
    torpedoTMoveToY = 0;
    torpedoFillColor = "";
    torpedoFired = false;
    mainScreen.classList.remove('show_welcome');
    gameIsOver = false;
    torpedosQuantity = torpedosQuantity + 11
    destroyedShips = score
    movementSpeed = movementSpeed + 1
    explosionInProgress = false;
    displayTorpedos.innerHTML = torpedosQuantity
    displayDestroyedShips.innerHTML = destroyedShips
  }
}



function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}



let leftdirection = true
let shipsArray = []

generateShipsArray()

function generateShipsArray(){
  let imgShip1 = new Image();
  imgShip1.src = './files/ship1.png';
  let imgShip1i = new Image();
  imgShip1i.src = './files/ship1i.png';
  let imgShip2 = new Image();
  imgShip2.src = './files/ship2.png';
  let imgShip2i = new Image();
  imgShip2i.src = './files/ship2i.png';
  let imgShip3 = new Image();
  imgShip3.src = './files/ship3.png';
  let imgShip3i = new Image();
  imgShip3i.src = './files/ship3i.png';
  let imgShip4 = new Image();
  imgShip4.src = './files/ship4.png';
  let imgShip4i = new Image();
  imgShip4i.src = './files/ship4i.png';
  let ship1= new Ship(imgShip1,imgShip1i,90)
  let ship2 = new Ship(imgShip2,imgShip2i,110)
  let ship3 = new Ship(imgShip3,imgShip3i,110)
  let ship4 = new Ship(imgShip4,imgShip4i,110)

  shipsArray = []



  shipsArray.push(ship2)
  shipsArray.push(ship3)
  shipsArray.push(ship4)

  shipsArray = shuffleArray(shipsArray)

  if(leftdirection){
    ship1.position = 820;
    for (let i = 0; i < shipsArray.length; i++) {
      if (i === 0){
        shipsArray[i].position = ship1.position + ship1.long + Math.floor((Math.random() * (591 - 45) + 45))
      }else{
        shipsArray[i].position = shipsArray[i-1].position + shipsArray[i-1].long + Math.floor((Math.random() * (591 - 45) + 45))
      }
    }
    shipsArray.unshift(ship1)
  }else{
    ship1.invert()
    ship1.position = 0;
    for (let i = 0; i < shipsArray.length; i++) {
      if (i === 0){
        shipsArray[i].position = - ship1.position - ship1.long - Math.floor((Math.random() * (591 - 45) + 45))
        shipsArray[i].invert()
      }else{
        shipsArray[i].position = shipsArray[i-1].position - shipsArray[i-1].long - Math.floor((Math.random() * (591 - 45) + 45))
        shipsArray[i].invert()
      }
    }
    shipsArray.push(ship1)
  }

}


let fire_sound = new Audio('./files/launch_sound2.mp3');
let explosion = new Audio('./files/explosion.mp3');
let siren = new Audio('./files/siren.mp3');
let ambient = new Audio('./files/ambient.mp3');
ambient.volume = 0.05;
ambient.loop = true

sounds.push(fire_sound)
sounds.push(explosion)
sounds.push(siren)
sounds.push(ambient)

window.onmousemove = (e)=>{
  e = e || window.event;
  setTargetCoordinates(e)
};


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

  }
}


function checkIfAnyShipInRange(from, to){
  return_value = false
  for (let i = 0; i < shipsArray.length; i++) {
    if(shipsArray[i].checkIfInRange(from,to)){
      return_value = true
    }
  }
  return return_value
}



function checkForHit(mousePos){
  //These are canvas pixel ranges for hitting target, very close to real machine implementation
  // | 185 - 214 |  215 - 244 | 245 - 274 | Section A
  if(mousePos >= 0 && mousePos <= 274){
    if(mousePos >= 0 && mousePos <= 214){
      if(checkIfAnyShipInRange(185,214)){
        return("A")
      }
      else{
        return ("Z")
      }
    }
    else if(mousePos >= 215 && mousePos <= 244){
      if(checkIfAnyShipInRange(215,244)){
        return("A")
      }
      else{
        return ("Z")
      }
    }
    else{
      if(checkIfAnyShipInRange(245,274)){
        return("A")
      }
      else{
        return ("Z")
      }

    }
  }
  //  275 - 304 | 305 - 334 | 335 - 364 | Section B
  if(mousePos >= 275 && mousePos <= 364){
    if(mousePos >= 275 && mousePos <= 304){
      if(checkIfAnyShipInRange(275,304)){
        return("B")
      }
      else{
        return ("Z")
      }
    }
    else if(mousePos >= 305 && mousePos <= 334){
      if(checkIfAnyShipInRange(305,334)){
        return("B")
      }
      else{
        return ("Z")
      }
    }
    else{
      if(checkIfAnyShipInRange(335,364)){
        return("B")
      }
      else{
        return ("Z")
      }
    }
  }
  // 365 - 394 | 395 - 424 | 425 - 454 | Section C
  if(mousePos >= 365 && mousePos <= 454){
    if(mousePos >= 365 && mousePos <= 394){
      if(checkIfAnyShipInRange(365,394)){
        return("C")
      }
      else{
        return ("Z")
      }
    }
    else if(mousePos >= 395 && mousePos <= 424){
      if(checkIfAnyShipInRange(395,424)){
        return("C")
      }
      else{
        return ("Z")
      }
    }
    else{
      if(checkIfAnyShipInRange(425,454)){
        return("C")
      }
      else{
        return ("Z")
      }
    }
  }
  //  455 - 484 | 485 - 514 | 515 - 544 | Section D
  if(mousePos >= 455 && mousePos <= 544){
    if(mousePos >= 455 && mousePos <= 484){
      if(checkIfAnyShipInRange(455,484)){
        return("D")
      }
      else{
        return ("Z")
      }
    }
    else if(mousePos >= 485 && mousePos <= 514){
      if(checkIfAnyShipInRange(485,514)){
        return("D")
      }
      else{
        return ("Z")
      }
    }
    else{
      if(checkIfAnyShipInRange(515,544)){
        return("D")
      }
      else{
        return ("Z")
      }
    }
  }
  // 545 - 574 | 575 - 604 | 605 - 634  | Section E
  if(mousePos >= 545 && mousePos <= 634){
    if(mousePos >= 545 && mousePos <= 574){
      if(checkIfAnyShipInRange(545,574)){
        return("E")
      }
      else{
        return ("Z")
      }
    }
    else if(mousePos >= 575 && mousePos <= 604){
      if(checkIfAnyShipInRange(575,604)){
        return("E")
      }
      else{
        return ("Z")
      }
    }
    else{
      if(checkIfAnyShipInRange(605,634)){
        return("E")
      }
      else{
        return ("Z")
      }
    }
  }
  // 635 - 664 | 665 - 694 | 695 - 724 | Section F
  if(mousePos >= 635 && mousePos <= 724){
    if(mousePos >= 635 && mousePos <= 664){
      if(checkIfAnyShipInRange(635,664)){
        return("F")
      }
      else{
        return ("Z")
      }
    }
    else if(mousePos >= 665 && mousePos <= 694){
      if(checkIfAnyShipInRange(665,694)){
        return("F")
      }
      else{
        return ("Z")
      }
    }
    else{
      if(checkIfAnyShipInRange(695,724)){
        return("F")
      }
      else{
        return ("Z")
      }
    }
  }
  // 725 - 754 | 755 - 784 | 785 - 814| Section G
  if(mousePos >= 725 && mousePos <= 1000){
    if(mousePos >= 725 && mousePos <= 754){
      if(checkIfAnyShipInRange(725,754)){
        return("G")
      }
      else{
        return ("Z")
      }
    }
    else if(mousePos >= 755 && mousePos <= 784){
      if(checkIfAnyShipInRange(755,784)){
        return("G")
      }
      else{
        return ("Z")
      }
    }
    else{
      if(checkIfAnyShipInRange(785,814)){
        return("G")
      }
      else{
        return ("Z")
      }
    }
  }



}

function fire(mousePos){

  if(!torpedoFired){
    torpedosQuantity--;
    displayTorpedos.innerHTML = torpedosQuantity
    fire_sound.pause()
    fire_sound.currentTime = 0;
    fire_sound.play();
    torpedoFired = true
    if(mousePos >= 0 && mousePos <= 274){
      setTorpedoDirection(-270)
    }
    else if(mousePos >= 275 && mousePos <= 364){
      setTorpedoDirection(-180)
    }
    else if(mousePos >= 365 && mousePos <= 454){
      setTorpedoDirection(-90)
    }
    else if(mousePos >= 455 && mousePos <= 544){
      setTorpedoDirection(0)
    }
    else if(mousePos >= 545 && mousePos <= 634){
      setTorpedoDirection(90)
    }
    else if(mousePos >= 635 && mousePos <= 724){
      setTorpedoDirection(180)
    }
    else if(mousePos >= 725 && mousePos <= 1000){
      setTorpedoDirection(270)
    }

    setTimeout(()=>{
      torpedoShapeX = 0;
      torpedoShapeY = 0;
      torpedoFMoveToX = 0;
      torpedoFMoveToY = 0;
      torpedoSMoveToX = 0;
      torpedoSMoveToY = 0;
      torpedoTMoveToX = 0;
      torpedoTMoveToY = 0;

      let check = checkForHit(mousePos)

      if(check === "Z"){
        torpedoFired = false
      }
    evalFire(check)
    if(torpedosQuantity === 0 && destroyedShips === 0){
      gameIsOver = true
    }
    else if (torpedosQuantity === 0 && destroyedShips % 10 !== 0) {
      gameIsOver = true
    }
    else if (check != "Z" && destroyedShips % 10 === 0) {
      nextLevel = true
    }
  },2800)

  }

}


function displayExplosion(sectionToFlash){
  switch (sectionToFlash) {
    case "A":
    mask.classList.remove('mask')
    explosionSection = 176;
    setTimeout(()=>{
      mask.classList.add('mask')
      explosionInProgress = false;
      torpedoFired = false
    },1500)
    break;
    case "B":
    mask.classList.remove('mask')
    explosionSection = 266
    setTimeout(()=>{
      mask.classList.add('mask')
      explosionInProgress = false;
      torpedoFired = false
    },1500)
    break;
    case "C":
    mask.classList.remove('mask')
    explosionSection = 356
    setTimeout(()=>{
      mask.classList.add('mask')
      explosionInProgress = false;
      torpedoFired = false
    },1500)
    break;
    case "D":
    mask.classList.remove('mask')
    explosionSection = 446
    setTimeout(()=>{
      mask.classList.add('mask')
      explosionInProgress = false;
      torpedoFired = false
    },1500)
    break;
    case "E":
    mask.classList.remove('mask')
    explosionSection = 536
    setTimeout(()=>{
      mask.classList.add('mask')
      explosionInProgress = false;
      torpedoFired = false
    },1500)
    break;
    case "F":
    mask.classList.remove('mask')
    explosionSection = 626
    setTimeout(()=>{
      mask.classList.add('mask')
      explosionInProgress = false;
      torpedoFired = false
    },1500)
    break;
    case "G":
    mask.classList.remove('mask')
    explosionSection = 716
    setTimeout(()=>{
        mask.classList.add('mask')
      explosionInProgress = false;
      torpedoFired = false
    },1500)
    break;
    default:

  }
}

function evalFire(sectionToFlash){
  if(sectionToFlash != "Z"){
    fire_sound.pause()
    fire_sound.currentTime = 0;
    explosionInProgress = true;
    explosion.play()
    destroyedShips++
    displayDestroyedShips.innerHTML = destroyedShips
    displayExplosion(sectionToFlash)

    if(leftdirection){
      leftdirection = false;
      for (let i = 0; i < shipsArray.length; i++) {
        shipsArray[i].invert()
      }
    }
    else{
      leftdirection = true;
      for (let i = 0; i < shipsArray.length; i++) {
        shipsArray[i].invert()
      }
    }
  }
}

function flashTrace(){
  torpedoFillColor = "rgba(255, 50, 50, 0.2)";
  setTimeout(()=>(torpedoFillColor = "rgba(255, 50, 50, 0.3)"),75)
  setTimeout(()=>(torpedoFillColor = "rgba(255, 50, 50, 0.4)"),150)
  setTimeout(()=>(torpedoFillColor = "rgba(255, 50, 50, 0.3)"),200)
  setTimeout(()=>(torpedoFillColor = "rgba(255, 50, 50, 0.3)"),275)
}

function setTorpedoDirection(delta){

  // Middle values used for positive and negative delta
  torpedoShapeX = 489;
  torpedoShapeY = 514;
  torpedoFMoveToX = 511;
  torpedoFMoveToY = 514;
  torpedoSMoveToX = 511;
  torpedoSMoveToY = 527;
  torpedoTMoveToX = 489;
  torpedoTMoveToY = 527;

  flashTrace()
  torpedoShapeX = 489 + delta;
  torpedoFMoveToX = 511 + delta;
  torpedoSMoveToX = 511 + delta;
  torpedoTMoveToX = 489 + delta;

  for (let i = 350; i <= 2450; i = i + 350) {
    setTimeout(()=>{
      flashTrace()
      torpedoShapeY = torpedoShapeY - 16;
      torpedoFMoveToY = torpedoFMoveToY - 16;
      torpedoSMoveToY = torpedoSMoveToY - 16;
      torpedoTMoveToY = torpedoTMoveToY - 16;
    }, i)
  }

}

function moveShips() {

  if(shipsArray.filter((ship)=>(ship.position > 0)).length === 0 && leftdirection){
    generateShipsArray()
  }else if (shipsArray.filter((ship)=>(ship.position < 1000)).length === 0 && !leftdirection) {
    generateShipsArray()
  }



  // This will determine moving speed
  if(movementSpeed === movementSpeedCount){
    movementSpeedCount = 0;

    if (leftdirection){
      for (let i = 0; i < shipsArray.length; i++) {
        shipsArray[i].position--
      }
    }
    else{
      for (let i = 0; i < shipsArray.length; i++) {
        shipsArray[i].position++
      }
    }
  }

  else if(movementSpeed > 0){

    if (leftdirection){
      for (let i = 0; i < shipsArray.length; i++) {
        shipsArray[i].position = shipsArray[i].position - movementSpeed
      }
    }
    else{
      for (let i = 0; i < shipsArray.length; i++) {
        shipsArray[i].position = shipsArray[i].position + movementSpeed
      }
    }

  }else{
    movementSpeedCount--;
  }
}

function renderGame(){

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



  if(!explosionInProgress){
    for (let i = 0; i < shipsArray.length; i++) {
      ctx.drawImage(shipsArray[i].image, shipsArray[i].position, 360)
    }
    moveShips();
  }else{
    ctx.drawImage(explosionScene,0,0)
    ctx.drawImage(explosionFire,explosionSection,265)
  }

}

function render(){
  if(!gameIsOver){

    if(nextLevel){
      nextLevel = false;
      setTimeout(()=>{
        siren.play();
        torpedosQuantity = torpedosQuantity + 11
        movementSpeedCount = 0;
        movementSpeed = movementSpeed + 1
        displayTorpedos.innerHTML = torpedosQuantity
        explosionInProgress = false

      },1500)


    }

    renderGame()
  }else{
    ambient.pause();

    ctx.font="35px Arial";

      ctx.fillStyle = "#0E1E3D";


    target.classList.remove('targeta')
    torpedoFired = true;
    ctx.fillText("GAME OVER",400,250);
    ctx.fillText(`TOTAL SHIPS DESTROYED: ${destroyedShips}`,270,300);
    bringMainScreenBack()


  }
  }
  function noop() {};

setInterval(render, 10);
