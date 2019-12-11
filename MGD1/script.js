//Create Canvas and context
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

//Creates and loads splash screen
const splashScreen = new Image();
splashScreen.src = "Sprites/SplashScreen.png"

//Creates and loads background
const backGround = new Image();
backGround.src = "Sprites/MetalTexture.png"


//Creates and loads background
const gameOver = new Image();
gameOver.src = "Sprites/GameOver.png"

//Creates and loads background
const questions = new Image();
questions.src = "Sprites/Questions.png"

//Creates Sprite for outside the door.
const outside = new Image();
outside.src = "Sprites/Outside.png"

//Different Spirtes for different directions.
const playerIdle = new Image();
playerIdle.src = "Sprites/EyeBall.png"
const playerUp = new Image();
playerUp.src = "Sprites/EyeBallUp.png"
const playerDown = new Image();
playerDown.src = "Sprites/EyeBallDown.png"
const playerLeft = new Image();
playerLeft.src = "Sprites/EyeBallLeft.png"
const playerRight = new Image();
playerRight.src = "Sprites/EyeBallRight.png"

//Magnets
const magnetsON = new Image();
magnetsON.src = "Sprites/magnetsON.png"
const magnetsOFF = new Image();
magnetsOFF.src = "Sprites/MagnetsOFF.png"


