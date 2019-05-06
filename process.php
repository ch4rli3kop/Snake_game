<?php
require('./config.php');
$conn = mysqli_connect($config['host'],$config['user'],$config['pw']);
mysqli_select_db($conn, $config['database']);

$username = mysqli_real_escape_string($conn, $_POST['username']);
$score = mysqli_real_escape_string($conn, $_POST['score']);

$sql = "INSERT INTO rank (username, date, score) VALUES ('".$username."', NOW(), '".$score."')";
mysqli_query($conn, $sql);
if((int)$score > 1764){
    echo "flag is ".$config['flag'];
} else {
    header('Location: http://localhost/Snake_game/snake.php');
}
?>