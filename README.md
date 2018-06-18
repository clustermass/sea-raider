## Sea Raider

### Overview

Sea Raider is arcade shooter inspired by original Sea Raider manufactured by by Midway Manufacturing Co. in 1979.
The object of the game is fire torpedos at ships sailing across the horizon. Torpedos are aimed by viewing thru the periscope and fired using a mouse button. You must lead the ships with your torpedos and this is the skill/challenge of the game. After the torpedo is fired you can watch it streak just under the water surface towards the enemy ship. Player is given 10 topedos per game. In the background you hear sonar beeping and once a ship is hit you see and hear the explosion. If player is able to destroy 10 ships with 10 torpedos, game restarts, but ships counter continues to add up destroyed ships.

### Functionality & MVP  

In Sea Raider, player will be able to:

- [ ] Start the game by pressing START button
- [ ] Adjust periscope by moving mouse or using touchpad
- [ ] Fire Torpedo by pressing left mouse button
- [ ] Hear sounds on collisions and when torpedo is fired
- [ ] Mute sound

### Wireframes

This game will consist of a single screen made mostly with canvas, current count of torpedos left and ships destroyed. It also will have Game Over sign that will lit up when the game is over.

Page will have Start button to start the game.
![Wireframe](https://github.com/clustermass/sea-raider/blob/master/sea_raider.jpg)


### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript for overall structure and game logic,
- `HTML5 Canvas` for DOM manipulation and rendering,
- `Web Audio API` for sound generation, processing and control.


All game code will be placed in single javascript file.

### Implementation Timeline

**Over the weekend**:
- [ ] Create backround image for gameplay.
- [ ] Create periscope image and make it to response to mouse movements.

**Day 1**: Create logic to move torpedos

- [ ] Make proper animations for moving torpedos in different directions
- [ ] Find and attach appropriate sound when torpedo is fired.

**Day 2**: Add ships to gameplay

- [ ] Find ship image models on the internet
- [ ] make them move on the screen


**Day 3**: Create game logic


- [ ] Set rules when game should be over
- [ ] Count torpedos and destroyed ships
- [ ] Implement collision detections
- [ ] Count destroyed ships

**Day 4**: Create initial screen to start the game

- [ ] Create initial screen that will display previous game score
- [ ] Build out list of instruments
- [ ] Have a styled `Canvas`, nice looking controls and title


### Bonus feature

- [ ] Increase ships speed every time round is restarted
