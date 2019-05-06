<?php
require('./config.php');
$conn = mysqli_connect($config['host'],$config['user'],$config['pw']);
mysqli_select_db($conn, $config['database']);

$username = $_POST['username'];
$score = $_POST['score'];
$sql = "INSERT INTO rank (username, date, score) VALUES ('".$username."', NOW(), '".$score."')";
mysqli_query($conn, $sql);
header('Location: http://localhost/Snake_game/snake.php');
?>