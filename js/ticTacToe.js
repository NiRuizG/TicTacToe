/* End Game condition */
function endGame(letter) //display winner of full game and clears tab
{
    if (String(Number(winningBoxes[3].innerHTML)) > String(Number(winningBoxes[5].innerHTML)))
        alert(`Winner: player X ${winningBoxes[3].innerHTML} / ${winningBoxes[5].innerHTML}!`);
    else if (String(Number(winningBoxes[3].innerHTML)) < String(Number(winningBoxes[5].innerHTML)))
        alert(`Winner: player O ${winningBoxes[5].innerHTML} / ${winningBoxes[3].innerHTML}!`);
    else {
        alert(`Draw: ${winningBoxes[3].innerHTML} / ${winningBoxes[5].innerHTML}!`);
    }
    clearTab();
    bol = 1;    
}

/* countdown */
var min = 3;
var sec = 0;
var timeDigits = document.body.getElementsByTagName("span");
var idTimeout;
function countDown(min, sec, idInterval)
{
    charZero = '';
    if (sec < 0) {
        min = min - 1;
        sec = 59;
    }
    if (min >= 0) {
        timeDigits[0].innerHTML = '0' + min;
        if (sec < 10)
            charZero = '0';
        timeDigits[1].innerHTML = charZero + sec;
        sec = sec - 1;
        idTimeout = setTimeout(countDown, 1000, min, sec);
    }
    else {
        setTimeout(endGame, 1);
        clearInterval(idTimeout);
        updateScore("X", winningBoxes, 1);
        clearTab();
    }
}
countDown(min, sec);

/* switching player */
var elements = document.getElementById("p1").innerHTML;
var elements2 = document.getElementById("p2").innerHTML;
var playersTurn = 1;
var winningBoxes = document.getElementsByTagName("span");
function changePlayer () {    
    if (document.getElementById("p1").innerHTML === "*") {
        document.getElementById("p1").innerHTML = "";
        document.getElementById("p2").innerHTML = "*";
        playersTurn = 2;
    }
    else if (document.getElementById("p2").innerHTML === "*")  {
        document.getElementById("p2").innerHTML = "";
        document.getElementById("p1").innerHTML = "*";
        playersTurn = 1;
    }
    return document;
}

/* game part */

var tdElmts = document.getElementsByTagName("td");
function checkHorizontal(letter, caseX)
{
    if (caseX[0] === letter && caseX[1] === letter && caseX[2] === letter)
        return 1;
    if (caseX[3] === letter && caseX[4] === letter && caseX[5] === letter)
        return 1;
    if (caseX[6] === letter && caseX[7] === letter && caseX[8] === letter)
        return 1;
    return 0; 
}

    /* check all win possibilties */
function checkVertical(letter, caseX)
{
    let elmnt = [];
    if (caseX[0] === letter && caseX[3] === letter && caseX[6] === letter)
        return 1;
    if (caseX[1] === letter && caseX[4] === letter && caseX[7] === letter)
        return 1;
    if (caseX[2] === letter && caseX[5] === letter && caseX[8] === letter)
        return 1;
    return 0;
}

function checkDiagonal(letter, caseX)
{
    if (caseX[0] === letter && caseX[4] === letter && caseX[8] === letter)
        return 1;
    if (caseX[2] === letter && caseX[4] === letter && caseX[6] === letter)
        return 1;
    return 0;
}

function checkDraw(caseX)
{
    let i = 0;
    let count = 0;
    while (caseX[i]) {
        if (caseX[i] !== "X" || caseX[i] !== "O")
            count = count + 1;
        i = i + 1;
    }
    if (count === 9)
        return 1;
    return 0;
}

function checkWin(letter)
{
    let i = 0;
    let n = 1;
    var caseX = [];
    while (i < 9) {        
        caseX[i] = document.getElementById(n).innerHTML;
        i = i + 1;
        n = n + 1;
    }
    if (checkHorizontal(letter, caseX) || checkVertical(letter, caseX) || checkDiagonal(letter, caseX)) // if somebody won
        return 1;
    if (checkDraw(caseX) === 1) // if Draw
        return 2;
    return 0;
}


function clearTab() /* empty tab */
{
    let i = 1;
    while (i <= 9) {
        document.getElementById(i).innerHTML = "";
        i = i + 1;
    }
}

function updateScore(letter, winningBoxes, bol) /* update score*/
{
    if (bol != 1) {
        if (letter === 'X')
            winningBoxes[3].innerHTML = String(Number(winningBoxes[3].innerHTML) + 1);
        if (letter === 'O')
            winningBoxes[5].innerHTML = String(Number(winningBoxes[5].innerHTML) + 1);        
    }
}

function rules(letter) {    
    if (checkWin(letter) === 1) {
        bol = 1;
        winningBoxes[6].innerHTML = "Player ";
        winningBoxes[7].innerHTML = letter + " wins !!!";     
        setTimeout(function() {
            winningBoxes[6].innerHTML = "";
            winningBoxes[7].innerHTML = "";
            updateScore(letter, winningBoxes, 0);
            clearTab();
            bol = 0;
        }, 1000);
    }
    else if (checkWin(letter) === 2) {
        bol = 1;
        winningBoxes[6].innerHTML = "It's a draw";
        setTimeout(function() {
            winningBoxes[6].innerHTML = "";
            clearTab();
            bol = 0;
        }, 1000);
    }
}

var bol = 0;  //used to stop writing on cells while displaying winner
function addXO(object) // add X or O on cell
{
    var letter;
    if (object.innerHTML === "" && bol === 0) {
        if (playersTurn === 1 && object.innerHTML === "")
            letter = 'X';
        else if (playersTurn === 2 && object.innerHTML === "")
            letter = 'O';    
        object.innerHTML = letter; 
        object.className = letter;
        rules(letter, bol);
        changePlayer();
    }
}
