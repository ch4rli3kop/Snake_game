<?php
require('./config.php');
$conn = mysqli_connect($config['host'],$config['user'],$config['pw']);
mysqli_select_db($conn, $config['database']);
$result = mysqli_query($conn, "SELECT * FROM rank ORDER BY score DESC LIMIT 15");
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Snake Game</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="page">
    <div class="game">
        <p class="gameTitle">The Snake Game!</p>
        <div class="gamepage">
            <canvas id="display" width="420" height="420">This browser doesn't support canvas, so connect the other one.</canvas>
        </div>
        <form name="Form" method="POST" action="process.php">
            <button class='buttons' id='startBtn' type='button'>START</button>
            <button class='buttons' id='restartBtn' type='button'>RESTART</button>
            <button class='buttons' id='submitBtn' type="submit" onclick="submitScore()">SUBMIT</button>
            <input type="hidden" id="username" name="username">
            <input type="hidden" id="score" name="score">
        </form>
    </div>
    <div class="rank">
        <p class="rankName">Ranking</p>
        <table>
            <thead>
                <tr>
                    <th>rank</th><th>username</th><th>date</th><th>score</th>
                </tr>
            </thead>
            <tbody>
            <?php
            $i = 1;
            while($row = mysqli_fetch_assoc($result)){
                echo "<tr><td>".$i."</td><td>".htmlspecialchars($row['username']).'</td><td>'.$row['date'].'</td><td>'.$row['score']."</td></tr>";
                $i++;
            }
            ?>
            </tbody>
        </table>
    </div>
    </div>
    <audio id="audio" src="https://www.soundjay.com/human/sounds/baby-cooing-09.mp3"></audio>
    <script src="js/setting.js"></script>
    <script src="js/game.js"></script>
    <script src="js/submitScore.js"></script>
</body>
</html>
<!-- When you score over 1764, you can get the flag! -->