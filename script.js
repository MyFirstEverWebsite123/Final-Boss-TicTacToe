const cells=document.querySelectorAll(".cell");
const turnText=document.getElementById("turn");
let xTurn=true;

function startGame(){
  cells.forEach(c=>{c.textContent=""; c.addEventListener("click",clickCell,{once:true});});
  xTurn=true; turnText.textContent="Player X's Turn";
}

function clickCell(e){
  e.target.textContent = xTurn?"X":"O";
  if(checkWin(xTurn?"X":"O")){turnText.textContent=`Player ${xTurn?"X":"O"} Wins!`; return;}
  if([...cells].every(c=>c.textContent)) {turnText.textContent="Draw!"; return;}
  xTurn=!xTurn;
  turnText.textContent=`Player ${xTurn?"X":"O"}'s Turn`;
}

function checkWin(p){
  const combos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  return combos.some(c=>c.every(i=>cells[i].textContent===p));
}

document.getElementById("restart").addEventListener("click",startGame);
startGame();

let gameActive = true;


function playerClickWithComputer(e){
  if(!gameActive) return;

  e.target.textContent = "x"

  if(checkWin("X")) { turnText.textContent = "Player X Wins!";
    gameActive=false; return; }
    if([...cells].every(c=>c.textContent))
{ turnText.textContent = "Draw!"; gameActive=false;
  return;}
 

turnText.textContent = "Computer's Turn";
setTimeout(computerMove, 300);
}

function computerMove(){
  if(!gameActive) return;
  const empty =
  [...cells].filter(c=>c.textContent==="");
  if(empty.length === 0) return;
  const move =
  empty[Math.floor(Math.random()*empty.length)];
  move.textContent = "O";


if(checkWin("O")) { turnText.textContent =
  "Computer Wins!"; gameActive=false; return; }
if([...cells].every(c=>c.textContent))
{ turnText.textContent = "Draw!"; gameActive=false;
  return; }

turnText.textContent = "Player X's Turn";
}


cells.forEach(c=> {
  c.removeEventListener("click", clickCell);
  c.addEventListener("click",
playerClickWithComputer, {once:true});
});


document.getElementById("restart").addEventListener("click", () => {
  gameActive = true;
  xTurn = true;
  cells.forEach(c => {
    c.textContent = "";
    c.removeEventListener("click", clickCell);
    c.addEventListener("click", playerClickWithComputer, {once:true});
  });
  turnText.textContent = "Player X's Turn";
});


cells.forEach(c => {
  c.removeEventListener("click", clickCell);
  c.addEventListener("click", playerClickWithComputer, {once:true});
});


function playerClickWithComputer(e){
  if(!gameActive) return;

  e.target.textContent = "X";

  if(checkWin("X")) { turnText.textContent = "Player X Wins!"; gameActive=false; return; }
  if([...cells].every(c=>c.textContent)) { turnText.textContent = "Draw!"; gameActive=false; return; }

  turnText.textContent = "Computer's Turn";
  setTimeout(() => {
    const empty = [...cells].filter(c=>c.textContent==="");
    if(empty.length===0) return;
    const move = empty[Math.floor(Math.random()*empty.length)];
    move.textContent = "O";

    if(checkWin("O")) { turnText.textContent = "Computer Wins!"; gameActive=false; return; }
    if([...cells].every(c=>c.textContent)) { turnText.textContent = "Draw!"; gameActive=false; return; }

    turnText.textContent = "Player X's Turn";
  }, 300);
}


// --------- IMPOSSIBLE AI (UNBEATABLE) ----------

computerMove = function(){

  if(!gameActive) return;

  let bestScore = -Infinity;
  let move;

  cells.forEach((cell, index) => {
    if(cell.textContent === ""){
      cell.textContent = "O";
      let score = minimax(false);
      cell.textContent = "";
      if(score > bestScore){
        bestScore = score;
        move = index;
      }
    }
  });

  if(move !== undefined){
    cells[move].textContent = "O";
  }

  if(checkWin("O")){
    turnText.textContent="Computer Wins!";
    gameActive=false;
    return;
  }

  if([...cells].every(c=>c.textContent!=="")){
    turnText.textContent="Draw!";
    gameActive=false;
    return;
  }

  turnText.textContent="Player X's Turn";
};



