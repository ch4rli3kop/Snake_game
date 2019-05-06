function submitScore(){
    if(!score){
        return false;
    }
    var username = prompt("What is your name?");
    document.getElementById('username').value = username;
    document.getElementById('score').value = score;
}