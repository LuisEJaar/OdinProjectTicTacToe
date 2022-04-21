//How many objects should we have?
//One for the game board?
//A factory / constructor for the players
//who goes first? 
//  x goes first
//Let player1 choose x or o
//how to count turns? If player chooses x or o then we could do it based on the empty board squares

//player object:
//track wins
//make an action of clicking a tile

//board / game object:
//create board, just an array of divs?
//erase all and recreate / clear
//if board is full then announce tie
//player attempts to play, if array item is empty then allow it if not then disregard
//after player submits answer then check the array
//if board has the same in 123, 456, 789, 147, 258, 369, 159, or 357 then announce winner (just use the player who entered last)

function PlayerMaker (number) {
    this.name = `Player${number}`
    this.wins = 0,
    this.draws = 0,
    this.number = number,
    this.nameSetter = function () {
        let newName = document.querySelector(`#p${this.number}Name`).value
        document.querySelector(`.player${this.number}Name`).innerText = newName
        this.name = newName
    }
}

let player1 = new PlayerMaker(1)
let player2 = new PlayerMaker(2)

document.querySelector("#player1").addEventListener("click",p1Nameset)
document.querySelector(`#player2`).addEventListener("click",p2Nameset) 

function p1Nameset () {
    player1.nameSetter()
}

function p2Nameset () {
    player2.nameSetter()
}

const board = {
    boardArray: [1,2,3,4,5,6,7,8,9],
    currentTurn: 1,
    winScreen: false,
    newGame: () => {   
        for (i = 1; i <= 9; i++){
            const gameBoard = document.querySelector(".board")
            const newSquare = document.createElement("div")
            newSquare.classList.add("tile")
            newSquare.setAttribute("id",`array${i}`)
            gameBoard.appendChild(newSquare)
        }
        board.currentTurn = 1
        board.boardArray = [1,2,3,4,5,6,7,8,9]
        board.winScreen = false
    },

    runningGame: () => {
        const tiles = document.querySelectorAll(".tile")
        for (let tile of tiles) {
            tile.addEventListener('click', playerSelection)
        }

        function playerSelection (e) {
            if (e.target.innerHTML === "" && board.winScreen === false) {   
                if (board.currentTurn % 2 != 0) {
                    e.target.innerHTML = "X"
                } else {
                    e.target.innerHTML = "O"
                }
                board.winCalculator(e)
                board.currentTurn++
            }
        }
    },

    winCalculator: (e) => {
        let clickedBox = e.target.id.substring(5)
        board.boardArray[clickedBox] = e.target.innerHTML
        let isfull = 0
        for (index of board.boardArray) {
            if (typeof index != "number") {
                isfull += 1
            }
        }
        
        if ((board.boardArray[1] == board.boardArray[2] && board.boardArray[2] == board.boardArray[3])|| 
        (board.boardArray[4] == board.boardArray[5] && board.boardArray[5] == board.boardArray[6]) || 
        (board.boardArray[7] == board.boardArray[8] && board.boardArray[8] == board.boardArray[9]) ||
        (board.boardArray[1] == board.boardArray[5] && board.boardArray[5] == board.boardArray[9]) ||
        (board.boardArray[3] == board.boardArray[5] && board.boardArray[5] == board.boardArray[7])) {
            if (board.currentTurn % 2 === 0) {
                alert(`${player2.name} Wins`)
                player2.wins++
                console.log(player2.wins)
            } else {
                alert(`${player1.name} Wins`)
                player1.wins++
                console.log(player1.wins)
            }
            alert("huzzah")
            board.winScreen = true
        } else if (isfull == 9) {
            alert("MEOW! That's a cat!")
        }
    }
}

const newGameButton = {
    button: () => {
        document.querySelector("#newGame").addEventListener("click", resetSquares)
        console.log("clicked")
        function resetSquares () {
            const boardOld = document.querySelector(".board")
            while (boardOld.firstChild) {
                boardOld.removeChild(boardOld.firstChild)
            }
            board.newGame()
            board.runningGame()
        }
    }

    
}


newGameButton.button()
board.newGame()
board.runningGame()