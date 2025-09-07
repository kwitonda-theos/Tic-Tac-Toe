// getting all the required elements
const cells = document.querySelectorAll(".cell");
const positions = document.querySelectorAll(".position");
const play = document.querySelector(".play")
const restart = document.querySelector('.restart')
const reset = document.querySelector('.reset')
let playerWin = Number(document.querySelector(".playerhaswon").textContent)

// player's move
for(let position of positions){
    position.addEventListener("click", () =>{
        for(let cell of cells){
            if(cell.textContent === position.textContent){
                cell.textContent = "X";
                cell.classList.add("played");
                position.classList.add("disabled");
            }
        }
        if(playerWon()){
            
            playerWin = playerWin + 1
            document.querySelector(".playerhaswon").textContent = playerWin
            
        }
    })
    
}

// computer move
function computerMove(){
    let availableCells = []
    for(let cell of cells){
        if(!(cell.textContent === "X" )){
            availableCells.push(cell);
        }
    }
    let random = Math.floor(Math.random() * availableCells.length) 
    let playedCell = availableCells[random]
    for(let pos of positions){
        if(pos.textContent === playedCell.textContent){
            pos.classList.add("disabled")
        }
    }
    playedCell.textContent = "O"
    playedCell.classList.add('played')
    
}
play.addEventListener("click", computerMove)

// restart game
restart.addEventListener("click", () =>{
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "X" || cells[i].textContent === "O") {
            cells[i].textContent = i + 1
            cells[i].classList.remove("played")
        }
        if (positions[i].classList.contains("disabled")) {
            positions[i].classList.remove("disabled")
        }
    }
    
})
// reset game
reset.addEventListener("click", () =>{
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === "X" || cells[i].textContent === "O") {
            cells[i].textContent = i + 1
            cells[i].classList.remove("played")
        }
        if (positions[i].classList.contains("disabled")) {
            positions[i].classList.remove("disabled")
        }
        document.querySelector(".playerhaswon").textContent = 0
        document.querySelector(".win").textContent = 0
        playerWin = 0
    }
})

// player won
function playerWon() {
    // winning combos
    const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    let cellsOccupied = []
    // check
    cells.forEach((cell,idx) => {
        idx = Number(idx)
        if(cell.textContent === "X"){
            cellsOccupied.push(idx)
        }
    })
    // check if player won
    for(let combo of winningCombos){
        if (combo.every(idx => cellsOccupied.includes(idx))) {
            return true
        }
    }
    return false
    
}
