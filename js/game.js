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

function game(){
    
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    var xSize = (width/pixelSize);
    var ySize = (length/pixelSize);
    createSnake();
    createMandu();
    showScore();

    // calculate snake's head location
    snakeHeadX = (snakeBody[snakeLength - 1].x + directionX)%xSize;
    snakeHeadY = (snakeBody[snakeLength - 1].y + directionY)%ySize;
    if(snakeHeadX<0)
        snakeHeadX+=xSize;
    else if(snakeHeadY<0)
        snakeHeadY+=ySize;
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

function startGame(){
    console.log("Start Game!");
    btn.setAttribute('disabled', true);
    setInterval(game, 1000/15);
}

function init(){
    var btn = document.getElementById('startBtn');
    document.addEventListener('keydown', keyPush);
    btn.addEventListener('click', startGame);
}

init();