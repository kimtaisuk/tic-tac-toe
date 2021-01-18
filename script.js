/* grid formation
0 1 2
3 4 5
6 7 8
*/
//winning combination
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

// Player by uisng factory function
const humanPlayerMaker = (mark) => {
    let isXTurn = true;
    let markedGridNumber;

    const markTheGrid = (event) => {
        var clickedGrid = event.target;
        clickedGrid.dataset.grid = mark;
        clickedGrid.innerHTML = mark;
        markedGridNumber = clickedGrid.id.split('-')[1]; 
    };

    const getXTurn = () => {
        return isXTurn;
    }
    const switchTurn = () => {
        
        console.log("isXTurn original", isXTurn)
        isXTurn= !isXTurn;
        console.log("isXTurn switched", isXTurn)
                
    };

    const checkWin = () => {
        //console.log('grid number', markedGridNumber);
        //console.log('grids', gameBoard.grids);
        return allWinningCombo.some(oneCombo => {
            return oneCombo.every(indexNumber => {
                return gameBoard.grids[indexNumber].dataset.grid.includes(mark);
            })
        })
        //return winningCombo;
    }


    return { mark, markTheGrid, getXTurn, switchTurn, checkWin };


};

/*
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
    const switchTurn = (isXTurn) => {
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
*/

const playerX = humanPlayerMaker('X');
const playerO = humanPlayerMaker('O');




const gameBoard = (() => {
    'use restrict';
    //Set the game board and assign the click event to each element.
    //const board = document.getElementById('gameboard');
    const grids = document.querySelectorAll('.grid');
    const startButton = document.getElementById('start');
    //Create the players


    /*
       startButton.addEventListener("click", playTicTacToe(grids,isXTurn,currentPlayer)
       , { once: true });*/

    grids.forEach(grid => grid.addEventListener("click", playTicTacToe, {once:true}))
    
    return {grids};

})();



function playTicTacToe(event) {
    /*
     grids.forEach(grid => grid.addEventListener("click", (event) => {
         if (isXTurn) {
             currentPlayer = playerX;
             console.log(isXTurn);
         }
         else {
             currentPlayer = playerO;
             console.log(isXTurn);
         }
         console.log(currentPlayer);
 
         //var clickedGrid = clickGrid(event, currentPlayer, isXTurn);
 
         currentPlayer.markTheGrid(event);
         currentPlayer.switchTurn(isXTurn);
         //clickedGrid.placeMark();
         //clickedGrid.switchTurn();
         //isXTurn = !isXTurn;
     }, { once: true }))
     */
    
    
    let currentPlayer; 
    if (playerX.getXTurn()) {
        currentPlayer = playerX;        
    }
    else {
        currentPlayer = playerO; 
    }

    currentPlayer.markTheGrid(event);
    
    if (currentPlayer.checkWin()) {
        alert("WIN");
        return
    }

    playerO.switchTurn();
    playerX.switchTurn();  
    /*
    if (playerX.getXTurn()) {
        currentPlayer = playerX;
        playerX.markTheGrid(event);
        if (playerX.checkWin()) {
            alert("WIN");
            return
        }
        playerX.switchTurn();
        playerO.switchTurn();  
        
        
    }
    else {
        playerO.markTheGrid(event);
        playerO.checkWin();
        console.log('did win?',playerO.checkWin())
        playerX.switchTurn();
        playerO.switchTurn();
        
    }
    */

    //var clickedGrid = clickGrid(event, currentPlayer, isXTurn);


    
    //clickedGrid.placeMark();
    //clickedGrid.switchTurn();


};