//********************************************gw4weg***********************************
class Square {
    constructor(color, width, height, x, y, type, sprite, haveSprite) {
        this.color = color;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.type = type; //normal = 0, static = 1, trigger = 2
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.draw = haveSprite;
        this.magnetic = false;
        this.attracted = false;

        //Draws the Sprite
        this.Draw = function(x = this.x, y = this.y) {
            context.drawImage(this.sprite, x, y);
        }

        //Colours the square if there isnt a sprite
        this.Fill = function() {
            //context.drawImage(this.sprite, this.x, this.y);
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

//Aniamiton Class
class Animation {
    constructor(name, spriteLocs, time) {
        this.name = name;
        this.sprite = new Image();
        this.counter = 0;
        this.sprite.src = spriteLocs[0];
        this.timer = 0;
        this.speed = time;
        this.pauseOnLast = false;
        this.pausedOnLast = false;

        //Draws the aniamtion using the speed to cycle through the various sprites.
        this.Draw = function(posX, posY) {
            this.timer += deltaTime;

            //If the Timer is greater than speed, and not paused on last
            if (this.timer >= this.speed && !this.pausedOnLast) {
                this.timer -= this.speed;
                this.counter++;

                //Increment the counter, if it passes the length of Sprites
                //pause the animation if it needs to be paused, if not, reset
                if (this.counter >= spriteLocs.length) {
                    if (this.pauseOnLast) {
                        this.pausedOnLast = true;
                        this.counter = spriteLocs.length - 1;
                    } else
                        this.counter = 0;
                }
                this.sprite.src = spriteLocs[this.counter];
            }

            //draw call
            context.drawImage(this.sprite, posX, posY);
        };

        //Draws the aniamtion using the speed to cycle through the various sprites.
        this.DrawSprite = function(posX, posY) {
            this.sprite.src = spriteLocs[0];
            context.drawImage(this.sprite, posX, posY);
        };
    }
}


class SoundClip {
    constructor(sound) {
        this.sound = new Audio();
        this.sound.src = sound;

        //Plays the Sound
        this.Play = function() {
            this.sound.play();
        };

        //Stops the Sound
        this.Stop = function() {
            this.sound.pause();
        };
    }
}

//********************************************************************

//interactable objects
const player = new Square("player", 75, 75, 50, 50, 0, "Sprites/Nothing.png", true);
const square1 = new Square("square1", 90, 90, 60, 430, 0, "Sprites/BoxBlue.png", true);
const square2 = new Square("square2", 90, 90, 690, 430, 0, "Sprites/BoxBlue.png", true);

//Buttons
const button1 = new Square("button1", 100, 100, 600, 100, 2, "Sprites/Nothing.png", true);
const doorCollider = new Square("doorCollider", 100, 100, 190, 50, 2, "Sprites/Button.png", true);


//Outer Walls
const wallTop = new Square("#000000", 800, 80, 0, -50, 1,"Sprites/Nothing.png", false);
const wallLeft = new Square("#000000", 80, 800, -30, 0, 1, "Sprites/Nothing.png", false);
const wallBottom = new Square("#000000", 800, 80, 0, 515, 1, "Sprites/Nothing.png", false);
const wallRight = new Square("#000000", 80, 800, 775, 0, 1, "Sprites/Nothing.png", false);

//Obstucles
//Vert
const wall1 = new Square("#000000", 60, 300, 300, 0, 1, "Sprites/Nothing.png", false);
const wall2 = new Square("#000000", 20, 500, 500, 300, 1, "Sprites/Nothing.png", false);
//Hoz
const wall3 = new Square("#000000", 200, 20, 50, 400, 1, "Sprites/Nothing.png", false);
const wall4 = new Square("#000000", 30, 20, 340, 400, 1, "Sprites/Nothing.png", false);
const wall5 = new Square("#000000", 30, 20, 340, 420, 1, "Sprites/Nothing.png", false);

//Moving Obstucles
const wall6 = new Square("#000000", 125, 40, 650, 350, 1, "Sprites/Nothing.png", false);

//Aniamtions
const playerAnimation = new Animation("Player", [("Sprites/PlayerAnimation1.png"), ("Sprites/PlayerAnimation2.png"), ("Sprites/PlayerAnimation3.png")], 1);
const flame = new Animation("Flame", [("Sprites/Flame1.png"), ("Sprites/Flame2.png")], 0.5);
const doorAnimation = new Animation("Door", [("Sprites/Pit1.png"), ("Sprites/Pit2.png"), ("Sprites/Pit3.png"), ("Sprites/Pit4.png"), ("Sprites/Pit5.png"), ("Sprites/Pit6.png"), ("Sprites/Pit7.png"), ("Sprites/Pit8.png"), ("Sprites/Pit9.png"), ("Sprites/Pit10.png")], 1);
doorAnimation.pauseOnLast = true;
const batteryFilling = new Animation("batteryFilling", [("Sprites/Battery1.png"), ("Sprites/Battery2.png"), ("Sprites/Battery3.png"), ("Sprites/Battery4.png"), ("Sprites/Battery5.png"), ("Sprites/Battery6.png"), ("Sprites/Battery7.png"), ("Sprites/Battery8.png")], 0.4);
batteryFilling.pauseOnLast = true;
const batteryFilled = new Animation("batteryFilling", [("Sprites/BF1.png"), ("Sprites/BF2.png"), ("Sprites/BF3.png"), ("Sprites/BF4.png"), ("Sprites/BF5.png"), ("Sprites/BF6.png"), ("Sprites/BF7.png"), ("Sprites/BF8.png"), ("Sprites/BF9.png"), ("Sprites/BF10.png"), ("Sprites/BF11.png")], 0.3);

//Addiotnal Sprites
const rope = new Square("Rope", 0, 0, 14, 0, 1, "Sprites/Rope.png", true);
const cover = new Square("Cover", 0, 0, 14, -780, 1, "Sprites/25x800Grey.png", true); //-780 is just cutting the top, 800 is fully off screen
const bomb = new Square("Bomb", 0, 0, 0 , 490, 1, "Sprites/Bomb.png", true);
const magnets = new Square("magnets", 0, 0, 0, 0, 2, "Sprites/MagnetsOFF.png", true);

//Speed for Squares
const speed = 300;

//Sounds
const clickSound = new SoundClip("Sounds/Click.mp3");
const tickSound = new SoundClip("Sounds/Ticking.mp3");
const buzzSound = new SoundClip("Sounds/Buzz.mp3");
const backGroundMusic = new SoundClip("Sounds/BackGroundTrack.mp3");

//List of Squares
let squares = [];
squares.push(button1);
squares.push(wallTop);
squares.push(wallLeft);
squares.push(wallBottom);
squares.push(wallRight);
squares.push(wall1);
squares.push(wall2);
squares.push(wall3);
squares.push(wall4);
squares.push(wall5);
squares.push(wall6);
squares.push(rope);
squares.push(cover);
squares.push(bomb);
squares.push(doorCollider);

//Player Last
squares.push(square1);
squares.push(square2);
squares.push(player);

//Sqaures that can trigger the battery
let blocks = [];
blocks.push(square1);
blocks.push(square2);

//Delta Time
const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastTimestamp = 0;

//Inputs
let keySpace = false;
let keyLeft = false;
let keyRight = false;
let keyUp = false;
let keyDown = false;

//For Pulling
let offsetX;
let offsetY;

//Score
let score = 0;
let scoreStart = -780;

//console.log(scoreStart);

//Aniamtion
let doorOpening = false;
let exitX = 190;
let exitY = 50

//Moving blocks
movementTimer = 0;
movementTimerMax = 1;
moveLeft = true;

//Moving Text
textTimer = 0;
textTimerMax = 6;
moveTextLeft = false;
textAnchor = 100;

//Control Value
let control = 1;
let won = false;

//Lauches Loop once
GameLoop();

function GameLoop() {

    updateDeltaTime();
    Input();
    if (control === 2)
        GameLogic();

    DrawGame();
    requestAnimationFrame(GameLoop);

}

//Updates deltaTime
function updateDeltaTime() {
    let date = new Date();
    deltaTime = (date.getTime() - lastTimestamp) / 1000;
    lastTimestamp = date.getTime();

    //To deal with the large spike at the first frame
    if (deltaTime > 1)
        deltaTime = 1;
}

//For Drawing
function DrawGame() {
    //Clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Title Screen
    if (control == 1)
        context.drawImage(splashScreen, 0, 0);

    //The main scene
    if (control == 2) {
        context.drawImage(backGround, 40, 0);

        //ALl the squares, either sprites drawn or filled in by colour
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].draw == true)
                squares[i].Draw();
            else
                squares[i].Fill();
        }

        //Animation
        playerAnimation.Draw(player.x, player.y);

        //Battery Animations
        if (!(doorOpening))
            batteryFilling.DrawSprite(button1.x, button1.y)
        else if (!(batteryFilling.pausedOnLast) && (doorOpening))
            batteryFilling.Draw(button1.x, button1.y);
         else
            batteryFilled.Draw(button1.x, button1.y);



            //Draw the flame on the correct bit of the cover.
        flame.Draw(cover.x - 15, cover.y + 780);

        //Draw only the closed door, unless opening, then draw the aniamtion.
        if (!doorOpening)
            doorAnimation.DrawSprite(exitX, exitY);
        else{
            context.drawImage(outside, exitX, exitY);
            doorAnimation.Draw(exitX, exitY);
        }

        //The visuals of the magnets on the player
        magnets.Draw(player.x, player.y);

        //Insturctions on how to restart, moving to be easily visable.
        context.fillStyle = "#33FFFF";
        context.font = "16px Ariel";
        context.fillText("Press R to restart", textAnchor, 530);

    }

