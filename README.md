
![Screenshot](https://github.com/clustermass/sea-raider/blob/master/screen.png)

# Sea Raider
 [Play the game](https://clustermass.github.io/sea-raider/)

### Background and Overview

Sea Raider is arcade shooter inspired by original Sea Raider manufactured by by Midway Manufacturing Co. in 1979.
The object of the game is fire torpedos at ships sailing across the horizon. Torpedos are aimed by viewing thru the periscope and fired using a mouse button. You must lead the ships with your torpedos and this is the skill/challenge of the game. After the torpedo is fired you can watch it streak just under the water surface towards the enemy ship. Player is given 10 topedoes per game. In the background you hear sonar beeping and once a ship is hit you see and hear the explosion. If player is able to destroy 10 ships with 10 torpedos, game restarts, but ships counter continues to add up destroyed ships.

### Technologies

* Javascript
* HTML5
* Canvas

### Key Features

* Logic is designed to emulate actual 1979 coin operated arcade game
* Fun complexity added to the gameplay: each new round ships are moving faster!

### Challenges
Main challenge was to emulate real machine behavior, where all logic was built with relays and switches.
Original machine had 17 'hit' zones, that were matched to ships via mechanical 17 positional switch moved by periscope. The logic in this game that checks hits has 21 'hit' zones, but user only see 7 flashing torpedo "traces" (directions) on the screen, so it may seem that targeting ships is not very precise, but it is just an impression.  Speed increase feature was added with each new level, that original game couldn't implement due to mechanical limitations.

```javascript
function checkForHit(mousePos){
  //These are canvas pixel ranges for hitting target, very close to real machine implementation
  // | 185 - 214 |  215 - 244 | 245 - 274 | Section A
  //We flash torpedo trace A on the screen, but it actually divided into three 'hit' zones under the hood.
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
```
