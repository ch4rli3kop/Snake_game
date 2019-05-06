
function createSnake(){
    context.fillStyle = "#7bed9f";
    context.strokeStyle = "#2ed573";
    for (var i = 0; i < snakeLength; i++){
        context.fillRect(snakeBody[i].x*pixelSize, snakeBody[i].y*pixelSize, pixelSize, pixelSize);
        context.strokeRect(snakeBody[i].x*pixelSize, snakeBody[i].y*pixelSize, pixelSize, pixelSize);
    }
}

function createMandu(){
    context.fillStyle = "#ffffff";
    context.fillRect(mandu.x*pixelSize, mandu.y*pixelSize, pixelSize, pixelSize);
}

function showScore(){
    context.fillStyle = "#ced6e0";
    context.font = 'italic 20px Calibri';
    context.fillText(`Score : ${score}`, 320, 25);
}

function showResult(){
    context.fillStyle = "#c7ecee";
    context.fillRect(width/5, height/3, width*3/5, height/3);
    context.fillStyle = "#130f40";
    context.font = 'oblique 40px Calibri';
    context.fillText('Result', 160, 200);
    context.font = 'oblique 30px Calibri';
    context.fillText(`Score : ${score}`, 110, 250);
}

function endGame(){
    clearInterval(gameLoop);
    showResult();
    console.log('game end!');
    submitBtn.removeAttribute('disabled');
}

function game(){
    
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    var xSize = (width/pixelSize);
    var ySize = (height/pixelSize);
    createSnake();
    createMandu();
    showScore();

    // calculate snake's head location
    snakeHeadX = snakeBody[snakeLength - 1].x + directionX;
    snakeHeadY = snakeBody[snakeLength - 1].y + directionY;

    if(snakeHeadX == -1 || snakeHeadX == xSize|| snakeHeadY == -1 || snakeHeadY == ySize){
        endGame();
    }

    snakeBody.push({x:snakeHeadX, y:snakeHeadY});
    
    // when snake eat mandu
    if (snakeHeadX === mandu.x && snakeHeadY === mandu.y){
        mandu = {x: Math.floor(Math.random() * (xSize - 1) + 1), y: Math.floor(Math.random() * (ySize - 1) + 1)};
        snakeLength += 1;
        score += 1;
    } else{
        snakeBody.shift();
    }

    // when snake eat itself
    for(var i=0; i<snakeLength-1; i++){
        if(snakeHeadX === snakeBody[i].x && snakeHeadY === snakeBody[i].y){
            sound.play();
            for(var j=0; j<i; j++){
                snakeBody.shift();
                snakeLength-=1;
            }
        }
    }
}

function keyPush(evt) {
    switch(evt.keyCode){
        case 37:
            if (!(directionX === 1 && directionY === 0)){
                directionX = -1; directionY = 0;
                console.log("left");
            }
            break;
        
        case 38:
            if (!(directionX === 0 && directionY === 1)){
                directionX = 0; directionY = -1;
                console.log("up");
            }
            break;

        case 39:
            if (!(directionX === -1 && directionY ===0)){
                directionX = 1; directionY = 0;
                console.log("right");
            }
            break;
        
        case 40:
            if (!(directionX === 0 && directionY === -1)){
                directionX = 0; directionY = 1;
                console.log("down");
            }
            break;  
    }
}

function gameinit(){
    snakeBody = [{x:10, y:10}, {x:10, y:11}, {x:10, y:12}, {x:10, y:13}];
    snakeLength = 4;
    directionX = 0;
    directionY = 1;
    mandu = {x:30, y:15};
    score = 0;
}

function startGame(){
    console.log("Start Game!");
    gameinit();
    startBtn.setAttribute('disabled', true);
    submitBtn.setAttribute('disabled', true);
    gameLoop = setInterval(game, 1000/15);
}

function init(){
    document.addEventListener('keydown', keyPush);

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
}

init();