/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./source.js":
/*!*******************!*\
  !*** ./source.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n// let img= document.getElementById(\"scream\");\n\n// window.onload = ()=>{\n//   img = document.getElementById(\"scream\");\n// }\n\nlet canvas = document.getElementById(\"myCanvas\");\nlet ctx = canvas.getContext(\"2d\");\nlet torpedoFired = false;\nlet torpedoShapeX = 0;\nlet torpedoShapeY = 0;\nlet torpedoFMoveToX = 0;\nlet torpedoFMoveToY = 0;\nlet torpedoSMoveToX = 0;\nlet torpedoSMoveToY = 0;\nlet torpedoTMoveToX = 0;\nlet torpedoTMoveToY = 0;\nlet torpedoFillColor = \"\";\n\nlet fire_sound = new Audio('./files/launch_sound2.mp3');\n\n\n\n\n\n\nlet rightPressed = false;\nlet leftPressed = false;\n\ndocument.addEventListener(\"keydown\", keyDownHandler, false);\ndocument.addEventListener(\"keyup\", keyUpHandler, false);\n\nwindow.onmousemove = (e)=>{\n  e = e || window.event;\n  // console.log(e)\n  setTargetCoordinates(e)\n};\n\nlet pad = document.getElementById(\"myCanvas\");\n\nlet target = document.getElementById(\"target\");\ntarget.style.top = 58 + 'px'\ntarget.addEventListener(\"click\", (e)=>{fire(e.clientX - canvas.getBoundingClientRect().x)})\n\n\nfunction moveTaget(pos){\ntarget.style.left = pos + 'px'\ntarget.style.top = 58 + 'px'\n}\n\n\nfunction setTargetCoordinates(e){\nlet xInGamePad = e.clientX - canvas.getBoundingClientRect().x //X starts at canvas\n\n  if(xInGamePad >= 205 && xInGamePad <= 795){\n    moveTaget(xInGamePad - 798 )\n  }\n\n\n  if(xInGamePad >= 0 && xInGamePad <= 1000){\n\n      // console.log(\"cursor\" +xInGamePad )\n      console.log(\"cursor\" + (570 - e.clientY) )\n\n\n  }\n\n\n\n\n\n// moveTaget(e.clientX - canvas.getBoundingClientRect().x)\n}\n\nfunction keyDownHandler(e) {\n    if(e.keyCode == 39) {\n        rightPressed = true;\n    }\n    else if(e.keyCode == 37) {\n        leftPressed = true;\n    }\n}\nfunction keyUpHandler(e) {\n    if(e.keyCode == 39) {\n        rightPressed = false;\n    }\n    else if(e.keyCode == 37) {\n        leftPressed = false;\n    }\n}\n\nfunction fire(mousePos){\n  if(!torpedoFired){\n    fire_sound.play();\n    torpedoFired = true\n    if(mousePos >= 455 && mousePos <= 544){\n        setTorpedoDirection(1)\n    }\n\n\n\n    // Logic decides if game is over, if not, we set\n    // torpedoFired to false\n    setTimeout(()=>{\n  torpedoFired = false\n  torpedoShapeX = 0;\n  torpedoShapeY = 0;\n  torpedoFMoveToX = 0;\n  torpedoFMoveToY = 0;\n  torpedoSMoveToX = 0;\n  torpedoSMoveToY = 0;\n  torpedoTMoveToX = 0;\n  torpedoTMoveToY = 0;\n  },2800)\n\n  }\n\n}\n\n\nfunction flashTrace(){\n  torpedoFillColor = \"rgba(255, 50, 50, 0.2)\";\n  setTimeout(()=>(torpedoFillColor = \"rgba(255, 50, 50, 0.3)\"),75)\n  setTimeout(()=>(torpedoFillColor = \"rgba(255, 50, 50, 0.4)\"),150)\n  setTimeout(()=>(torpedoFillColor = \"rgba(255, 50, 50, 0.3)\"),200)\n  setTimeout(()=>(torpedoFillColor = \"rgba(255, 50, 50, 0.3)\"),275)\n}\n\nfunction setTorpedoDirection(dir){\n\nswitch (dir) {\n  case 1:\nflashTrace()\ntorpedoShapeX = 489;\ntorpedoShapeY = 514;\ntorpedoFMoveToX = 511;\ntorpedoFMoveToY = 514;\ntorpedoSMoveToX = 511;\ntorpedoSMoveToY = 527;\ntorpedoTMoveToX = 489;\ntorpedoTMoveToY = 527;\n\nfor (let i = 350; i <= 2450; i = i + 350) {\n  setTimeout(()=>{\n      flashTrace()\n      torpedoShapeY = torpedoShapeY - 16;\n      torpedoFMoveToY = torpedoFMoveToY - 16;\n      torpedoSMoveToY = torpedoSMoveToY - 16;\n      torpedoTMoveToY = torpedoTMoveToY - 16;\n  }, i)\n}\n\n  case 2:\n  case 3:\n  case 4:\n  case 5:\n  case 6:\n  case 7:\n  default:\n\n}\n\n}\n\n\n\n// function drawBall() {\n//     ctx.beginPath();\n//     ctx.arc(x, y, ballRadius, 0, Math.PI*2);\n//     ctx.fillStyle = \"#0095DD\";\n//     ctx.fill();\n//     ctx.closePath();\n// }\nfunction moveShips() {\n\n\n}\n\nfunction draw(){\n\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n    ctx.imageSmoothingEnabled = true;\n    if(torpedoFired){\n          ctx.beginPath();\n          ctx.moveTo(torpedoShapeX, torpedoShapeY)\n          ctx.lineTo(torpedoFMoveToX, torpedoFMoveToY);\n          ctx.lineTo(torpedoSMoveToX, torpedoSMoveToY);\n          ctx.lineTo(torpedoTMoveToX, torpedoTMoveToY);\n          ctx.closePath();\n          ctx.fillStyle = torpedoFillColor;\n          ctx.fill();\n\n    }\n\n    // drawBall();\n    // drawPaddle();\n    //\n    // if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {\n    //     dx = -dx;\n    // }\n    // if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {\n    //     dy = -dy;\n    // }\n    //\n    // if(rightPressed && paddleX < canvas.width-paddleWidth) {\n    //     paddleX += 7;\n    // }\n    // else if(leftPressed && paddleX > 0) {\n    //     paddleX -= 7;\n    // }\n    //\n    // x += dx;\n    // y += dy;\n}\n\n\nsetInterval(draw, 10);\n\n\n//# sourceURL=webpack:///./source.js?");

/***/ })

/******/ });