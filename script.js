// Player by uisng factory function
const humanPlayerMaker = (mark) => {
    const markTheGrid = () => console.log(mark);
    const passTheTurn = () => console.log('Pass the Turn!');
    return { mark, markTheGrid, passTheTurn };


}

const computerPlayerMaker = (mark) => {
    return { mark };
}


function playTicTacToe() {

}


const clickGrid = (event, player, isXTurn) => {
    mark = player.mark;

    // Place the mark
    const placeMark = () => {
        var clickedGrid = event.target;
        console.log(clickedGrid);
        clickedGrid.innerHTML = mark;
    }


    // Check for Win (or lose)
    const checkWin = () => {

        //End This Game
        //End this Game
    }
    // Check for Draw
    const checkDraw = () => {

    }
    // Switch Turn of the Players
    const switchTurn = () => {
        isXTurn = !isXTurn;
        if (isXTurn) {
            player = playerX;
        }
        else {
            player = playerO;
        }

    }
    return { placeMark, switchTurn, isXTurn, player }
};

const playerX = humanPlayerMaker('X');
const playerO = humanPlayerMaker('O');


const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const gameBoard = (() => {
    'use restrict';
    //Set the game board and assign the click event to each element.
    //const board = document.getElementById('gameboard');
    const grids = document.querySelectorAll('.grid');
    const startButton = document.getElementById('start');
    //Create the players
    var isXTurn = true;
    var currentPlayer = playerX;

    startButton.addEventListener("click", playTicTacToe, { once: true });

    function playTicTacToe() {
        grids.forEach(grid => grid.addEventListener("click", (event) => {
            //Check whose turn.

            if (isXTurn) {
                currentPlayer = playerX;
                console.log(isXTurn);
            }
            else {
                currentPlayer = playerO;
                console.log(isXTurn);
            }
            console.log(currentPlayer);

            var clickedGrid = clickGrid(event, currentPlayer, isXTurn);

            clickedGrid.placeMark();
            clickedGrid.switchTurn();
            isXTurn = !isXTurn;
        }, { once: true }))
    };

})();
    /*

    */



    //const player1 = player('player1', true, 'X');






/* grid formation
0 1 2
3 4 5
6 7 8
*/
//winning combination
// 012 345 678 036 147 258 048 246

