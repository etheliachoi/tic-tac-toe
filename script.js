function Gameboard() {
    const row = 3;
    const col = 3;
    const board = [];

    // want board = [[Cell(), Cell(), Cell()], [a, b, c], [a, b, c]]
    for (let i = 0; i < col; i++) {
        board[i] = [];
        for (let j = 0; j < row; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    // need to think of what this function does
    const printBoard = () => {
        // const numbers = [1, 4, 9];
        // const roots = numbers.map((num) => Math.sqrt(num));
        // roots is now     [1, 2, 3]
        // numbers is still [1, 4, 9]

        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    // Why is this in the gameboard? Bc we need to check if (x, y) is occupied
    const placeToken = (x, y, player) => {
        // Cell is occupied
        let targetCell = board[x][y];
        if (targetCell.getValue() === 0) targetCell.addToken(player);
        else return
    }

    const endGame = (player) => {
        function checkRow(i) {
            return board[i][0].getValue() === player.token &&
                    board[i][1].getValue() === player.token &&
                    board[i][2].getValue() === player.token;
        }
        for (let i = 0; i < row; i++) {
            if (checkRow(i)) {
                return true;
            }
        }

        function checkCol(j) {
            return board[0][j].getValue() === player.token && 
                    board[1][j].getValue() === player.token && 
                    board[2][j].getValue() === player.token
        }
        for (let j = 0; j < col; j++) {
            if (checkCol(j)) return true;
        }

        if (
            (board[0][0].getValue() === player.token && board[1][1].getValue() === player.token && board[2][2].getValue() === player.token) || 
            (board[0][2].getValue() === player.token && board[1][1].getValue() === player.token && board[2][0].getValue() === player.token)
            ) return true;

        return false;
    }

    return {
        printBoard,
        getBoard,
        placeToken,
        endGame
    }   
}


function Cell() {
    let value = 0;

    // When a user places a token in a cell, we need to record this cell as being taken by the user
    const addToken = (player) => {
        value = player.token;
    }

    // Get the value of this cell
    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

function GameController(playerOneName, playerTwoName) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: "O"
        },
        {
            name: playerTwoName,
            token: "X"
        }   
    ];

    let activePlayer = players[0];

    // Switch turns
    const switchTurns = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    // Get active player
    const getActivePlayer = () => activePlayer;

    // print a new round
    const printNewRound = () => {
        board.printBoard();

        console.log(`${getActivePlayer().name}'s turn`);
        let location = prompt("Where do you want to place the token? In x, y coordinates");
        let newlocation = location.split(", ");
        let x = parseInt(newlocation[0]);
        let y = parseInt(newlocation[1]);
        playRound(x, y, activePlayer);
    }
    // play one round
    const playRound = (x, y, player) => {
        board.placeToken(x, y, player);

        if (board.endGame(player)) {
            console.log(`${player.name} won!`);
            console.log("Final board state:");
            board.printBoard();
            return ;
        }
        switchTurns();
        printNewRound();
    }
    
    // Initialize the game
    printNewRound();

    return {
        getActivePlayer,
        playRound
    }
}

// Create an instance of Gameboard
const gameboard = Gameboard();

// How to start a game
let playerOne = prompt("Player One: ");
let playerTwo = prompt("Player Two:");
const game = GameController(playerOne, playerTwo);

// Test endGame()
// const test = Gameboard();
// const user = {name: "bubu", token: "O"};
// test.placeToken(0, 0, user);
// test.placeToken(0, 1, user);
// test.placeToken(0, 2, user);
// console.log(test.printBoard())
// console.log(test.endGame(user))

// const diag = Gameboard();
// const user2 = {name: "dudu", token: "X"};
// diag.placeToken(0, 0, user);
// diag.placeToken(1, 1, user2);
// diag.placeToken(2, 0, user2);
// diag.placeToken(0, 2, user2);
// console.log(diag.printBoard())
// console.log(diag.endGame(user))
// console.log(diag.endGame(user2))
