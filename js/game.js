
function createSnake(){
    context.fillStyle = "#7bed9f";
    context.strokeStyle = "#2ed573";
    for (var i = 0; i < snakeLength; i++){
        context.fillRect(snakeBody[i].x*pixelSize, snakeBody[i].y*pixelSize, pixelSize, pixelSize);
        context.strokeRect(snakeBody[i].x*pixelSize, snakeBody[i].y*pixelSize, pixelSize, pixelSize);
    }
}

function createMandu(x, y){
    context.fillStyle = "#ffffff";
    context.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
}

function game(){
    
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    snakeHeadX = (snakeBody[snakeLength - 1].x + directionX)%42;
    snakeHeadY = (snakeBody[snakeLength - 1].y + directionY)%42;
    if(snakeHeadX<0)
        snakeHeadX+=42;
    else if(snakeHeadY<0)
        snakeHeadY+=42;
    snakeBody.push({x:snakeHeadX, y:snakeHeadY});
    snakeBody.shift();
    console.log(snakeBody);
    createSnake();
//    createMandu();

}

function keyPush(evt) {
    switch(evt.keyCode){
        case 37:
            directionX = -1; directionY = 0;
            console.log("left");
            break;
        
        case 38:
            directionX = 0; directionY = -1;
            console.log("up");
            break;

        case 39:
            directionX = 1; directionY = 0;
            console.log("right");
            break;
        
        case 40:
            directionX = 0; directionY = 1;
            console.log("down");
            break;  
    }
}

function startGame(){
    console.log("Start Game!");
    btn.setAttribute('disabled', true);
    setInterval(game, 3000/15);
}

function init(){
    var btn = document.getElementById('startBtn');
    document.addEventListener('keydown', keyPush);
    btn.addEventListener('click', startGame);
}


init();