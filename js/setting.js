var display = document.getElementById('display');
var context = display.getContext('2d');
var width = 420;
var height = 420;
var pixelSize = 10;
var snakeBody = [{x:10, y:10}, {x:10, y:11}, {x:10, y:12}, {x:10, y:13}];
var snakeLength = 4;
var directionX = 0;
var directionY = 1;
var mandu;