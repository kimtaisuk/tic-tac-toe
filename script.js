


const playerMaker = (mark, human) => {
    let isHuman;
    if (human === "human") {
        isHuman = true;
    } else {
        isHuman = false;
    }

    let isXTurn = true;

    const markTheGrid = (event) => {
        var unmarkedGridNumbers = gameBoard.unmarkedGridNumber1;

        let clickedGrid = event.target;
        clickedGrid.dataset.grid = mark;
        clickedGrid.innerHTML = mark;
        let clickedGridNumber = clickedGrid.id.split('-')[1];
        clickedGridNumber = parseInt(clickedGridNumber);
        console.log(clickedGridNumber);
        gameBoard.unmarkedGridNumber1.splice(unmarkedGridNumbers.indexOf(clickedGridNumber), 1)
        /* else {
         
             let randomGridNumberIndex = Math.floor(Math.random() * unmarkedGridNumber.length);
             let randomGridNumber = unmarkedGridNumber[randomGridNumberIndex]; 
             var randomGrid = document.getElementById(`grid-${randomGridNumber}`)
             
             randomGrid.dataset.grid = mark;
             randomGrid.innerHTML = mark;
             
             unmarkedGridNumber.splice(unmarkedGridNumber.indexOf(randomGridNumber),1)
 
         }*/

    };

    const getXTurn = () => {
        return isXTurn;
    }
    const switchTurn = () => {

        console.log("isXTurn original", isXTurn)
        isXTurn = !isXTurn;
        console.log("isXTurn switched", isXTurn)

    };

    return { mark, isHuman, markTheGrid, getXTurn, switchTurn }
};

const gameCheck = (currentPlayer) => {
    let grids = gameBoard.grids;
    const checkWin = () => {
        //console.log('grid number', markedGridNumber);
        //console.log('grids', gameBoard.grids);
        return allWinningCombo.some(oneCombo => {
            return oneCombo.every(indexNumber => {
                return grids[indexNumber].dataset.grid.includes(currentPlayer.mark);
            })
        })
        //return winningCombo;
    };
    const checkDraw = () => {
        let indexArray = Array.from(Array(9).keys());
        return indexArray.every(indexNumber => {
            return grids[indexNumber].dataset.grid !== '';
        })
    };

    const endGame = (didWin) => {
        let resultBoard = gameBoard.resultBoard;
        let restartButton = gameBoard.restartButton;
        let resultMessage = document.getElementById('result-message');

        gameBoard.gameCover.classList.remove('game-on');
        gameBoard.gameCover.classList.add('game-off');
        gameBoard.xHumanBtn.classList.remove('hide');
        gameBoard.oHumanBtn.classList.remove('hide');
        gameBoard.playerXstatus.classList.add('hide');
        gameBoard.playerOstatus.classList.add('hide');
        gameBoard.playBlocker.classList.remove('play-blocked');
        resultBoard.classList.remove('hide');
        resultBoard.classList.add('show');
        restartButton.classList.remove('hide');

        if (didWin) {
            resultMessage.innerText = "Player " + currentPlayer.mark + " Won!";
        }
        else {
            resultMessage.innerText = "Draw";
        }
    };

    return { checkWin, checkDraw, endGame };

};

const gameBoard = (() => {
    'use restrict';
    //Set the game board and assign the click event to each element.
    const playBoard = document.getElementById('playboard');
    const resultBoard = document.getElementById('result-board');
    const grids = document.querySelectorAll('.grid');
    const restartButton = document.getElementById('restart');
    const gameCover = document.getElementById('game-cover');
    const playerXstatus = document.getElementById('player-X-status');
    const playerOstatus = document.getElementById('player-O-status');
    const playBlocker = document.getElementById('play-cover');

    restartButton.addEventListener("click", resetGame);

    const unmarkedGridNumber1 = Array.from(Array(9).keys());

    const xHumanBtn = document.getElementById("X-human-btn");
    const oHumanBtn = document.getElementById("O-human-btn");
    const gameStartBtn = document.getElementById("start-game");

    const playerX = playerMaker('X', 'human');
    const playerO = playerMaker('O', 'human');



    return {
        grids, playBoard, resultBoard, restartButton, unmarkedGridNumber1,
        xHumanBtn, oHumanBtn, gameStartBtn, playerO, playerX,
        gameCover, playerXstatus, playerOstatus, playBlocker
    };

})();


// Winning Combinations
/* grid formation
0 1 2
3 4 5
6 7 8
*/
// A player wins when it completes one of the following combinations first.
// 012 345 678 036 147 258 048 246
const allWinningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const winningComboFiller = allWinningCombo;

//Game Start
gameBoard.xHumanBtn.addEventListener("click", humanToComputer);
gameBoard.oHumanBtn.addEventListener("click", humanToComputer);
gameBoard.gameStartBtn.addEventListener("click", gameStarter);