    //Game over, score and background
    if (control == 3) {
        context.drawImage(gameOver, 0, 0);
        context.fillStyle = "#33FFFF";
        context.font = "16px Ariel";
        context.fillText(score.toFixed(0), 190, 395);

        if (won) {
            context.fillStyle = "#33FFFF";
            context.font = "32px Ariel";
            context.fillText("You Win!", 340, 105);
            }
        else {
            context.fillStyle = "#33FFFF";
            context.font = "32px Ariel";
            context.fillText("You Lose!", 330, 105);
            buzzSound.Stop();
            }


        }
}


//Resets all the objects to the starting positions
function Reset(){

    //Player pos
    player.x = 50;
    player.y = 50;

    //Cover pos at start
    cover.y = scoreStart;

    //First Square pos
    square1.x = 60;
    square1.y = 430;

    //Second Square pos
    square2.x = 690;
    square2.y = 430;

    //battery and door, resetting sprites
    batteryFilling.counter = 0;
    batteryFilled.counter = 0;
    batteryFilled.pausedOnLast = false;
    doorAnimation.pausedOnLast = false;
    doorAnimation.counter = 0;

    //Wall
    wall6.x = 650;
    wall6.y = 350;
    moveLeft = true;
    movementTimer = 0;
}

//Decreasing the game timer
function DecreaseFlame(amount) {

    //Moves the cover for the rope down, therefore, also moves the flame
    cover.y += amount * deltaTime;
    //tickSound.Play()

    //If the flame/cover touches the bottom, end game.
    if (cover.y > (-320))
    {
        clickSound.Play();
        control = 3;
    }
}

