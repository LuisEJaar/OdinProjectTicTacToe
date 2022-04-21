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
        console.log(isfull)
        if ((board.boardArray[1] == board.boardArray[2] && board.boardArray[2] == board.boardArray[3])|| 
        (board.boardArray[4] == board.boardArray[5] && board.boardArray[5] == board.boardArray[6]) || 
        (board.boardArray[7] == board.boardArray[8] && board.boardArray[8] == board.boardArray[9]) ||
        (board.boardArray[1] == board.boardArray[5] && board.boardArray[5] == board.boardArray[9]) ||
        (board.boardArray[3] == board.boardArray[5] && board.boardArray[5] == board.boardArray[7])) {
            alert("huzzah")
            board.winScreen = true
        } else if (isfull == 9) {
            alert("MEOW! That's a cat!")
        }
    }
}

const newGameButton = {
    button: () => {
        document.querySelector("button").addEventListener("click", resetSquares)

        function resetSquares () {
            console.log("clicked")
            const boardOld = document.querySelector(".board")
            while (boardOld.firstChild) {
                boardOld.removeChild(boardOld.firstChild)
            }
            board.newGame()
            board.runningGame()
        }
    }

    
}

// document.querySelector("button").addEventListener("click", resetSquares)

// function resetSquares () {
//     const boardOld = document.querySelector(".board")
//     while (boardOld.firstChild) {
//         boardOld.removeChild(boardOld.firstChild)
//     }
//     board.newGame()
//     board.runningGame()
// }
newGameButton.button()
board.newGame()
board.runningGame()

//user experience
//Launch Game
//Player 1 is prompted to play a human or vs ai
//Player 1 is prompted on their choice of x or o
//Game begins and whichever player chose x goes first. This is signalled by a prompt on the bottom of the board. 
//Players take turns until either a winner is decided or the board is filled
//Game statistics window appears
//players choose to play again or play vs ai