function resetGame() {
    //let grids = gameBoard.grids;
    let resultBoard = gameBoard.resultBoard;
    let restartButton = gameBoard.restartButton;
    let resultMessage = document.getElementById('result-message');
    //let gameStartBtn = gameBoard.gameStartBtn;

    gameBoard.unmarkedGridNumber1 = Array.from(Array(9).keys());
    resultBoard.classList.add('hide');
    resultBoard.classList.remove('show');
    restartButton.classList.add('hide');
    resultMessage.innerText = "";

    gameBoard.playerXstatus.classList.remove('hide');
    gameBoard.playerOstatus.classList.remove('hide');

    gameBoard.gameCover.classList.remove('show');
    gameBoard.gameCover.classList.add('hide');
    gameBoard.gameCover.classList.remove('game-off');

    gameBoard.resultBoard.classList.remove('show');

    gameBoard.xHumanBtn.classList.add('hide');
    gameBoard.oHumanBtn.classList.add('hide');
    gameBoard.xHumanBtn.disabled = false;
    gameBoard.oHumanBtn.disabled = false;

    //  let newGameStartBtn = gameStartBtn.cloneNode(true);
    //  newGameStartBtn.innerText = "Start Game";
    //  newGameStartBtn.addEventListener("click", gameStarter);
    // gameStartBtn.parentNode.replaceChild(newGameStartBtn,gameStartBtn);
    // gameBoard.gameStartBtn = newGameStartBtn;
    gameBoard.grids.forEach(grid => {
        grid.dataset.grid = "";
        grid.innerHTML = "";
    });



    /*gameBoard.grids.forEach(grid => {
        let newGrid = grid.cloneNode(true);
        grid.dataset.grid = null;
        grid.innerHTML = "";
        grid = newGrid;
        console.log(grid);
    });*/



    if (!gameBoard.playerX.getXTurn()) {
        gameBoard.playerX.switchTurn();
        gameBoard.playerO.switchTurn();
    }

    if (!gameBoard.playerX.isHuman) {
        gameBoard.playBlocker.classList.add('play-blocked');
        setTimeout(() => {
            
            randomClick();
            
        }, 700);
    }

};


function playTicTacToe(event) {
    if (event.target.dataset.grid != "") {
        return
    }
    let playerX = gameBoard.playerX;
    let playerO = gameBoard.playerO;

    let currentPlayer;
    let nextPlayer;



    if (playerX.getXTurn()) {
        currentPlayer = playerX;
        nextPlayer = playerO;
    }
    else {
        currentPlayer = playerO;
        nextPlayer = playerX;
    }

    if (!currentPlayer.isHuman) {
        gameBoard.playBlocker.classList.add('play-blocked');
    }

    currentPlayer.markTheGrid(event);
    let gameStatus = gameCheck(currentPlayer);
    let didWin = gameStatus.checkWin();
    if (didWin) {
        gameStatus.endGame(didWin);
    }
    else if (gameStatus.checkDraw()) {
        gameStatus.endGame(didWin);
    } else {
        playerX.switchTurn();
        playerO.switchTurn();
        if (!nextPlayer.isHuman && gameBoard.unmarkedGridNumber1 !== []) {
            gameBoard.playBlocker.classList.add('play-blocked');
            setTimeout(() => {
                randomClick();
                
            }, 700);
           // gameBoard.playBlocker.classList.remove('play-blocked');
        }
        else if (nextPlayer.isHuman && gameBoard.unmarkedGridNumber1 !== []) {
            gameBoard.playBlocker.classList.remove('play-blocked');
        }
    }

};


function randomClick() {
    let randomGridNumberIndex = Math.floor(Math.random() * gameBoard.unmarkedGridNumber1.length);
    let randomGridNumber = gameBoard.unmarkedGridNumber1[randomGridNumberIndex];
    let randomGrid = document.getElementById(`grid-${randomGridNumber}`)
    randomGrid.click();
    
}
function humanToComputer(event) {
    let clickedBtn = event.target;
    let playerMark = clickedBtn.dataset.playermark;
    let currentPlayer;
    if (playerMark === "X") {
        currentPlayer = gameBoard.playerX;
    }
    else {
        currentPlayer = gameBoard.playerO;
    }

    if (clickedBtn.dataset.ishuman === "human") {
        currentPlayer.isHuman = false;
        clickedBtn.dataset.ishuman = "computer";
        clickedBtn.innerText = "Computer"
        //randomClick();
    }
    else {
        currentPlayer.isHuman = true;
        clickedBtn.dataset.ishuman = "human";
        clickedBtn.innerText = "Human"
    }
}


function gameStarter() {
    let gameStartBtn = gameBoard.gameStartBtn;

    gameBoard.gameCover.classList.add('game-on');
    gameBoard.xHumanBtn.disabled = true;
    gameBoard.oHumanBtn.disabled = true;
    gameBoard.xHumanBtn.classList.add('hide');
    gameBoard.oHumanBtn.classList.add('hide');
    gameBoard.gameStartBtn.classList.add('hide');

    gameBoard.playerXstatus.innerText = gameBoard.xHumanBtn.dataset.ishuman;
    gameBoard.playerOstatus.innerText = gameBoard.oHumanBtn.dataset.ishuman;

    gameBoard.grids.forEach(grid => grid.addEventListener("click", (event) => {
        playTicTacToe(event)
    }))


    gameStartBtn.addEventListener("click", resetGame);

    if (!gameBoard.playerX.isHuman) {
        gameBoard.playBlocker.classList.add('play-blocked');
        setTimeout(() => {
            
            randomClick();
            
        }, 700);
        
    }

}