//Game Logic
function GameLogic() {

    //BackGroundTrack
    backGroundMusic.Play();

    //Handling magentic and attraction
    if (keySpace)
        player.magnetic = true;
    else {
        player.magnetic = false;
        square1.attracted = false;
        square2.attracted = false;
    }

    //Moves the wall above the second square back and fourth.
    movementTimer += deltaTime;
    if (movementTimer >= movementTimerMax) {
        //console.log(moveLeft);
        moveLeft = !moveLeft;
        movementTimer = 0;
    }

    if (moveLeft)
        wall6.x -= (speed - 150) * deltaTime;
    else
        wall6.x += (speed - 150) * deltaTime;

    //Movement for the text element explainub the restart
    textTimer += deltaTime;
    if (textTimer >= textTimerMax) {
        //console.log(moveLeft);
        moveTextLeft = !moveTextLeft;
        textTimer = 0;
    }

    if (moveTextLeft)
        textAnchor -= (speed - 250) * deltaTime;
    else
        textAnchor += (speed - 250) * deltaTime;

    //Button 1
    //Means the aniamtions stop when not colliding
    doorOpening = false;

    //Checks if the power brick are colliding with the button.
    for (let i = 0; i < blocks.length; i++) {
        if (Collison(blocks[i], button1))
            OpenDoor();
    }

    //Win Condition, player touching door & door open
    if (Collison(doorCollider, player) && doorOpening) {
        won = true;
        control = 3;
        clickSound.Play();
        score = (200 - cover.y);
        //console.log(score);
    }

    //Resets the players sprite if not moving
    player.sprite = playerIdle;

    //moves the player, and sets the apporiotate sprite for each direction
    //Also decreases the game timer/flame
    if (keyLeft) {
        player.x -= speed * deltaTime;
        player.sprite = playerLeft;
        DecreaseFlame(15);
    }
    if (keyRight) {
        player.x += speed * deltaTime;
        player.sprite = playerRight;
        DecreaseFlame(15);
    }
    if (keyUp) {
        player.y -= speed * deltaTime;
        player.sprite = playerUp;
        DecreaseFlame(15);
    }
    if (keyDown) {
        player.y += speed * deltaTime;
        player.sprite = playerDown;
        DecreaseFlame(15);
    }

    //Turns magents on and decreases the timer
    if (keySpace) {
        magnets.sprite = magnetsON;
        buzzSound.Play();
        DecreaseFlame(35);
    } else {
        magnets.sprite = magnetsOFF;
        buzzSound.Stop();
    }

    //Checks for colliosn between squares and then if neither are triggers, calls physics.
    for (let i = 0; i < squares.length; i++) {
        for (let i2 = (i + 1); i2 < squares.length; i2++) {
            if (Collison(squares[i], squares[i2]) && !(squares[i].type == 2 || squares[i2].type == 2))
                Physics(squares[i], squares[i2]);
        }
    }

    //Calls magntism
    if (square1.attracted)
        Magnitism(player, square1);
    if (square2.attracted)
        Magnitism(player, square2);
}

function OpenDoor() {
    //Sets the door to open
    doorOpening = true;
}

function Input() {

    //If in title, only space bar is important
    if (control == 1) {
        document.onkeydown = function(event) {
            switch (event.keyCode) {
                case 32:
                    control = 2;
            }
        }
    }
    // on key down turn on the bools, Arrow keys for movement, space for magnets and r for restart
    if (control === 2) {
        document.onkeydown = function(event) {
            switch (event.keyCode) {
                case 37:
                    keyLeft = true;
                    break;
                case 38:
                    keyUp = true;
                    break;
                case 39:
                    keyRight = true;
                    break;
                case 40:
                    keyDown = true;
                    break;
                case 32:
                    keySpace = true;
                    break;
                case 82:
                    Reset();
                    break;

            }
        }

        //on key up, turn off the bools
        document.onkeyup = function(event) {
            switch (event.keyCode) {
                case 37:
                    keyLeft = false;
                    break;
                case 38:
                    keyUp = false;
                    break;
                case 39:
                    keyRight = false;
                    break;
                case 40:
                    keyDown = false;
                    break;
                case 32:
                    keySpace = false;
                    break;
            }
        }
    }

    //Space reloads the page to try again when at the last screen
    if (control === 3) {
        document.onkeydown = function(event) {
            switch (event.keyCode) {
                case 32:
                    location.reload(true);
                    break;
            }
        }
    }
}