function minimax(isMaximizing){

  if(checkWin("O")) return 1;
  if(checkWin("X")) return -1;
  if([...cells].every(c=>c.textContent!=="")) return 0;

  if(isMaximizing){
    let bestScore = -Infinity;
    cells.forEach(cell=>{
      if(cell.textContent===""){
        cell.textContent="O";
        let score = minimax(false);
        cell.textContent="";
        bestScore = Math.max(score,bestScore);
      }
    });
    return bestScore;
  } else {
    let bestScore = Infinity;
    cells.forEach(cell=>{
      if(cell.textContent===""){
        cell.textContent="X";
        let score = minimax(true);
        cell.textContent="";
        bestScore = Math.min(score,bestScore);
      }
    });
    return bestScore;
  }
}



let playerScore = 0;
let computerScore = 0;

const scoreText = document.getElementById("score");


scoreText.style.fontSize = "40px";
scoreText.style.marginBottom = "20px";


const originalCheckWin = checkWin;


checkWin = function(p){

  const result = originalCheckWin(p);

  if(result){
    if(p === "X"){
      playerScore++;
    }
    if(p === "O"){
      computerScore++;
    }

    scoreText.textContent =
      "PLAYER: " + playerScore + " | COMPUTER: " + computerScore;
  }

  return result;
};




let human = "X";
let computer = "O";

// Watch game ending automatically
const originalCheckWinSwitch = checkWin;

checkWin = function(p){

  const result = originalCheckWinSwitch(p);

  if(result && gameActive){

    gameActive = false;

    setTimeout(() => {

      // Switch roles
      if(human === "X"){
        human = "O";
        computer = "X";
      } else {
        human = "X";
        computer = "O";
      }

      startGame();

      // If computer is X, it starts immediately
      if(computer === "X"){
        computerMovePerfect();
      }

    }, 800);
  }

  return result;
};



// -------- ULTRA HARD AI (INTEGRATED WITH EXISTING CODE) --------

function computerMovePerfect(){
  if(!xTurn || !gameActive) return; // Only move when it's O's turn (computer)

  let bestScore = -Infinity;
  let moveIndex = -1;

  cells.forEach((cell, index) => {
    if(cell.textContent === ""){
      cell.textContent = "O"; // computer always plays O
      let score = minimax(false);
      cell.textContent = "";
      if(score > bestScore){
        bestScore = score;
        moveIndex = index;
      }
    }
  });

  if(moveIndex !== -1){
    cells[moveIndex].textContent = "O";
  }

  if(checkWin("O")){
    turnText.textContent = "Player O Wins!";
    gameActive = false;
    return;
  }

  if([...cells].every(c=>c.textContent)){
    turnText.textContent = "Draw!";
    gameActive = false;
    return;
  }

  xTurn = true;
  turnText.textContent = "Player X's Turn";
}

// Minimax algorithm
function minimax(isMaximizing){
  if(checkWin("O")) return 1;
  if(checkWin("X")) return -1;
  if([...cells].every(c=>c.textContent)) return 0;

  if(isMaximizing){
    let bestScore = -Infinity;
    cells.forEach(cell => {
      if(cell.textContent === ""){
        cell.textContent = "O";
        let score = minimax(false);
        cell.textContent = "";
        bestScore = Math.max(score, bestScore);
      }
    });
    return bestScore;
  } else {
    let bestScore = Infinity;
    cells.forEach(cell => {
      if(cell.textContent === ""){
        cell.textContent = "X";
        let score = minimax(true);
        cell.textContent = "";
        bestScore = Math.min(score, bestScore);
      }
    });
    return bestScore;
  }
}

// Override click to include AI after X plays
cells.forEach(cell => {
  cell.addEventListener("click", function handleClick(e){
    if(!gameActive || e.target.textContent) return;

    e.target.textContent = "X";
    if(checkWin("X")){
      turnText.textContent = "Player X Wins!";
      gameActive = false;
      return;
    }
    if([...cells].every(c=>c.textContent)){
      turnText.textContent = "Draw!";
      gameActive = false;
      return;
    }

    xTurn = false;
    turnText.textContent = "Player O's Turn";
    setTimeout(computerMovePerfect, 100); // instant AI move
  }, {once:true});
});