//Physics
function Physics(a, b) {
    //Manuely indentifing which is the player and which is the power brick
    if (a.magnetic)
        b.attracted = true;

    if (b.magnetic)
        a.attracted = true;

    //Calculate overlaps from each side
    const dSides = Array(4);
    //Top
    dSides[0] = Math.abs(b.y + b.height - a.y);
    //Right
    dSides[1] = Math.abs(a.x + a.width - b.x);
    //Bottom
    dSides[2] = Math.abs(a.y + a.height - b.y);
    //Left
    dSides[3] = Math.abs(b.x + b.width - a.x);

    //Smallest overlap determines the side we push
    let smallestSoFar = Number.MAX_VALUE;
    let index = -1;

    //Finding the smallest side so far by looping thorugh and comparing
    for (let i = 0; i < dSides.length; i++)
        if (dSides[i] < smallestSoFar) {
            smallestSoFar = dSides[i];
            index = i;
        }

    //Error Detection
    if (a.color == "player")
        console.log("PROBLEM!");

    //Simulated
    if (!(a.type == 1 || b.type == 1)) {
        //Push Top - Half in each direction for the 2 squares
        if (index === 0) {
            a.y += dSides[0] / 2;
            b.y -= dSides[0] / 2;
        }
        //Push Right - Half in each direction for the 2 squares
        if (index === 1) {
            a.x -= dSides[1] / 2;
            b.x += dSides[1] / 2;
        }
        //Push Bottom - Half in each direction for the 2 squares
        if (index === 2) {
            a.y -= dSides[2] / 2;
            b.y += dSides[2] / 2;
        }
        //Push Left - Half in each direction for the 2 squares
        if (index === 3) {
            a.x += dSides[3] / 2;
            b.x -= dSides[3] / 2;
        }
    }

    //Static Option 1
    if (a.type == 0 && b.type == 1) {
        //Push Top - A gets the full amaount as B is static
        if (index === 0)  {
            a.y += dSides[0];
        }
        //Push Right - A gets the full amaount as B is static
        if (index === 1) {
            a.x -= dSides[1];
        }
        //Push Bottom - A gets the full amaount as B is static
        if (index === 2) {
            a.y -= dSides[2];
        }
        //Push Left - A gets the full amaount as B is static
        if (index === 3) {
            a.x += dSides[3];
        }
    }

    //Static Option 2
    if (a.type == 1 && b.type == 0) {
        //Push Top - B gets the full amaount as A is static
        if (index === 0)  {
            b.y -= dSides[0];
        }
        //Push Right - B gets the full amaount as A is static
        if (index === 1) {
            b.x += dSides[1];
        }
        //Push Bottom - B gets the full amaount as A is static
        if (index === 2) {
            b.y += dSides[2];
        }
        //Push Left - B gets the full amaount as A is static
        if (index === 3) {
            b.x -= dSides[3];
        }
    }
}

//Magnistim
function Magnitism(r1, r2) {
    //How strongly the squares stick together.
    const stickiness = 16;

    const absSides = Array(4);
    const dSides = Array(4);

    //Top
    absSides[0] = (r2.y + r2.height - r1.y);
    //Right
    absSides[1] = (r1.x + r1.width - r2.x);
    //Bottom
    absSides[2] = (r1.y + r1.height - r2.y);
    //Left
    absSides[3] = (r2.x + r2.width - r1.x);

    for (let i = 0; i < dSides.length; i++)
        dSides[i] = Math.abs(absSides[i]);

    //Smallest overlap determines the side we pull
    let smallestSoFar = Number.MAX_VALUE;
    let index = -1;

    for (let i = 0; i < dSides.length; i++)
        if (dSides[i] < smallestSoFar) {
            smallestSoFar = dSides[i];
            index = i;
        }

    //Detaches if too far, based on stickiness
    for (let i = 0; i < absSides.length; i++)
        if (absSides[i] < -stickiness)
            r2.attracted = false;

    //Pull Top
    if (index === 0)
        r2.y += dSides[0] / 2;
    //Pull Right
    if (index === 1)
        r2.x -= dSides[1] / 2;
    //Pull Bottom
    if (index === 2)
        r2.y -= dSides[2] / 2;
    //Pull Left
    if (index === 3)
        r2.x += dSides[3] / 2;
}


//Axis - Alligned Bounding Box
function Collison(a, b) {
    if (a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y)
        return true;
}

//Basic Distance Calculation
function Distance(a, b) {
    //Middle of A
    let aMiddleX = a.x + (a.width / 2);
    let aMiddleY = a.y + (a.height / 2);

    //Middle of B
    let bMiddleX = b.x + (b.width / 2);
    let bMiddleY = b.y + (b.height / 2);

    let x = aMiddleX - bMiddleX;
    let y = aMiddleY - bMiddleY;

    let distance = Math.sqrt( x*x + y*y );
    return distance;
}
